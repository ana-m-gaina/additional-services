// landscape-import.js — run from cdm-as-tracker-cap directory
// Adds Landscape columns to CustomerAgent, creates new tables, imports Allianz data

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const DB_PATH = path.join(__dirname, 'cdm-tracker.db');
const JSON_PATH = path.join(__dirname, '../../../../../landscape-data.json');

const db = new Database(DB_PATH);
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const lb = data.GetLandscapeById;

// ── 1. Add columns to cdm_tracker_CustomerAgent ───────────────────────────────
const newCols = [
  ['dedOpportunityId',     'TEXT'],
  ['deliveryStatus',       'TEXT'],
  ['operationsMode',       'TEXT'],
  ['dataCenterName',       'TEXT'],
  ['dataCenterCode',       'TEXT'],
  ['iaas',                 'TEXT'],
  ['hecCloudOption',       'TEXT'],
  ['cloudStartDate',       'TEXT'],
  ['contractEndDate',      'TEXT'],
  ['businessGoLive',       'TEXT'],
  ['implementationType',   'TEXT'],
  ['duration',             'TEXT'],
  ['overallStatus',        'TEXT'],
  ['projectDocuments',     'TEXT'],
  ['defaultCesmUserCode',  'TEXT'],
  ['defaultCesmUserName',  'TEXT'],
  ['customerContactName',  'TEXT'],
  ['customerContactEmail', 'TEXT'],
  ['bpName',               'TEXT'],
  ['crmOpportunityId',     'TEXT'],
  ['erpCustomerId',        'TEXT'],
];

const existingCols = db.prepare("PRAGMA table_info('cdm_tracker_CustomerAgent')").all().map(c => c.name);
for (const [col, type] of newCols) {
  if (!existingCols.includes(col)) {
    db.prepare(`ALTER TABLE "cdm_tracker_CustomerAgent" ADD COLUMN "${col}" ${type}`).run();
    console.log(`  + CustomerAgent.${col}`);
  }
}

// ── 2. Create new landscape tables ────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS "cdm_tracker_LandscapePhase" (
    "ID"               TEXT PRIMARY KEY,
    "customerAgentId"  TEXT,
    "phaseKey"         TEXT,
    "phaseNo"          INTEGER,
    "phaseName"        TEXT,
    "phaseStartMonth"  INTEGER,
    "phaseEndMonth"    INTEGER,
    "phaseDescription" TEXT,
    "phaseDurationUnit" TEXT,
    "phaseStartDate"   TEXT,
    "phaseEndDate"     TEXT
  );

  CREATE TABLE IF NOT EXISTS "cdm_tracker_LandscapeWeeklyStatus" (
    "ID"              TEXT PRIMARY KEY,
    "customerAgentId" TEXT,
    "dedCode"         TEXT,
    "opprId"          TEXT,
    "statusDate"      TEXT,
    "customerPulse"   TEXT,
    "statusText"      TEXT,
    "createUserId"    TEXT,
    "createUserName"  TEXT,
    "createDateTime"  TEXT
  );

  CREATE TABLE IF NOT EXISTS "cdm_tracker_LandscapeTopIssue" (
    "ID"                  TEXT PRIMARY KEY,
    "customerAgentId"     TEXT,
    "dedCode"             TEXT,
    "issueId"             TEXT,
    "dateIdentified"      TEXT,
    "rating"              TEXT,
    "category"            TEXT,
    "statusSummary"       TEXT,
    "businessImpact"      TEXT,
    "actionPlan"          TEXT,
    "statusOfActionPlan"  TEXT,
    "resolutionDate"      TEXT,
    "status"              TEXT,
    "priority"            TEXT,
    "responsible"         TEXT,
    "internalOnly"        INTEGER DEFAULT 0,
    "createUserId"        TEXT,
    "createUserName"      TEXT,
    "createDateTime"      TEXT,
    "updateUserId"        TEXT,
    "updateUserName"      TEXT,
    "updateDateTime"      TEXT
  );

  CREATE TABLE IF NOT EXISTS "cdm_tracker_LandscapeSystem" (
    "ID"              TEXT PRIMARY KEY,
    "customerAgentId" TEXT,
    "sortKey"         TEXT,
    "tierKey"         TEXT,
    "solutionCode"    TEXT,
    "solutionDescr"   TEXT,
    "itemCode"        TEXT,
    "description"     TEXT,
    "tier"            TEXT,
    "sid"             TEXT,
    "dbSid"           TEXT,
    "isDR"            INTEGER DEFAULT 0,
    "isActive"        INTEGER DEFAULT 1,
    "isLoadBalancer"  INTEGER DEFAULT 0,
    "deliveryStatus"  TEXT,
    "hecCloudOption"  TEXT,
    "tierVerified"    TEXT
  );
`);
console.log('Tables created (if not existed)');

// ── 3. Find Allianz CustomerAgent row ─────────────────────────────────────────
const row = db.prepare("SELECT ID FROM cdm_tracker_CustomerAgent WHERE displayName LIKE '%Allianz%' LIMIT 1").get();
if (!row) { console.error('Allianz CustomerAgent not found!'); process.exit(1); }
const customerId = row.ID;
console.log('CustomerAgent ID:', customerId);

// ── 4. Update Allianz CustomerAgent with scalar landscape fields ───────────────
function parseDate(val) {
  if (!val || val === '1970-01-01' || val === '1970-01-01 00:00:00.0000000') return null;
  return val.split(' ')[0]; // keep just YYYY-MM-DD
}

db.prepare(`
  UPDATE cdm_tracker_CustomerAgent SET
    dedOpportunityId     = ?,
    deliveryStatus       = ?,
    operationsMode       = ?,
    dataCenterName       = ?,
    dataCenterCode       = ?,
    iaas                 = ?,
    hecCloudOption       = ?,
    cloudStartDate       = ?,
    contractEndDate      = ?,
    businessGoLive       = ?,
    implementationType   = ?,
    duration             = ?,
    overallStatus        = ?,
    projectDocuments     = ?,
    defaultCesmUserCode  = ?,
    defaultCesmUserName  = ?,
    customerContactName  = ?,
    customerContactEmail = ?,
    bpName               = ?,
    crmOpportunityId     = ?,
    erpCustomerId        = ?
  WHERE ID = ?
`).run(
  lb.OpportunityId,
  lb.DeliveryStatus,
  lb.OperationsMode,
  lb.DataCenterName,
  lb.DataCenterCode,
  lb.IaaS,
  lb.HECCLoudOption,
  parseDate(lb.CloudStartDate),
  parseDate(lb.ContractEndDate),
  parseDate(lb.BusinessGoLive),
  lb.ImplementationType,
  lb.Duration,
  lb.OverallStatus,
  lb.ProjectDocuments,
  lb.DefaultCESMUserCode,
  lb.DefaultCESMUserName,
  lb.CustomerContactName,
  lb.CustomerContactEmail,
  lb.BPName,
  lb.CrmOpportunityId,
  lb.ERPCustomerId,
  customerId
);
console.log('CustomerAgent updated with landscape fields');

// ── 5. Import Phases ──────────────────────────────────────────────────────────
db.prepare(`DELETE FROM cdm_tracker_LandscapePhase WHERE customerAgentId = ?`).run(customerId);
const insPhase = db.prepare(`
  INSERT INTO cdm_tracker_LandscapePhase
    (ID, customerAgentId, phaseKey, phaseNo, phaseName, phaseStartMonth, phaseEndMonth,
     phaseDescription, phaseDurationUnit, phaseStartDate, phaseEndDate)
  VALUES (?,?,?,?,?,?,?,?,?,?,?)
`);
for (const p of lb.Phases) {
  insPhase.run(
    randomUUID(), customerId, p.PhaseKey, parseInt(p.PhaseNo) || null, p.PhaseName,
    parseInt(p.PhaseStartMonth) || null, parseInt(p.PhaseEndMonth) || null,
    p.PhaseDescription, p.PhaseDurationUnit,
    parseDate(p.PhaseStartDate), parseDate(p.PhaseEndDate)
  );
}
console.log(`Inserted ${lb.Phases.length} phases`);

// ── 6. Import WeeklyStatus ────────────────────────────────────────────────────
db.prepare(`DELETE FROM cdm_tracker_LandscapeWeeklyStatus WHERE customerAgentId = ?`).run(customerId);
const insWS = db.prepare(`
  INSERT INTO cdm_tracker_LandscapeWeeklyStatus
    (ID, customerAgentId, dedCode, opprId, statusDate, customerPulse, statusText,
     createUserId, createUserName, createDateTime)
  VALUES (?,?,?,?,?,?,?,?,?,?)
`);
for (const w of lb.WeeklyStatus) {
  insWS.run(
    randomUUID(), customerId, w.Code, w.OpprId,
    parseDate(w.Date), w.CustomerPulse, w.Status,
    w.CreateUserId, w.CreateUserName,
    w.CreateDateTime ? w.CreateDateTime.split('.')[0].replace(' ', 'T') : null
  );
}
console.log(`Inserted ${lb.WeeklyStatus.length} weekly status entries`);

// ── 7. Import TopIssues ───────────────────────────────────────────────────────
db.prepare(`DELETE FROM cdm_tracker_LandscapeTopIssue WHERE customerAgentId = ?`).run(customerId);
const insTI = db.prepare(`
  INSERT INTO cdm_tracker_LandscapeTopIssue
    (ID, customerAgentId, dedCode, issueId, dateIdentified, rating, category,
     statusSummary, businessImpact, actionPlan, statusOfActionPlan, resolutionDate,
     status, priority, responsible, internalOnly,
     createUserId, createUserName, createDateTime,
     updateUserId, updateUserName, updateDateTime)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`);
for (const t of lb.TopIssues) {
  insTI.run(
    randomUUID(), customerId, t.Code, t.IssueId,
    parseDate(t.DateIdentified), t.Rating, t.Category,
    t.StatusSummary, t.BusinessImpact, t.ActionPlan, t.StatusOfActionPlan,
    parseDate(t.ResolutionDate),
    t.Status, t.Priority, t.Responsible,
    t.InternalOnly === 'true' ? 1 : 0,
    t.CreateUserId, t.CreateUserName,
    t.CreateDateTime ? t.CreateDateTime.split('.')[0].replace(' ', 'T') : null,
    t.UpdateUserId, t.UpdateUserName,
    t.UpdateDateTime ? t.UpdateDateTime.split('.')[0].replace(' ', 'T') : null
  );
}
console.log(`Inserted ${lb.TopIssues.length} top issues`);

// ── 8. Import LandscapeSystems ────────────────────────────────────────────────
db.prepare(`DELETE FROM cdm_tracker_LandscapeSystem WHERE customerAgentId = ?`).run(customerId);
const insLS = db.prepare(`
  INSERT INTO cdm_tracker_LandscapeSystem
    (ID, customerAgentId, sortKey, tierKey, solutionCode, solutionDescr, itemCode,
     description, tier, sid, dbSid, isDR, isActive, isLoadBalancer,
     deliveryStatus, hecCloudOption, tierVerified)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`);
for (const s of lb.LandscapeStructure) {
  insLS.run(
    randomUUID(), customerId, s.SortKey, s.TierKey || null,
    s.SolutionCode, s.SolutionDescr, s.ItemCode, s.Description,
    s.Tier || null, s.SID || null, s.DBSID || null,
    s.IsDR === 'true' ? 1 : 0,
    s.IsActive === 'true' ? 1 : 0,
    s.IsLoadBalancer === 'true' ? 1 : 0,
    s.DeliveryStatus || null, s.HECCloudOption || null, s.TierVerified || null
  );
}
console.log(`Inserted ${lb.LandscapeStructure.length} landscape systems`);

// ── 9. Recreate CDMService views (only affected ones) ────────────────────────
function recreateView(table, viewName) {
  const cols = db.prepare(`PRAGMA table_info('${table}')`).all().map(c => `"${c.name}"`).join(', ');
  db.prepare(`DROP VIEW IF EXISTS "${viewName}"`).run();
  db.prepare(`CREATE VIEW "${viewName}" AS SELECT ${cols} FROM "${table}"`).run();
  console.log(`View recreated: ${viewName}`);
}

recreateView('cdm_tracker_CustomerAgent',         'CDMService_CustomerAgents');
recreateView('cdm_tracker_LandscapePhase',        'CDMService_LandscapePhases');
recreateView('cdm_tracker_LandscapeWeeklyStatus', 'CDMService_LandscapeWeeklyStatus');
recreateView('cdm_tracker_LandscapeTopIssue',     'CDMService_LandscapeTopIssues');
recreateView('cdm_tracker_LandscapeSystem',       'CDMService_LandscapeSystems');

console.log('\nDone!');
db.close();
