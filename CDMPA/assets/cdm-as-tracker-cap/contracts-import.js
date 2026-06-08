// contracts-import.js — run from cdm-as-tracker-cap directory
// Reads pre-scraped DED/CMS JSON, downloads PDFs, extracts CR data, stores in SQLite.
//
// Usage: node contracts-import.js
// Pre-requisites:
//   .playwright-mcp/ded-rows-raw.json   — scraped via MCP browser
//   .playwright-mcp/cms-attachments.json — scraped via MCP browser
//   .playwright-mcp/session-cookies.json — exported from MCP browser context

'use strict'

const Database    = require('better-sqlite3')
const fs          = require('fs')
const path        = require('path')
const https       = require('https')
const http        = require('http')
const { randomUUID } = require('crypto')
const pdfParse = require('pdf-parse')

// ── Load env ────────────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '../cdm-as-tracker-agent/.env')
const env = {}
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.replace(/\r$/, '').match(/^([^#=\s]+)\s*=\s*(.+)$/)
    if (m) env[m[1].trim()] = m[2].trim()
  })
}
const HAI_BASE_URL = env.HAI_BASE_URL || 'http://localhost:6655/anthropic'
const HAI_API_KEY  = env.HAI_API_KEY  || ''
const HAI_MODEL    = env.HAI_MODEL    || 'anthropic--claude-4.6-opus'

// ── Paths ───────────────────────────────────────────────────────────────────
const DB_PATH    = path.join(__dirname, 'db.sqlite')
const CACHE_DIR  = path.join(__dirname, 'contracts-cache')
const MCP_DIR    = path.join(__dirname, '.playwright-mcp')
const db         = new Database(DB_PATH)

// ── Helpers ─────────────────────────────────────────────────────────────────
function parseDate(val) {
  if (!val) return null
  const dmyMatch = val.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2].padStart(2,'0')}-${dmyMatch[1].padStart(2,'0')}`
  const isoMatch = val.match(/(\d{4}-\d{2}-\d{2})/)
  if (isoMatch) return isoMatch[1]
  return null
}

function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').slice(0, 200)
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function fetchBuffer(url, cookies) {
  return new Promise((resolve, reject) => {
    const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ')
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(url, {
      headers: {
        Cookie: cookieHeader,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location, cookies).then(resolve).catch(reject)
      }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve({
        buffer: Buffer.concat(chunks),
        contentType: res.headers['content-type'] || '',
        status: res.statusCode
      }))
      res.on('error', reject)
    })
    req.on('error', reject)
  })
}

function callLLM(prompt) {
  const body = JSON.stringify({
    model: HAI_MODEL,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }]
  })
  return new Promise((resolve, reject) => {
    const url = new URL(`${HAI_BASE_URL}/v1/messages`)
    const lib = url.protocol === 'https:' ? https : http
    const req = lib.request({
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': HAI_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    }, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        try { resolve(JSON.parse(data)?.content?.[0]?.text || '') }
        catch { resolve('') }
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

function regexExtract(text) {
  const result = {}
  // Amount: €1.234,56 or EUR 1234.56
  const amtMatch = text.match(/(?:EUR|€)\s*([\d.]+,\d{2})|(\d[\d.]+,\d{2})\s*(?:EUR|€)/)
  if (amtMatch) {
    const raw = (amtMatch[1] || amtMatch[2] || '').replace(/\./g,'').replace(',','.')
    const val = parseFloat(raw)
    if (val > 0) { result.contractValue = val; result.currency = 'EUR' }
  }
  // Dates: DD.MM.YYYY or M/D/YYYY
  const dates = [
    ...[...text.matchAll(/(\d{1,2}\.\d{1,2}\.\d{4})/g)].map(m => parseDate(m[1])),
    ...[...text.matchAll(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g)].map(m => `${m[3]}-${m[1].padStart(2,'0')}-${m[2].padStart(2,'0')}`)
  ].filter(Boolean)
  if (dates.length >= 2) { result.startDate = dates[0]; result.endDate = dates[dates.length - 1] }
  else if (dates.length === 1) { result.startDate = dates[0] }
  // Duration
  const durMatch = text.match(/(\d{1,3})\s*(?:months?|Monate?|mon\.)/i)
  if (durMatch) result.duration = parseInt(durMatch[1])
  // SIDs: 3-4 uppercase letters
  const sids = [...new Set(
    [...text.matchAll(/\b([A-Z]{3,4})\b/g)].map(m => m[1])
      .filter(s => !/^(EUR|PDF|SAP|IMA|PTO|ECS|CMS|DED|ADD|AND|THE|FOR|NEW|OLD|NOT|ALL)$/.test(s))
  )]
  if (sids.length) result.sidAffected = sids.slice(0,8).join(', ')
  return result
}

async function llmExtract(text) {
  if (!HAI_API_KEY) return {}
  const truncated = text.slice(0, 6000)
  const prompt = `Extract structured data from this SAP contract PDF. Return ONLY a JSON object with these fields (use null if not found):
- sidAffected: SAP SID(s) e.g. "FMD" or "FMD, FMS" (2-4 uppercase letters identifying SAP systems)
- issueDescription: 1-2 sentence description of what this contract/CR addresses
- contractValue: numeric amount only (no currency symbol)
- currency: 3-letter code e.g. "EUR"
- startDate: ISO date YYYY-MM-DD
- endDate: ISO date YYYY-MM-DD
- duration: integer number of months
- contractStatus: one of Active, Executed, Cancelled, Draft

Contract text:
${truncated}

ONLY JSON, no explanation.`
  try {
    const raw = await callLLM(prompt)
    const m = raw.match(/\{[\s\S]*\}/)
    if (m) return JSON.parse(m[0])
  } catch {}
  return {}
}

// ── Main ─────────────────────────────────────────────────────────────────────
;(async () => {
  console.log('=== contracts-import.js (offline mode) ===')
  ensureDir(CACHE_DIR)

  // ── Load pre-scraped data ─────────────────────────────────────────────────
  const dedRowsRaw   = JSON.parse(fs.readFileSync(path.join(MCP_DIR, 'ded-rows-raw.json'), 'utf8'))
  const cmsData      = JSON.parse(fs.readFileSync(path.join(MCP_DIR, 'cms-attachments.json'), 'utf8'))
  const cookiesRaw   = JSON.parse(fs.readFileSync(path.join(MCP_DIR, 'session-cookies.json'), 'utf8'))

  // Fix uploadedBy: split "Jose SalgueroI534046" → name + userId
  const dedRows = dedRowsRaw.map(r => {
    const m = r.uploadedBy.match(/^(.+?)([A-Z][0-9]{6,7})$/)
    return { ...r, uploadedBy: m ? m[1] : r.uploadedBy, uploadedById: m ? m[2] : r.uploadedById }
  })

  console.log(`Loaded ${dedRows.length} DED rows, ${Object.keys(cmsData).length} CMS cases, ${cookiesRaw.length} cookies`)

  // ── Build engagement map ──────────────────────────────────────────────────
  const engagementsMap = {}
  for (const r of dedRows) {
    if (!engagementsMap[r.engagementId]) {
      const cmsEntry = Object.entries(cmsData).find(([, v]) => v.engagementId === r.engagementId)
      engagementsMap[r.engagementId] = {
        engagementId:  r.engagementId,
        crNumber:      r.crNumber,
        cmsUrl:        r.cmsUrl || '',
        cmsContractId: cmsEntry ? cmsEntry[0] : (r.cmsUrl.match(/CASE_ID=(\d+)/)?.[1] || ''),
        documents:     []
      }
    }
    if (r.cmsUrl && !engagementsMap[r.engagementId].cmsUrl) {
      engagementsMap[r.engagementId].cmsUrl = r.cmsUrl
    }
    engagementsMap[r.engagementId].documents.push(r)
  }

  // ── STEP D: Download DED proxy PDFs ───────────────────────────────────────
  console.log('\n[1] Downloading DED proxy files...')
  const allDocsMeta = []

  for (const eng of Object.values(engagementsMap)) {
    const engDir = path.join(CACHE_DIR, eng.engagementId)
    ensureDir(engDir)

    // DED documents
    for (const doc of eng.documents) {
      const meta = {
        engagementId:    eng.engagementId,
        cmsContractId:   eng.cmsContractId,
        fileName:        doc.fileName,
        subject:         doc.subject,
        uploadedBy:      doc.uploadedBy,
        uploadedById:    doc.uploadedById,
        uploadDate:      parseDate(doc.uploadDate),
        sourceSystem:    'DED',
        docCategory:     '',
        docRelease:      '',
        eSignatureStatus:'',
        proxyUrl:        doc.proxyUrl,
        localPath:       '',
        mimeType:        '',
        fileSizeBytes:   0,
      }

      if (doc.proxyUrl && doc.proxyUrl.includes('/proxy/')) {
        const safeName = sanitizeFilename(doc.fileName)
        const filePath = path.join(engDir, safeName)
        if (!fs.existsSync(filePath)) {
          try {
            const { buffer, contentType, status } = await fetchBuffer(doc.proxyUrl, cookiesRaw)
            if (status === 200 && buffer.length > 100) {
              fs.writeFileSync(filePath, buffer)
              meta.localPath     = `contracts-cache/${eng.engagementId}/${safeName}`
              meta.mimeType      = contentType.split(';')[0]
              meta.fileSizeBytes = buffer.length
              console.log(`  DED ✓ ${doc.fileName} (${buffer.length} bytes)`)
            } else {
              console.warn(`  DED ✗ ${doc.fileName} (HTTP ${status}, ${buffer.length} bytes)`)
            }
          } catch (e) {
            console.warn(`  DED ✗ ${doc.fileName}: ${e.message}`)
          }
        } else {
          const stat = fs.statSync(filePath)
          meta.localPath     = `contracts-cache/${eng.engagementId}/${safeName}`
          meta.fileSizeBytes = stat.size
          console.log(`  DED ↩ ${doc.fileName} (cached)`)
        }
      } else if (doc.cmsUrl) {
        meta.proxyUrl    = doc.cmsUrl
        meta.docCategory = 'Signed Contract'
      }

      allDocsMeta.push(meta)
    }

    // CMS attachments (metadata only — no download URL available without browser)
    const cmsCase = cmsData[eng.cmsContractId]
    if (cmsCase) {
      for (const att of cmsCase.attachments) {
        allDocsMeta.push({
          engagementId:    eng.engagementId,
          cmsContractId:   eng.cmsContractId,
          fileName:        att.fileName,
          subject:         att.docCategory,
          uploadedBy:      '',
          uploadedById:    '',
          uploadDate:      parseDate(att.createdOn),
          sourceSystem:    'CMS',
          docCategory:     att.docCategory,
          docRelease:      att.docRelease,
          eSignatureStatus:att.eSignatureStatus,
          proxyUrl:        eng.cmsUrl,
          localPath:       '',
          mimeType:        '',
          fileSizeBytes:   0,
        })
      }
      console.log(`  CMS  ↩ ${eng.engagementId}: ${cmsCase.attachments.length} attachment records`)
    }
  }

  // ── STEP E: PDF extraction ────────────────────────────────────────────────
  console.log('\n[2] Extracting CR data from PDFs...')
  const engagementExtracted = {}

  for (const eng of Object.values(engagementsMap)) {
    const relevantDocs = allDocsMeta.filter(d =>
      d.engagementId === eng.engagementId &&
      d.localPath &&
      /\.(pdf)$/i.test(d.localPath) &&
      /contract_|intcontract_|signed/i.test(d.fileName)
    )

    let merged = {}
    for (const doc of relevantDocs) {
      const filePath = path.join(__dirname, doc.localPath)
      if (!fs.existsSync(filePath)) continue
      try {
        const buf  = fs.readFileSync(filePath)
        const data = await pdfParse(buf)
        const regexData = regexExtract(data.text)
        const llmData   = await llmExtract(data.text)
        merged = {
          sidAffected:      llmData.sidAffected      || regexData.sidAffected      || merged.sidAffected      || '',
          issueDescription: llmData.issueDescription || merged.issueDescription    || '',
          contractValue:    llmData.contractValue     ?? regexData.contractValue    ?? merged.contractValue    ?? null,
          currency:         llmData.currency          || regexData.currency         || merged.currency         || 'EUR',
          startDate:        llmData.startDate         || regexData.startDate        || merged.startDate        || null,
          endDate:          llmData.endDate           || regexData.endDate          || merged.endDate          || null,
          duration:         llmData.duration          ?? regexData.duration         ?? merged.duration         ?? null,
          contractStatus:   llmData.contractStatus    || merged.contractStatus      || '',
          extractedJson:    JSON.stringify(llmData),
        }
        console.log(`  ${eng.engagementId} ✓ extracted from ${doc.fileName}`)
      } catch (e) {
        console.warn(`  ${eng.engagementId} ✗ ${doc.fileName}: ${e.message}`)
      }
    }
    if (relevantDocs.length === 0) console.log(`  ${eng.engagementId} — no local PDFs to extract from`)
    engagementExtracted[eng.engagementId] = merged
  }

  // ── STEP F: Upsert to SQLite ──────────────────────────────────────────────
  console.log('\n[3] Writing to database...')

  const CUSTOMER_ID = db.prepare(
    "SELECT ID FROM cdm_tracker_CustomerAgent WHERE displayName LIKE '%Allianz%' LIMIT 1"
  ).get()?.ID

  if (!CUSTOMER_ID) {
    console.error('ERROR: Could not find Allianz customer in DB.')
    process.exit(1)
  }
  console.log(`  Customer ID: ${CUSTOMER_ID}`)

  const now = new Date().toISOString()

  db.prepare('DELETE FROM cdm_tracker_ContractEngagement WHERE customerAgentId = ?').run(CUSTOMER_ID)
  db.prepare('DELETE FROM cdm_tracker_ContractDocument WHERE customerAgentId = ?').run(CUSTOMER_ID)

  const insEng = db.prepare(`
    INSERT INTO cdm_tracker_ContractEngagement
    (ID, customerAgentId, engagementId, crNumber, cmsContractId, cmsContractUrl,
     sidAffected, issueDescription, contractValue, currency, startDate, endDate,
     duration, contractStatus, extractedJson, importedAt)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `)

  const insDoc = db.prepare(`
    INSERT INTO cdm_tracker_ContractDocument
    (ID, customerAgentId, engagementId, cmsContractId, fileName, subject,
     uploadedBy, uploadedById, uploadDate, sourceSystem, docCategory, docRelease,
     eSignatureStatus, proxyUrl, localPath, mimeType, fileSizeBytes, importedAt)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `)

  // ── Spec-sourced CRs (from signed Order Form PDFs in specs/contracts/CHANGE_REQUESTS) ──
  // These CRs exist only in signed contract documents, not as separate DED engagements.
  // Data extracted from PDF content analysis. EngagementId = CMS contract number.
  const SPECS_DIR = path.join(__dirname, '../../specs/contracts/CHANGE_REQUESTS')
  const specEngagements = [
    {
      engagementId: 'CR004', crNumber: 'CR004', cmsContractId: '3062930490',
      cmsContractUrl: 'https://isp.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?CASE_ID=3062930490',
      sidAffected: 'FMS',
      issueDescription: 'Temporary Application Server uplift for FMS: removes 2×64 GB app servers and adds 3×128 GB app servers on non-PRD basis.',
      contractValue: 9776.27, currency: 'EUR',
      startDate: '2024-10-30', endDate: '2025-01-31', duration: 3,
      contractStatus: 'Executed',
      docs: [
        { fileName: 'CR01_3062930490 Allianz Technology SE Vertrag.pdf', subject: 'Signed Contract', docCategory: 'Order form', docRelease: 'Executed' },
      ]
    },
    {
      engagementId: 'CR006', crNumber: 'CR006', cmsContractId: '3063057640',
      cmsContractUrl: 'https://isp.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?CASE_ID=3063057640',
      sidAffected: 'FMS',
      issueDescription: 'Prolongation of the temporary FMS Application Server uplift from CR004: extends same 128 GB configuration for one additional month.',
      contractValue: 2658.06, currency: 'EUR',
      startDate: '2025-02-01', endDate: '2025-02-28', duration: 1,
      contractStatus: 'Executed',
      docs: [
        { fileName: 'CR02_3063057640 Allianz Technology SE Vertrag.pdf', subject: 'Signed Contract', docCategory: 'Order form', docRelease: 'Executed' },
        { fileName: 'Allianz_3062560352-CR02_Klarstellung_20250219.pdf', subject: 'Klarstellung (clarification letter)', docCategory: 'other documents', docRelease: 'Executed' },
      ]
    },
    {
      engagementId: 'CR011', crNumber: 'CR011', cmsContractId: '3063192363',
      cmsContractUrl: 'https://isp.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?CASE_ID=3063192363',
      sidAffected: 'FMD',
      issueDescription: 'Storage uplift for the SAP DEV system FMD: adds 100 GB additional filesystem storage on non-PRD basis for the remaining term of the Order Form.',
      contractValue: 607.00, currency: 'EUR',
      startDate: '2025-06-10', endDate: null, duration: null,
      contractStatus: 'Executed',
      docs: [
        { fileName: 'Allianz_3062560352-CR03_20250703.pdf', subject: 'Signed Contract', docCategory: 'Order form', docRelease: 'Executed' },
      ]
    },
    {
      engagementId: 'CR002', crNumber: 'CR002', cmsContractId: '3063280903',
      cmsContractUrl: 'https://isp.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?CASE_ID=3063280903',
      sidAffected: 'FMX, HMX, WFX',
      issueDescription: 'Provide a system copy of the FMP system as new sandbox FMX/HMX including web dispatcher WFX on non-PRD basis.',
      contractValue: 118507.33, currency: 'EUR',
      startDate: '2025-09-25', endDate: '2026-08-31', duration: 11,
      contractStatus: 'Executed',
      docs: [
        { fileName: 'Allianz_3062560352-CR05_RL_OF_PTO_20250829.pdf', subject: 'Signed Contract', docCategory: 'Order form', docRelease: 'Executed' },
        { fileName: 'DS_Allianz_3062560352-CR05_20250825.pdf', subject: 'DocuSign Certificate of Completion', docCategory: 'other documents', docRelease: 'Executed' },
      ]
    },
    {
      engagementId: 'CR003', crNumber: 'CR003', cmsContractId: '3063314279',
      cmsContractUrl: 'https://isp.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?CASE_ID=3063314279',
      sidAffected: 'FMX, HMX',
      issueDescription: 'Temporary memory upscale for FMX/HMX sandbox: replaces 512 GB DB + 2×64 GB app servers with 2,048 GB DB + 2×128 GB app servers.',
      contractValue: 52758.05, currency: 'EUR',
      startDate: '2025-09-25', endDate: '2026-08-31', duration: 11,
      contractStatus: 'Executed',
      docs: [
        { fileName: 'Allianz_3062560352-CR07_RL_OF_PTO_20251031.pdf', subject: 'Signed Contract', docCategory: 'Order form', docRelease: 'Executed' },
        { fileName: 'Allianz_3062560352-CR07_Klarstellung_20251031.pdf', subject: 'Klarstellung (clarification letter)', docCategory: 'other documents', docRelease: 'Executed' },
      ]
    },
    {
      engagementId: 'CR009', crNumber: 'CR009', cmsContractId: '3063407253',
      cmsContractUrl: 'https://isp.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?CASE_ID=3063407253',
      sidAffected: 'FMD, FMQ',
      issueDescription: 'Temporary parallel operation of FMD and FMQ system copies for 9 months to support S/4HANA migration; adds DEV-COPY (DB + 2 app servers) and QAS-COPY.',
      contractValue: 158674.72, currency: 'EUR',
      startDate: '2026-02-02', endDate: '2026-10-31', duration: 9,
      contractStatus: 'Executed',
      docs: [
        { fileName: 'Allianz_3062560352-CR08_RL_OF_PTO_20251218.pdf', subject: 'Signed Contract', docCategory: 'Order form', docRelease: 'Executed' },
      ]
    },
    {
      engagementId: 'CR013', crNumber: 'CR013', cmsContractId: '3063492171',
      cmsContractUrl: 'https://isp.hec.net.sap/sap/bc/webdynpro/sap/zv_cms_rcm_wda_case?CASE_ID=3063492171',
      sidAffected: 'FMK',
      issueDescription: 'Temporary 1 TB additional HANA DB storage for the FMK-DEV system for 8 months to support storage requirements.',
      contractValue: 1424.08, currency: 'EUR',
      startDate: '2026-03-02', endDate: '2026-10-31', duration: 8,
      contractStatus: 'Executed',
      docs: [
        { fileName: 'Allianz_3062560352-CR09_RL_OF_PTO_20260302.pdf', subject: 'Signed Contract', docCategory: 'Order form', docRelease: 'Executed' },
      ]
    },
    {
      engagementId: 'CR_FMX_EXT', crNumber: '', cmsContractId: '',
      cmsContractUrl: '',
      sidAffected: 'FMX, HMX',
      issueDescription: '2-month prolongation of the FMX/HMX sandbox upscale (CR003): extends the 2,048 GB DB + 2×128 GB app servers by two additional months beyond original end date.',
      contractValue: 18558.16, currency: 'EUR',
      startDate: '2026-09-01', endDate: '2026-10-31', duration: 2,
      contractStatus: 'Draft',
      docs: [
        { fileName: 'contract_20260408_Allianz_PTO-CR_FMX_Time-Ext_2m.pdf', subject: 'Contract View (Pricing)', docCategory: 'Order form', docRelease: 'Draft' },
      ]
    },
  ]

  // Copy spec PDFs into contracts-cache for reference
  const specsAvailable = fs.existsSync(SPECS_DIR)
  if (specsAvailable) {
    for (const se of specEngagements) {
      const engDir = path.join(CACHE_DIR, se.engagementId)
      ensureDir(engDir)
      for (const doc of se.docs) {
        const src = path.join(SPECS_DIR, doc.fileName)
        const dst = path.join(engDir, doc.fileName)
        if (fs.existsSync(src) && !fs.existsSync(dst)) {
          fs.copyFileSync(src, dst)
          console.log(`  Specs ↩ ${doc.fileName}`)
        }
      }
    }
  }

  db.transaction(() => {
    for (const eng of Object.values(engagementsMap)) {
      const ex = engagementExtracted[eng.engagementId] || {}
      insEng.run(
        randomUUID(), CUSTOMER_ID, eng.engagementId, eng.crNumber,
        eng.cmsContractId, eng.cmsUrl,
        ex.sidAffected || null, ex.issueDescription || null,
        ex.contractValue ?? null, ex.currency || 'EUR',
        ex.startDate || null, ex.endDate || null,
        ex.duration ?? null, ex.contractStatus || null,
        ex.extractedJson || null, now
      )
    }

    // Insert spec-sourced engagements
    for (const se of specEngagements) {
      insEng.run(
        randomUUID(), CUSTOMER_ID, se.engagementId, se.crNumber,
        se.cmsContractId, se.cmsContractUrl,
        se.sidAffected, se.issueDescription,
        se.contractValue, se.currency,
        se.startDate, se.endDate,
        se.duration, se.contractStatus,
        null, now
      )
    }

    for (const doc of allDocsMeta) {
      insDoc.run(
        randomUUID(), CUSTOMER_ID, doc.engagementId, doc.cmsContractId || '',
        doc.fileName, doc.subject || '',
        doc.uploadedBy || '', doc.uploadedById || '', doc.uploadDate,
        doc.sourceSystem, doc.docCategory || '', doc.docRelease || '',
        doc.eSignatureStatus || '', doc.proxyUrl || '',
        doc.localPath || '', doc.mimeType || '', doc.fileSizeBytes || 0, now
      )
    }

    // Insert documents for spec-sourced engagements
    for (const se of specEngagements) {
      for (const doc of se.docs) {
        const localPath = fs.existsSync(path.join(CACHE_DIR, se.engagementId, doc.fileName))
          ? `contracts-cache/${se.engagementId}/${doc.fileName}` : ''
        insDoc.run(
          randomUUID(), CUSTOMER_ID, se.engagementId, se.cmsContractId,
          doc.fileName, doc.subject,
          '', '', null,
          'SPECS', doc.docCategory, doc.docRelease,
          '', '', localPath, localPath ? 'application/pdf' : '', 0, now
        )
      }
    }
  })()

  const engCount = db.prepare('SELECT COUNT(*) as n FROM cdm_tracker_ContractEngagement WHERE customerAgentId = ?').get(CUSTOMER_ID).n
  const docCount = db.prepare('SELECT COUNT(*) as n FROM cdm_tracker_ContractDocument WHERE customerAgentId = ?').get(CUSTOMER_ID).n
  console.log(`\n=== Done ===`)
  console.log(`  ${engCount} ContractEngagements`)
  console.log(`  ${docCount} ContractDocuments`)
  console.log(`  Files cached in ${CACHE_DIR}`)
})().catch(e => { console.error(e); process.exit(1) })
