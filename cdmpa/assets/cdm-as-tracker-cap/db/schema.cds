using { cuid, managed } from '@sap/cds/common';

namespace cdm.tracker;

// ── AS Request — main entity ──────────────────────────────────────────────────

entity ASRequest : managed {
  key ID                     : String(50)   not null;
  // Core identity
  requestTitle           : String(200)   not null;
  customerName           : String(200)   not null;
  customerAccountId      : String(50);
  processType            : String(10)    default 'Classic'; // Classic | ATLAS

  // Service classification
  serviceCode            : String(20);
  serviceType            : String(100);
  additionalServiceIds   : String(500);  // comma-separated R&R codes
  rrDescription          : String(1000);
  description            : String(2000);

  // System identifiers
  sid                    : String(20);
  caseNo                 : String(100);
  csrNo                  : String(100);

  // Cross-system ticket IDs
  sap4MeTicketId         : String(100);
  spcTicketId            : String(100);
  spcExecutionRef        : String(100);
  btpTicketId            : String(100);
  amsTicketId            : String(100);
  serviceNowTicketId     : String(100);
  bcpTicketNo            : String(50);
  itsmTicketNo           : String(100);

  // Pricing
  price                  : Decimal(15,2);
  currency               : String(3)     default 'EUR';
  priceInWords           : String(500);  // auto-generated
  priceValidUntil        : Date;         // auto: priceCommunicatedDate + 90 days

  // Approval
  approvalText           : String(2000);
  poNumber               : String(100);
  poNo                   : String(100);  // alias for compatibility
  approvalDate           : DateTime;
  approvalReceivedDate   : Date;

  // Key dates
  creationDate           : Date;
  priceCommunicatedDate  : Date;
  priceValidFrom         : Date;
  customerClosureDate    : Date;
  amsClosureDate         : Date;
  deliveryDate           : DateTime;
  invoiceDate            : DateTime;

  // O2I / Invoice
  jiraTicketRef          : String(100);
  jiraTicketBody         : String(5000);
  o2iTicketNo            : String(100);
  o2iTicketCreatedDate   : Date;
  salesOrderNumber       : String(100);
  salesOrderNo           : String(100);  // alias for compatibility
  providerContractNumber : String(100);
  activityPerformed      : String(200);

  // Status
  status                 : String(50)    default 'New';
  assignedCDM            : String(100)   not null;
  cdmOwner               : String(200);  // alias for assignedCDM

  // Checklist
  checkPriceEmailSent     : Boolean      default false;
  checkApprovalReceived   : Boolean      default false;
  checkSharePointUploaded : Boolean      default false;
  checkCasSdInformed      : Boolean      default false;
  checkAmsClosed          : Boolean      default false;
  checkO2iCreated         : Boolean      default false;

  // Notes
  notes                  : LargeString;

  // Audit
  activityLog            : Composition of many ActivityLog on activityLog.request = $self;
}

// ── Activity log — per-request audit trail ────────────────────────────────────

entity ActivityLog : cuid {
  request     : Association to ASRequest;
  action      : String(200) not null;
  description : String(1000);
  performedBy : String(100);
  performedAt : DateTime    not null;
  oldStatus   : String(50);
  newStatus   : String(50);
}

// ── R&R reference ─────────────────────────────────────────────────────────────

entity RRTable : cuid, managed {
  serviceCode  : String(20)  not null;
  serviceName  : String(200) not null;
  category     : String(100);
  chargeable   : Boolean     default true;
  notes        : String(500);
  active       : Boolean     default true;
  // Legacy aliases
  rrId         : String(50);
  description  : String(500);
  isActive     : Boolean     default true;
}

// ── R&R document store (RAG) ──────────────────────────────────────────────────

entity RRDocument : cuid {
  filename   : String(300) not null;
  filepath   : String(500) not null;
  pageCount  : Integer;
  uploadedAt : DateTime;
}

entity RRChunk : cuid {
  document   : Association to RRDocument not null;
  pageNumber : Integer      not null;
  text       : LargeString  not null;
  embedding  : LargeString  not null;  // JSON array of floats
}

entity PricingChunk : cuid {
  serviceCode  : String(30)   not null;
  text         : LargeString  not null;
  embedding    : LargeString  not null;  // JSON array of floats
  priceEur     : Decimal(10,2);
  unitOfMeasure: String(100);
  effortType   : String(20);  // 'Standard' or 'Case-by-case'
}

// ── Pricing reference ─────────────────────────────────────────────────────────

entity PricingTable : cuid, managed {
  serviceCode    : String(20)    not null;
  serviceName    : String(200);
  price          : Decimal(10,2) not null;
  currency       : String(3)     default 'EUR';
  effectiveFrom  : Date;
  active         : Boolean       default true;
  lastUpdatedBy  : String(100);
  // Legacy aliases
  rrId           : String(50);
  lastUpdated    : Date;
}

// ── Card layout — per-CDM Space preferences ───────────────────────────────────

entity CardLayout : cuid {
  userEmail : String(200) not null;
  cardId    : String(50)  not null;
  visible   : Boolean     default true;
  sortOrder : Integer     default 0;
}

// ── JIRA O2I ticket template ──────────────────────────────────────────────────

entity JiraTicketTemplate : cuid {
  serviceType  : String(100)  not null;
  templateBody : String(5000) not null;
  active       : Boolean      default true;
}

// ── Persona layout — persisted workspace (dashboard mode) ─────────────────────

entity PersonaLayout {
  key userId    : String(200);
      layoutJson : LargeString;
      updatedAt  : DateTime;
}

// ── Conversation memory ───────────────────────────────────────────────────────

entity ConversationSession : cuid {
  customerAgentId : String(50);   // FK → CustomerAgent.ID (null = global)
  title           : String(200);
  createdBy       : String(200);
  createdAt       : DateTime;
  lastActiveAt    : DateTime;
}

entity ConversationTurn : cuid, managed {
  userId          : String(200);
  role            : String(10);    // 'user' | 'assistant' | 'tool'
  content         : LargeString;
  sessionId       : String(100);
  agentName       : String(100);   // which agent produced this turn
  customerAgentId : String(50);    // FK → CustomerAgent.ID (for per-client filtering)
}

// ── Customer → Contract agent hierarchy ──────────────────────────────────────

entity CustomerAgent : cuid {
  customerId      : String(200);
  displayName     : String(200);
  createdBy       : String(200);
  createdAt       : DateTime;
  // Lifecycle
  status          : String(20)  default 'active';  // active | suspended | archived | retired
  archivedAt      : DateTime;
  retentionPolicy : String(50);  // e.g. 'keep-5y', 'delete-on-retire'
  transferredTo   : String(200); // userId if ownership transferred
}

entity ContractSubagent : cuid {
  customerId      : String(50);   // FK → CustomerAgent.ID
  sid             : String(50);
  displayName     : String(200);
  contractType    : String(50);   // 'Classic' | 'ATLAS'
  createdAt       : DateTime;
  // Lifecycle
  status          : String(20)  default 'active';  // active | suspended | archived | retired
  archivedAt      : DateTime;
  retentionPolicy : String(50);
  transferredTo   : String(200);
}

// ── Integration agents ────────────────────────────────────────────────────────

entity IntegrationAgent : cuid {
  eventType       : String(100);
  displayName     : String(200);
  enabled         : Boolean      default true;
  createdBy       : String(200);
  createdAt       : DateTime;
  // Lifecycle
  status          : String(20)  default 'active';  // active | suspended | archived | retired
  archivedAt      : DateTime;
}

// ── Retired agents tombstone ──────────────────────────────────────────────────

entity RetiredAgent : cuid {
  originalId    : String(50)   not null;  // ID from CustomerAgent / ContractSubagent / IntegrationAgent
  agentType     : String(30)   not null;  // 'customer' | 'contract' | 'integration'
  displayName   : String(200)  not null;
  retiredBy     : String(200);
  retiredAt     : DateTime     not null;
  reason        : String(500);
  snapshotJson  : LargeString;            // final state of the agent record
}

// ── Inbox / pending actions ───────────────────────────────────────────────────

entity PendingAction : cuid {
  userId           : String(200);
  automationId     : String(50);  // FK → IntegrationAgent.ID
  sessionId        : String(100);
  prompt           : LargeString;
  status           : String(20)   default 'pending'; // pending | responded | dismissed
  relatedRequestId : String(50);   // FK → ASRequest.ID (nullable)
  navigateTo       : String(500);  // JSON: {page, customerId?, customerAgentId?, requestId?}
  createdAt        : DateTime;
  resolvedAt       : DateTime;
}

// ── Personal templates — per-CDM reusable text snippets ──────────────────────

entity PersonalTemplate : cuid, managed {
  cdmEmail    : String(200) not null;
  templateKey : String(100) not null;
  description : String(500);
  content     : LargeString not null;
}

// ── Personal notes — CDM freeform notes tied to a session/request ─────────────

entity PersonalNote : cuid, managed {
  cdmEmail      : String(200)  not null;
  content       : LargeString  not null;
  tags          : String(500);          // comma-separated for lightweight search
  relatedRequest: String(50);           // FK → ASRequest.ID (nullable)
  sessionId     : String(100);
}

// ── Admin-editable reference data ─────────────────────────────────────────────

entity EmailTemplate : cuid {
  templateKey : String(50)   not null;
  subject     : String(500);
  body        : LargeString  not null;
  lastUpdated : Date;
}

entity AdminConfig {
  key ID        : String(100);
  configKey   : String(100)  not null;
  configValue : String(2000);
  description : String(500);
}

// ── User-registered agents — A2A-compatible agents the CDM adds personally ───

entity UserAgent : cuid, managed {
  cdmEmail    : String(200) not null;
  name        : String(200) not null;
  description : String(500);
  endpointUrl : String(1000) not null;
  status      : String(20)  default 'active';  // active | disabled
}

// ── User-registered skills — MCP-compatible skill endpoints ──────────────────

entity UserSkill : cuid, managed {
  cdmEmail    : String(200) not null;
  name        : String(200) not null;
  description : String(500);
  endpointUrl : String(1000) not null;
  status      : String(20)  default 'active';  // active | disabled
}

// ── Meeting notes — extracted from ops meeting notes pasted in chat ───────────

entity MeetingNote : cuid, managed {
  customerAgentId : String(50)  not null;  // FK → CustomerAgent.ID
  clientName      : String(200);
  meetingDate     : Date;
  rawText         : LargeString;
  extractedJson   : LargeString;
  topicsJson      : LargeString;
  actionItemsJson : LargeString;
  risksJson       : LargeString;
  decisionsJson   : LargeString;
  processedBy     : String(200);
}
