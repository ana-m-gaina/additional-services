const Database = require('better-sqlite3');
const crypto = require('crypto');
const fs = require('fs');
const db = new Database('db.sqlite');
const uuid = () => crypto.randomUUID();
const customerAgentId = 'client-allianz';
const now = new Date().toISOString();
const cacheBase = __dirname + '/contracts-cache';

const engagementDocs = [
  {
    engagementId: '62917',
    docs: [
      { fileName: 'Allianz_IMA_MAIN_CONTRACT_3062560352_RL_OF_PTO_.pdf', subject: 'Main Contract', uploadDate: '2024-02-01', sourceSystem: 'SPEC', docCategory: 'Order form', docRelease: 'Final', eSignatureStatus: 'Executed' },
      { fileName: 'Allianz_3062560352_RL_OF_PTO_SIGN_20240327.pdf', subject: 'Signed Contract', uploadDate: '2024-03-27', sourceSystem: 'CMS', docCategory: 'Order form', docRelease: 'Executed', eSignatureStatus: 'Executed', cmsContractId: '3062560352' },
      { fileName: 'contract_RISEQT2401_AllianzIMA_PTO-EO_997_DR_22012024-5Yrs.pdf', subject: 'Contract View (Pricing)', uploadDate: '2024-01-22', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'IMA - Network.pdf', subject: 'Network Annex', uploadDate: '2024-01-22', sourceSystem: 'DED', docCategory: 'Other documents', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'sales_RISEQT2401_AllianzIMA_PTO-EO_997_DR_22012024-5Yrs.pdf', subject: 'Sales Document', uploadDate: '2024-01-22', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: '75541',
    docs: [
      { fileName: 'CR01_3062930490_Allianz_Vertrag.pdf', subject: 'Signed Contract CR001', uploadDate: '2024-10-01', sourceSystem: 'CMS', docCategory: 'Order form', docRelease: 'Executed', eSignatureStatus: 'Executed', cmsContractId: '3062930490' },
      { fileName: 'contract_RISE-QuoteTool-2408-03_down_and_upsell_for_contract_view_v2.pdf', subject: 'Contract View (Pricing)', uploadDate: '2024-08-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'sales_RISE-QuoteTool-2408-03_upsell_v2.pdf', subject: 'Sales Document', uploadDate: '2024-08-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
      { fileName: 'sales_RISE-QuoteTool-2311-0_downsell_v2.pdf', subject: 'Sales Document (Downsell)', uploadDate: '2023-11-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: '80971',
    docs: [
      { fileName: 'CR02_3063057640_Allianz_Vertrag.pdf', subject: 'Signed Contract CR002', uploadDate: '2025-01-01', sourceSystem: 'CMS', docCategory: 'Order form', docRelease: 'Executed', eSignatureStatus: 'Executed', cmsContractId: '3063057640' },
      { fileName: 'Allianz_CR02_Klarstellung_20250219.pdf', subject: 'Clarification Letter', uploadDate: '2025-02-19', sourceSystem: 'SPEC', docCategory: 'Other documents', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'contract_RISE-QuoteTool-2501-13_upsell.pdf', subject: 'Contract View (Pricing)', uploadDate: '2025-01-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'sales_RISE-QuoteTool-2501-13_upsell.pdf', subject: 'Sales Document', uploadDate: '2025-01-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: '86578',
    docs: [
      { fileName: 'Allianz_CR03_20250703.pdf', subject: 'Signed Contract CR003', uploadDate: '2025-07-03', sourceSystem: 'CMS', docCategory: 'Order form', docRelease: 'Executed', eSignatureStatus: 'Executed', cmsContractId: '3063192363' },
      { fileName: 'contract_RISE-QuoteTool-2504-01.pdf', subject: 'Contract View (Pricing)', uploadDate: '2025-04-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'sales_RISE-QuoteTool-2504-01.pdf', subject: 'Sales Document', uploadDate: '2025-04-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: '89982',
    docs: [
      { fileName: 'Allianz_CR05_RL_OF_PTO_20250829.pdf', subject: 'Signed Contract CR005', uploadDate: '2025-08-29', sourceSystem: 'CMS', docCategory: 'Order form', docRelease: 'Executed', eSignatureStatus: 'Executed', cmsContractId: '3063280903' },
      { fileName: 'Order_Form_CR05_Final.pdf', subject: 'Order Form CR005', uploadDate: '2025-08-01', sourceSystem: 'DED', docCategory: 'Order form', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'Order_Form_CR05_Final_PDF_CR_SDBX_Aug_Sept_2025.pdf', subject: 'Order Form CR005 (Sandbox)', uploadDate: '2025-08-01', sourceSystem: 'DED', docCategory: 'Order form', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'contract_RISE-QuoteTool-25Q3-1_upsell_v1.pdf', subject: 'Contract View (Pricing)', uploadDate: '2025-09-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'intcontract_RISE-QuoteTool-25Q3-1_upsell_v1.pdf', subject: 'Internal Contract', uploadDate: '2025-09-01', sourceSystem: 'DED', docCategory: 'Internal document', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'sales_RISE-QuoteTool-25Q3-1_upsell_v1.pdf', subject: 'Sales Document', uploadDate: '2025-09-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: '91381',
    docs: [
      { fileName: 'Allianz_CR07_RL_OF_PTO_20251031.pdf', subject: 'Signed Contract CR007', uploadDate: '2025-10-31', sourceSystem: 'CMS', docCategory: 'Order form', docRelease: 'Executed', eSignatureStatus: 'Executed', cmsContractId: '3063314279' },
      { fileName: 'Allianz_CR07_Klarstellung_20251031.pdf', subject: 'Clarification Letter', uploadDate: '2025-10-31', sourceSystem: 'SPEC', docCategory: 'Other documents', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'contract_RISE-QuoteTool-25Q3-03.pdf', subject: 'Contract View (Pricing)', uploadDate: '2025-09-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'intcontract_RISE-QuoteTool-25Q3-03.pdf', subject: 'Internal Contract', uploadDate: '2025-09-01', sourceSystem: 'DED', docCategory: 'Internal document', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'sales_RISE-QuoteTool-25Q3-03.pdf', subject: 'Sales Document', uploadDate: '2025-09-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: '92042',
    docs: [
      { fileName: 'Allianz_CR08_RL_OF_PTO_20251218.pdf', subject: 'Signed Contract CR008', uploadDate: '2025-12-18', sourceSystem: 'CMS', docCategory: 'Order form', docRelease: 'Executed', eSignatureStatus: 'Executed', cmsContractId: '3063407253' },
      { fileName: 'intcontract_ROM-ALLIANZ IMA - S4_VERSCHIEBUNG V3.2_25Q4.pdf', subject: 'Internal Contract', uploadDate: '2025-10-01', sourceSystem: 'DED', docCategory: 'Internal document', docRelease: 'Draft', eSignatureStatus: '' },
      { fileName: 'sales_ROM-ALLIANZ IMA - S4_VERSCHIEBUNG V3.2_25Q4.pdf', subject: 'Sales Document', uploadDate: '2025-10-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
      { fileName: 'contract_FINAL-ALLIANZ IMA - S4_VERSCHIEBUNG ADD_STORAGE V1.1_2601.pdf', subject: 'Contract View (Pricing)', uploadDate: '2026-01-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'intcontract_FINAL-ALLIANZ IMA - S4_VERSCHIEBUNG ADD_STORAGE V1.1_2601.pdf', subject: 'Internal Contract (Final)', uploadDate: '2026-01-01', sourceSystem: 'DED', docCategory: 'Internal document', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'sales_FINAL-ALLIANZ IMA - S4_VERSCHIEBUNG ADD_STORAGE V1.1_2601.pdf', subject: 'Sales Document (Final)', uploadDate: '2026-01-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Final', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: '98494',
    docs: [
      { fileName: 'Allianz_CR09_RL_OF_PTO_20260302.pdf', subject: 'Signed Contract CR009', uploadDate: '2026-03-02', sourceSystem: 'CMS', docCategory: 'Order form', docRelease: 'Executed', eSignatureStatus: 'Executed', cmsContractId: '3063492171' },
      { fileName: 'contract_FINAL-ALLIANZ IMA - S4_VERSCHIEBUNG ADD_STORAGE V1.1_2601.pdf', subject: 'Contract View (Pricing)', uploadDate: '2026-01-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'intcontract_FINAL-ALLIANZ IMA - S4_VERSCHIEBUNG ADD_STORAGE V1.1_2601.pdf', subject: 'Internal Contract', uploadDate: '2026-01-01', sourceSystem: 'DED', docCategory: 'Internal document', docRelease: 'Final', eSignatureStatus: '' },
      { fileName: 'sales_FINAL-ALLIANZ IMA - S4_VERSCHIEBUNG ADD_STORAGE V1.1_2601.pdf', subject: 'Sales Document', uploadDate: '2026-01-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Final', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: '73032',
    docs: [
      { fileName: 'contract_RISE-QuoteTool-2311-0_downsell_v1.pdf', subject: 'Contract View - Part A', uploadDate: '2023-11-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Draft', eSignatureStatus: '' },
      { fileName: 'contract_RISE-QuoteTool-25Q3-1_upsell_v1.pdf', subject: 'Contract View - Part B', uploadDate: '2025-09-01', sourceSystem: 'DED', docCategory: 'Contract View', docRelease: 'Draft', eSignatureStatus: '' },
      { fileName: 'sales_RISE-QuoteTool-2311-0_downsell_v1.pdf', subject: 'Sales Document Part A', uploadDate: '2023-11-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
      { fileName: 'sales_RISE-QuoteTool-25Q3-1_upsell_v1.pdf', subject: 'Sales Document Part B', uploadDate: '2025-09-01', sourceSystem: 'DED', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
    ]
  },
  {
    engagementId: 'CR_FMX_EXT',
    docs: [
      { fileName: 'contract_20260408_Allianz_PTO-CR_FMX_Time-Ext_2m.pdf', subject: 'Contract (Draft)', uploadDate: '2026-04-08', sourceSystem: 'SPEC', docCategory: 'Order form', docRelease: 'Draft', eSignatureStatus: '' },
      { fileName: 'sales_20260408_Allianz_PTO-CR_FMX_Time-Ext_2m.pdf', subject: 'Sales Document', uploadDate: '2026-04-08', sourceSystem: 'SPEC', docCategory: 'Sales document', docRelease: 'Draft', eSignatureStatus: '' },
    ]
  },
];

const del = db.prepare('DELETE FROM cdm_tracker_ContractDocument WHERE customerAgentId = ?');
const ins = db.prepare('INSERT INTO cdm_tracker_ContractDocument (ID, customerAgentId, engagementId, cmsContractId, fileName, subject, uploadedBy, uploadedById, uploadDate, sourceSystem, docCategory, docRelease, eSignatureStatus, proxyUrl, localPath, mimeType, fileSizeBytes, importedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');

let totalDocs = 0;
db.transaction(() => {
  del.run(customerAgentId);
  for (const eng of engagementDocs) {
    for (const doc of eng.docs) {
      const localPath = 'contracts-cache/' + eng.engagementId + '/' + doc.fileName;
      const fullPath = cacheBase + '/' + eng.engagementId + '/' + doc.fileName;
      let sizeBytes = null;
      try { sizeBytes = fs.statSync(fullPath).size; } catch(e) {}
      ins.run(uuid(), customerAgentId, eng.engagementId, doc.cmsContractId || null, doc.fileName, doc.subject, doc.uploadedBy || '', null, doc.uploadDate, doc.sourceSystem, doc.docCategory, doc.docRelease, doc.eSignatureStatus, null, localPath, 'application/pdf', sizeBytes, now);
      totalDocs++;
    }
  }
})();

console.log('Inserted', totalDocs, 'documents');
const byEng = db.prepare('SELECT engagementId, COUNT(*) as cnt FROM cdm_tracker_ContractDocument GROUP BY engagementId ORDER BY engagementId').all();
byEng.forEach(r => console.log(' ', r.engagementId, r.cnt));
