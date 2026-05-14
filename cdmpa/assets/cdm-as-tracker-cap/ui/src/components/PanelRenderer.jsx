import RecordCard from './panels/RecordCard.jsx'
import RecordTable from './panels/RecordTable.jsx'
import FieldForm from './panels/FieldForm.jsx'
import StatusTimeline from './panels/StatusTimeline.jsx'
import Checklist from './panels/Checklist.jsx'
import EmailDraft from './panels/EmailDraft.jsx'
import KpiStrip from './panels/KpiStrip.jsx'
import ReminderBanner from './panels/ReminderBanner.jsx'
import TicketRef from './panels/TicketRef.jsx'
import ConfirmDialog from './panels/ConfirmDialog.jsx'
import RrSource from './panels/RrSource.jsx'
import PdfViewer from './panels/PdfViewer.jsx'
import MeetingTopics      from './panels/MeetingTopics.jsx'
import MeetingActionItems from './panels/MeetingActionItems.jsx'
import MeetingRisks       from './panels/MeetingRisks.jsx'

const MAP = {
  'record-card':     RecordCard,
  'record-table':    RecordTable,
  'field-form':      FieldForm,
  'status-timeline': StatusTimeline,
  'checklist':       Checklist,
  'email-draft':     EmailDraft,
  'kpi-strip':       KpiStrip,
  'reminder-banner': ReminderBanner,
  'ticket-ref':      TicketRef,
  'confirm-dialog':  ConfirmDialog,
  'rr-source':       RrSource,
  'pdf-viewer':      PdfViewer,
  'meeting-topics':       MeetingTopics,
  'meeting-action-items': MeetingActionItems,
  'meeting-risks':        MeetingRisks,
}

export default function PanelRenderer({ panel, cdmEmail, inline = false }) {
  const Component = MAP[panel?.type]
  if (!Component) {
    return (
      <div style={{ padding: '0.75rem', background: '#f5f5f5', borderRadius: 6, fontSize: '0.85rem', color: '#666' }}>
        Unknown panel type: {panel?.type}
      </div>
    )
  }
  return <Component panel={panel} cdmEmail={cdmEmail} inline={inline} />
}
