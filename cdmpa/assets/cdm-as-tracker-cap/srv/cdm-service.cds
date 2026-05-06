using { cdm.tracker as db } from '../db/schema';

@requires: ['CDM', 'Manager']
service CDMService @(path: '/CDMService') {

  // ── AS Requests ────────────────────────────────────────────────────────────
  entity ASRequest as projection on db.ASRequest {
    *,
    activityLog
  }
  actions {
    action generateJiraTicket()                                        returns String;
    action advanceStatus(newStatus: String, comment: String)           returns ASRequest;
    action recordApproval(approvalText: String, poNumber: String)      returns ASRequest;
  };

  @readonly
  entity ActivityLog    as projection on db.ActivityLog;

  // ── Reference data ─────────────────────────────────────────────────────────
  @readonly
  entity RRTable        as projection on db.RRTable;

  @readonly
  entity PricingTable   as projection on db.PricingTable;

  // ── Space layout ───────────────────────────────────────────────────────────
  entity CardLayout     as projection on db.CardLayout;

  action saveCardLayout(
    layouts: many {
      cardId    : String;
      visible   : Boolean;
      sortOrder : Integer;
    }
  ) returns Boolean;

  // ── Persona workspace ──────────────────────────────────────────────────────
  entity PersonaLayouts as projection on db.PersonaLayout;

  action savePersonaLayout(layoutJson: String) returns Boolean;

  // ── Conversation memory ────────────────────────────────────────────────────
  entity ConversationTurns as projection on db.ConversationTurn;

  // ── Agent hierarchy ────────────────────────────────────────────────────────
  entity ClientAgents        as projection on db.ClientAgent;
  entity ContractSubagents   as projection on db.ContractSubagent;
  entity AutomationAgents    as projection on db.AutomationAgent;
  entity PendingActions      as projection on db.PendingAction;

  @readonly
  entity RetiredAgents       as projection on db.RetiredAgent;

  // ── Personal templates & notes (per-CDM, scoped by auth) ─────────────────────
  entity PersonalTemplates as projection on db.PersonalTemplate
    where cdmEmail = $user;

  action savePersonalTemplate(
    templateKey : String,
    description : String,
    content     : String
  ) returns Boolean;

  entity PersonalNotes as projection on db.PersonalNote
    where cdmEmail = $user;

  action savePersonalNote(
    content        : String,
    tags           : String,
    relatedRequest : String,
    sessionId      : String
  ) returns Boolean;

  // ── Admin config (read-only for CDMs) ──────────────────────────────────────
  @readonly
  entity EmailTemplates as projection on db.EmailTemplate;

  @readonly
  entity AdminConfigs   as projection on db.AdminConfig;

  // ── Value helps ────────────────────────────────────────────────────────────
  @readonly entity StatusValues  { key code: String; }
  @readonly entity ProcessTypes  { key code: String; }
  @readonly entity Currencies    { key code: String; }

  // ── AI orchestration (proxied to Python agent) ─────────────────────────────
  action orchestrate(
    message       : String,
    sessionId     : String,
    mode          : String,
    assistantName : String
  ) returns String;

  // ── Mock event trigger (demo substitute for SAP Event Mesh) ───────────────
  action triggerMockEvent(eventType: String, payload: String) returns String;

  // ── Identity (sourced from SAP Identity Services / XSUAA in production) ───
  action whoami() returns {
    id    : String;
    roles : many String;
  };
}
