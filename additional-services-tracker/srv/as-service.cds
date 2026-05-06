using cdm.as.AdditionalServiceRequest from '../db/schema';
using cdm.as.RRReference             from '../db/schema';
using cdm.as.PricingEntry            from '../db/schema';
using cdm.as.EmailTemplate           from '../db/schema';
using cdm.as.AdminConfig             from '../db/schema';
using cdm.as.PersonaLayout           from '../db/schema';
using cdm.as.ConversationTurn        from '../db/schema';
using cdm.as.ClientAgent             from '../db/schema';
using cdm.as.ContractSubagent        from '../db/schema';
using cdm.as.AutomationAgent         from '../db/schema';
using cdm.as.PendingAction           from '../db/schema';

// ── Service ───────────────────────────────────────────────────────────────────

@path: '/api/v1'
service AdditionalServicesService {

  // All authenticated users can read and create requests
  @Capabilities.Insertable: true
  @Capabilities.Updatable:  true
  @Capabilities.Deletable:  false
  entity Requests     as projection on AdditionalServiceRequest;

  // Admin-editable reference data — writes restricted to admin role in handler
  entity RRReferences as projection on RRReference;
  entity Pricing      as projection on PricingEntry;
  entity Templates    as projection on EmailTemplate;
  entity Config       as projection on AdminConfig;

  // AI touchpoints (server-side only — API key never reaches browser)
  action extractFromEmail(emailText: String) returns String;
  action matchRR(description: String)        returns String;
  action draftPriceEmail(requestId: UUID)    returns String;
  action generateO2ITicket(requestId: UUID)  returns String;

  // JIRA integration — creates the actual ticket from pre-reviewed title + body
  action createO2ITicket(requestId: UUID, ticketTitle: String, ticketBody: String) returns String;

  // Conversational interface — agent queries DB for relevant context each turn
  action chat(message: String) returns String;

  // Persona workspace and conversation history
  entity PersonaLayouts    as projection on PersonaLayout;
  entity ConversationTurns as projection on ConversationTurn;

  // Agent hierarchy — nav tree data
  entity ClientAgents      as projection on ClientAgent;
  entity ContractSubagents as projection on ContractSubagent;
  entity AutomationAgents  as projection on AutomationAgent;
  entity PendingActions    as projection on PendingAction;

  // Orchestrator entry point — tool-use agent loop
  action orchestrate(
    message       : String,
    sessionId     : String,
    mode          : String,    // 'chat' | 'dashboard'
    assistantName : String     // current name, e.g. 'Beacon'
  ) returns String;      // JSON: { reply, panels?, proposedLayout?, renameAssistant? }

  // Mock event endpoint for demo — triggers automation agents without real Event Mesh
  action triggerMockEvent(
    eventType : String,        // e.g. 'customer.acceptance'
    payload   : String         // JSON string — event-specific data
  ) returns String;

  // Value help entity sets (in-memory, served by handler)
  @readonly entity StatusValues  { key code: String; }
  @readonly entity ProcessTypes  { key code: String; }
  @readonly entity Currencies    { key code: String; }
}

// ── Fiori Elements annotations ────────────────────────────────────────────────

// Field-level labels — drives column headers, form labels, and filter bar
annotate AdditionalServicesService.Requests with {
  customerName          @title: 'Customer Name';
  processType           @title: 'Process Type';
  additionalServiceIds  @title: 'Additional Service ID(s)';
  rrDescription         @title: 'R&R Description';
  sid                   @title: 'SID';
  caseNo                @title: 'Case No.';
  csrNo                 @title: 'CSR No.';
  spcTicketMain         @title: 'SPC Ticket (Main)';
  spcExecutionRef       @title: 'SPC Execution Reference';
  bcpTicketNo           @title: 'BCP Ticket No.';
  amsTicketNo           @title: 'AMS Ticket No.';
  itsmTicketNo          @title: 'ITSM Ticket No.';
  price                 @title: 'Price';
  currency              @title: 'Currency';
  priceInWords          @title: 'Price in Words'
                        @Core.Computed: true;
  poNo                  @title: 'PO No.';
  creationDate          @title: 'Creation Date';
  priceCommunicatedDate @title: 'Price Communicated Date';
  priceValidUntil       @title: 'Price Valid Until'
                        @Core.Computed: true;
  approvalReceivedDate  @title: 'Approval Received Date';
  customerClosureDate   @title: 'Customer Closure Date';
  amsClosureDate        @title: 'AMS Closure Date';
  o2iTicketCreatedDate  @title: 'O2I Ticket Created Date';
  o2iTicketNo           @title: 'O2I Invoice Ticket No.';
  salesOrderNo          @title: 'Sales Order / Contract No.';
  activityPerformed     @title: 'Activity Performed';
  status                @title: 'Status';
  activityLog           @title: 'Activity Log'
                        @UI.MultiLineText: true;
  cdmOwner              @title: 'CDM Owner';
  checkPriceEmailSent     @title: 'Price Email Sent';
  checkApprovalReceived   @title: 'Approval Received';
  checkSharePointUploaded @title: 'SharePoint Upload Done';
  checkCasSdInformed      @title: 'CAS SD Informed';
  checkAmsClosed          @title: 'AMS Ticket Closed';
  checkO2iCreated         @title: 'O2I Ticket Created';
  notes                 @title: 'Notes'
                        @UI.MultiLineText: true;
}

// Value lists and field-level hints
annotate AdditionalServicesService.Requests with {
  status @(
    Common.ValueList: {
      CollectionPath: 'StatusValues',
      Parameters: [{ $Type: 'Common.ValueListParameterOut', LocalDataProperty: status, ValueListProperty: 'code' }]
    }
  );
  processType @(
    Common.ValueList: {
      CollectionPath: 'ProcessTypes',
      Parameters: [{ $Type: 'Common.ValueListParameterOut', LocalDataProperty: processType, ValueListProperty: 'code' }]
    }
  );
  currency @(
    Common.ValueList: {
      CollectionPath: 'Currencies',
      Parameters: [{ $Type: 'Common.ValueListParameterOut', LocalDataProperty: currency, ValueListProperty: 'code' }]
    }
  );
  approvalReceivedDate @(
    Common.QuickInfo: 'Approval must be in writing — email or SR comment'
  );
  poNo @(
    Common.QuickInfo: 'Confirm with customer whether a PO number is required'
  );
  priceInWords @(
    Common.FieldControl: #ReadOnly
  );
  priceValidUntil @(
    Common.FieldControl: #ReadOnly
  );
}

// List Report
annotate AdditionalServicesService.Requests with @(
  UI.LineItem: [
    { $Type: 'UI.DataField', Value: customerName,         Importance: #High },
    { $Type: 'UI.DataField', Value: additionalServiceIds, Importance: #High },
    {
      $Type:  'UI.DataFieldForAnnotation',
      Target: '@UI.DataPoint#Status',
      Label:  'Status',
      Importance: #High
    },
    { $Type: 'UI.DataField', Value: cdmOwner,   Importance: #High },
    { $Type: 'UI.DataField', Value: modifiedAt, Importance: #Medium }
  ],

  UI.DataPoint#Status: {
    Value: status,
    Title: 'Status'
  },

  UI.SelectionFields: [ status, cdmOwner ],

  UI.PresentationVariant: {
    SortOrder:      [{ Property: modifiedAt, Descending: true }],
    Visualizations: ['@UI.LineItem']
  },

  // Object page header
  UI.HeaderInfo: {
    TypeName:       'AS Request',
    TypeNamePlural: 'AS Requests',
    Title:          { $Type: 'UI.DataField', Value: customerName },
    Description:    { $Type: 'UI.DataField', Value: status }
  },

  UI.HeaderFacets: [
    {
      $Type:  'UI.ReferenceFacet',
      ID:     'StatusPoint',
      Target: '@UI.DataPoint#Status'
    }
  ],

  // Identification — used by smart actions and related features
  UI.Identification: [
    { $Type: 'UI.DataField', Value: customerName },
    { $Type: 'UI.DataField', Value: status }
  ],

  // Facets — sections in spec Section 6 order
  UI.Facets: [
    {
      $Type:  'UI.CollectionFacet',
      ID:     'CustomerService',
      Label:  'Customer & Service',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'CustomerServiceFG', Target: '@UI.FieldGroup#CustomerService' }]
    },
    {
      $Type:  'UI.CollectionFacet',
      ID:     'SystemIdentifiers',
      Label:  'System Identifiers',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'SystemIdentifiersFG', Target: '@UI.FieldGroup#SystemIdentifiers' }]
    },
    {
      $Type:  'UI.CollectionFacet',
      ID:     'TicketNumbers',
      Label:  'Ticket Numbers',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'TicketNumbersFG', Target: '@UI.FieldGroup#TicketNumbers' }]
    },
    {
      $Type:  'UI.CollectionFacet',
      ID:     'Pricing',
      Label:  'Pricing',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'PricingFG', Target: '@UI.FieldGroup#Pricing' }]
    },
    {
      $Type:  'UI.CollectionFacet',
      ID:     'KeyDates',
      Label:  'Key Dates',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'KeyDatesFG', Target: '@UI.FieldGroup#KeyDates' }]
    },
    {
      $Type:  'UI.CollectionFacet',
      ID:     'InvoiceO2I',
      Label:  'Invoice / O2I',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'InvoiceO2IFG', Target: '@UI.FieldGroup#InvoiceO2I' }]
    },
    {
      $Type:  'UI.CollectionFacet',
      ID:     'StatusLog',
      Label:  'Status & Activity Log',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'StatusLogFG', Target: '@UI.FieldGroup#StatusLog' }]
    },
    {
      $Type:  'UI.CollectionFacet',
      ID:     'Checklist',
      Label:  'Checklist',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'ChecklistFG', Target: '@UI.FieldGroup#Checklist' }]
    },
    {
      $Type:  'UI.CollectionFacet',
      ID:     'Notes',
      Label:  'Notes',
      Facets: [{ $Type: 'UI.ReferenceFacet', ID: 'NotesFG', Target: '@UI.FieldGroup#Notes' }]
    }
  ],

  // Field groups — Label omitted; driven by @title annotations above
  UI.FieldGroup#CustomerService: {
    Label: 'Customer & Service',
    Data: [
      { $Type: 'UI.DataField', Value: customerName         },
      { $Type: 'UI.DataField', Value: processType          },
      { $Type: 'UI.DataField', Value: additionalServiceIds },
      { $Type: 'UI.DataField', Value: rrDescription        }
    ]
  },

  UI.FieldGroup#SystemIdentifiers: {
    Label: 'System Identifiers',
    Data: [
      { $Type: 'UI.DataField', Value: sid    },
      { $Type: 'UI.DataField', Value: caseNo },
      { $Type: 'UI.DataField', Value: csrNo  }
    ]
  },

  UI.FieldGroup#TicketNumbers: {
    Label: 'Ticket Numbers',
    Data: [
      { $Type: 'UI.DataField', Value: spcTicketMain   },
      { $Type: 'UI.DataField', Value: spcExecutionRef },
      { $Type: 'UI.DataField', Value: bcpTicketNo     },
      { $Type: 'UI.DataField', Value: amsTicketNo     },
      { $Type: 'UI.DataField', Value: itsmTicketNo    }
    ]
  },

  UI.FieldGroup#Pricing: {
    Label: 'Pricing',
    Data: [
      { $Type: 'UI.DataField', Value: price        },
      { $Type: 'UI.DataField', Value: currency     },
      { $Type: 'UI.DataField', Value: priceInWords },
      { $Type: 'UI.DataField', Value: poNo         }
    ]
  },

  UI.FieldGroup#KeyDates: {
    Label: 'Key Dates',
    Data: [
      { $Type: 'UI.DataField', Value: creationDate          },
      { $Type: 'UI.DataField', Value: priceCommunicatedDate },
      { $Type: 'UI.DataField', Value: priceValidUntil       },
      { $Type: 'UI.DataField', Value: approvalReceivedDate  },
      { $Type: 'UI.DataField', Value: customerClosureDate   },
      { $Type: 'UI.DataField', Value: amsClosureDate        },
      { $Type: 'UI.DataField', Value: o2iTicketCreatedDate  }
    ]
  },

  UI.FieldGroup#InvoiceO2I: {
    Label: 'Invoice / O2I',
    Data: [
      { $Type: 'UI.DataField', Value: o2iTicketNo       },
      { $Type: 'UI.DataField', Value: salesOrderNo      },
      { $Type: 'UI.DataField', Value: activityPerformed }
    ]
  },

  UI.FieldGroup#StatusLog: {
    Label: 'Status & Activity Log',
    Data: [
      { $Type: 'UI.DataField', Value: status      },
      { $Type: 'UI.DataField', Value: activityLog },
      { $Type: 'UI.DataField', Value: cdmOwner    }
    ]
  },

  UI.FieldGroup#Checklist: {
    Label: 'Checklist',
    Data: [
      { $Type: 'UI.DataField', Value: checkPriceEmailSent     },
      { $Type: 'UI.DataField', Value: checkApprovalReceived   },
      { $Type: 'UI.DataField', Value: checkSharePointUploaded },
      { $Type: 'UI.DataField', Value: checkCasSdInformed      },
      { $Type: 'UI.DataField', Value: checkAmsClosed          },
      { $Type: 'UI.DataField', Value: checkO2iCreated         }
    ]
  },

  UI.FieldGroup#Notes: {
    Label: 'Notes',
    Data: [
      { $Type: 'UI.DataField', Value: notes }
    ]
  }
);
