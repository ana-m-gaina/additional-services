#!/usr/bin/env node
/**
 * Usage:
 *   node scripts/browser-console.js [url] [--filter <substring>] [--timeout <ms>]
 *
 * Defaults:
 *   url      http://localhost:4010/tracker/webapp/index.html
 *   filter   (none — print everything)
 *   timeout  15000ms then exit
 *
 * Navigates to the URL, forwards every browser console message to stdout,
 * and exits after --timeout ms (or Ctrl+C).
 *
 * To see the Object Page, append a hash, e.g.:
 *   node scripts/browser-console.js "http://localhost:4010/tracker/webapp/index.html#Requests(1)"
 */

const puppeteer = require('puppeteer')

const args = process.argv.slice(2)
let url = 'http://localhost:4010/tracker/webapp/index.html'
let filter = null
let timeout = 15000

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--filter' && args[i + 1]) { filter = args[++i]; continue }
  if (args[i] === '--timeout' && args[i + 1]) { timeout = parseInt(args[++i], 10); continue }
  if (!args[i].startsWith('--')) url = args[i]
}

;(async () => {
  console.log(`Opening: ${url}`)
  console.log(`Filter:  ${filter || '(none)'}`)
  console.log(`Timeout: ${timeout}ms\n`)

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  page.on('console', msg => {
    const type = msg.type().toUpperCase().padEnd(7)
    const text = msg.text()
    if (filter && !text.includes(filter)) return
    const color = type.startsWith('ERROR') ? '\x1b[31m'
      : type.startsWith('WARN')  ? '\x1b[33m'
      : type.startsWith('LOG')   ? '\x1b[0m'
      : '\x1b[36m'
    console.log(`${color}[${type}] ${text}\x1b[0m`)
  })

  page.on('pageerror', err => {
    console.error(`\x1b[31m[PAGEERR] ${err.message}\x1b[0m`)
  })

  page.on('requestfailed', req => {
    const url = req.url()
    // Skip noisy 404s that are expected (i18n fallbacks, flex bundles)
    if (url.includes('i18n_en') || url.includes('flexibility-bundle') ||
        url.includes('changes-bundle') || url.includes('lrep')) return
    console.warn(`\x1b[33m[NET 404] ${url}\x1b[0m`)
  })

  // Navigate with the full URL including hash — UI5 router reads it on startup
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeout })

  // Wait for the page to fully settle
  await new Promise(resolve => setTimeout(resolve, timeout))

  await browser.close()
  console.log('\n[done]')
})().catch(err => {
  console.error(err.message)
  process.exit(1)
})
