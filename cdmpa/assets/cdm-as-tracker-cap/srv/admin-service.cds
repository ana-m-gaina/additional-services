using { cdm.tracker as db } from '../db/schema';

@requires: ['Admin']
service AdminService @(path: '/AdminService') {

  entity PricingTable        as projection on db.PricingTable;
  entity RRTable             as projection on db.RRTable;
  entity JiraTicketTemplates as projection on db.JiraTicketTemplate;
  entity EmailTemplates      as projection on db.EmailTemplate;
  entity AdminConfigs        as projection on db.AdminConfig;
  entity RRDocuments         as projection on db.RRDocument;
  entity RRChunks            as projection on db.RRChunk;
  entity PricingChunks       as projection on db.PricingChunk;
}
