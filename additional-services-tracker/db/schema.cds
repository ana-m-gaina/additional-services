namespace cdm.as;
using { managed } from '@sap/cds/common';

// ── Main entity ───────────────────────────────────────────────────────────────

entity AdditionalServiceRequest : managed {
  key ID : UUID;

  // Customer & Service
  customerName          : String(200)  not null;
  processType           : String(10)   not null default 'Classic';
  additionalServiceIds  : String(500);
  rrDescription         : String(1000);

  // System Identifiers
  sid                   : String(20);
  caseNo                : String(100);
  csrNo                 : String(100);

  // Ticket Numbers
  spcTicketMain         : String(100);
  spcExecutionRef       : String(100); // Q1 pending — second SPC "execution tt"
  bcpTicketNo           : String(50);
  amsTicketNo           : String(100);
  itsmTicketNo          : String(100);

  // Pricing
  price                 : Decimal(15,2);
  currency              : String(3);
  priceInWords          : String(500);
  poNo                  : String(100);

  // Key Dates
  creationDate          : Date;
  priceCommunicatedDate : Date;
  priceValidUntil       : Date;
  approvalReceivedDate  : Date;
  customerClosureDate   : Date;
  amsClosureDate        : Date;
  o2iTicketCreatedDate  : Date;

  // Invoice / O2I
  o2iTicketNo           : String(100); // format NOT validated — FI130040379 and ECSBO-NNNNN both valid
  salesOrderNo          : String(100);
  activityPerformed     : String(200);

  // Status & Activity Log
  status                : String(30) not null default 'Request received';
  activityLog           : LargeString;
  cdmOwner              : String(200) not null;

  // Checklist
  checkPriceEmailSent     : Boolean default false;
  checkApprovalReceived   : Boolean default false;
  checkSharePointUploaded : Boolean default false;
  checkCasSdInformed      : Boolean default false;
  checkAmsClosed          : Boolean default false;
  checkO2iCreated         : Boolean default false;

  // Notes
  notes                 : LargeString;
}

// ── Persona workspace + conversation memory ──────────────────────────────────

entity PersonaLayout {
  key userId     : String(200);
      layoutJson : LargeString;
      updatedAt  : DateTime;
}

entity ConversationTurn : managed {
  key ID        : UUID;
      userId    : String(200);
      role      : String(10);    // 'user' | 'assistant' | 'tool'
      content   : LargeString;
      sessionId : String(100);
      agentName : String(100);   // which agent produced this turn
}

// ── Agent hierarchy ───────────────────────────────────────────────────────────

entity ClientAgent {
  key ID          : UUID;
      customerId  : String(200); // matches customerName on Requests
      displayName : String(200); // user-configurable label
      createdBy   : String(200);
      createdAt   : DateTime;
}

entity ContractSubagent {
  key ID           : UUID;
      clientId     : UUID;        // FK → ClientAgent
      sid          : String(50);
      displayName  : String(200); // user-configurable label
      contractType : String(50);  // 'Classic' | 'ATLAS'
      createdAt    : DateTime;
}

entity AutomationAgent {
  key ID          : UUID;
      eventType   : String(100); // e.g. 'customer.acceptance'
      displayName : String(200); // user-configurable; default = event type label
      enabled     : Boolean default true;
      createdBy   : String(200);
      createdAt   : DateTime;
}

entity PendingAction {
  key ID               : UUID;
      userId           : String(200);
      automationId     : UUID;        // FK → AutomationAgent
      sessionId        : String(100);
      prompt           : LargeString; // what the agent is asking the CDM
      status           : String(20);  // 'pending' | 'responded' | 'dismissed'
      relatedRequestId : UUID;        // FK → AdditionalServiceRequest (nullable)
      createdAt        : DateTime;
      resolvedAt       : DateTime;
}

// ── Admin-editable reference data ────────────────────────────────────────────

entity RRReference {
  key rrId    : String(50);
  description : String(500) not null;
  category    : String(200);
  isActive    : Boolean default true;
}

entity PricingEntry {
  key rrId    : String(50);
  price       : Decimal(15,2) not null;
  currency    : String(10) not null;
  lastUpdated : Date not null;
}

entity EmailTemplate {
  key templateKey : String(50);
  subject         : String(500);
  body            : LargeString not null;
  lastUpdated     : Date;
}

entity AdminConfig {
  key configKey : String(100);
  configValue   : String(2000);
  description   : String(500);
}
