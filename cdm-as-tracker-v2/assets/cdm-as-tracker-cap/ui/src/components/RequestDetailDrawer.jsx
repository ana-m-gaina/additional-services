import { useState } from 'react'
import { Dialog, Bar, Button, Label, Input, TextArea } from '@ui5/webcomponents-react'
import { advanceStatus, recordApproval } from '../api.js'

export default function RequestDetailDrawer({ request, onClose, onRefresh }) {
  const [priceForm, setPriceForm]       = useState({ price: '', currency: 'EUR', comment: '' })
  const [approvalForm, setApprovalForm] = useState({ approvalText: '', poNumber: '' })
  const [busy, setBusy] = useState(false)

  async function doAdvance(newStatus, comment = '') {
    setBusy(true)
    try { await advanceStatus(request.ID, newStatus, comment); onRefresh?.(); onClose() }
    catch (e) { alert(e.message) }
    finally { setBusy(false) }
  }

  async function doRecordApproval() {
    setBusy(true)
    try { await recordApproval(request.ID, approvalForm.approvalText, approvalForm.poNumber); onRefresh?.(); onClose() }
    catch (e) { alert(e.message) }
    finally { setBusy(false) }
  }

  if (!request) return null
  const logs = [...(request.activityLog || [])].sort((a, b) => new Date(a.performedAt) - new Date(b.performedAt))
  const s = request.status

  return (
    <Dialog
      open
      headerText={request.requestTitle || `${request.customerId} — ${request.requestedService}`}
      style={{ '--_ui5_dialog_max_width': '640px' }}
      onAfterClose={onClose}
      footer={<Bar endContent={<Button onClick={onClose}>Close</Button>} />}
    >
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div><Label>Customer</Label><p>{request.customerName} ({request.customerId})</p></div>
          <div><Label>SID</Label><p>{request.sid || '—'}</p></div>
          <div><Label>Status</Label><p><span className={`status-badge status-${s}`}>{s}</span></p></div>
          <div><Label>CDM Owner</Label><p>{request.cdmOwner || '—'}</p></div>
          <div><Label>Price</Label><p>{request.currency} {request.estimatedPrice ?? '—'}{request.priceInWords ? ` (${request.priceInWords})` : ''}</p></div>
          <div><Label>PO Number</Label><p>{request.poNumber || '—'}</p></div>
          {request.rrCode     && <div><Label>R&R Code</Label><p>{request.rrCode}</p></div>}
          {request.sap4MeId   && <div><Label>SAP4Me</Label><p>{request.sap4MeId}</p></div>}
          {request.spcId      && <div><Label>SPC</Label><p>{request.spcId}</p></div>}
          {request.o2iTicketNo && <div><Label>O2I Ticket</Label><p>{request.o2iTicketNo}</p></div>}
        </div>
        {request.notes && <div><Label>Notes</Label><p>{request.notes}</p></div>}
        {request.approvalText && <div><Label>Approval Text</Label><p>{request.approvalText}</p></div>}

        {s === 'New' && (
          <div style={{ border: '1px solid #e5e5e5', padding: '1rem', borderRadius: 8 }}>
            <Label>Communicate Price</Label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <Input placeholder="Price" value={priceForm.price} onInput={e => setPriceForm(f => ({ ...f, price: e.target.value }))} style={{ width: 120 }} />
              <Input placeholder="EUR" value={priceForm.currency} onInput={e => setPriceForm(f => ({ ...f, currency: e.target.value }))} style={{ width: 80 }} />
              <Input placeholder="Comment" value={priceForm.comment} onInput={e => setPriceForm(f => ({ ...f, comment: e.target.value }))} style={{ flex: 1 }} />
              <Button design="Emphasized" disabled={busy} onClick={() => doAdvance('PriceCommunicated', priceForm.comment)}>Send</Button>
            </div>
          </div>
        )}

        {s === 'PriceCommunicated' && (
          <div style={{ border: '1px solid #e5e5e5', padding: '1rem', borderRadius: 8 }}>
            <Label>Record Customer Approval</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <TextArea placeholder="Paste customer approval email text..." value={approvalForm.approvalText} onInput={e => setApprovalForm(f => ({ ...f, approvalText: e.target.value }))} rows={3} />
              <Input placeholder="PO Number (optional)" value={approvalForm.poNumber} onInput={e => setApprovalForm(f => ({ ...f, poNumber: e.target.value }))} />
              <Button design="Emphasized" disabled={busy || !approvalForm.approvalText} onClick={doRecordApproval}>Record Approval</Button>
            </div>
          </div>
        )}

        {s === 'Approved'    && <Button design="Emphasized" disabled={busy} onClick={() => doAdvance('InDelivery')}>Start Delivery</Button>}
        {s === 'InDelivery'  && <Button design="Emphasized" disabled={busy} onClick={() => doAdvance('Delivered')}>Confirm Delivery</Button>}
        {s === 'Delivered'   && <Button design="Emphasized" disabled={busy} onClick={() => doAdvance('Invoiced')}>Mark Invoiced</Button>}

        {logs.length > 0 && (
          <div>
            <Label>Activity Log</Label>
            <div className="timeline" style={{ marginTop: '0.5rem' }}>
              {logs.map(l => (
                <div key={l.ID} className="timeline-item">
                  <strong>{l.action}</strong>
                  {l.oldStatus && <span> · {l.oldStatus} → {l.newStatus}</span>}
                  {l.description && <p>{l.description}</p>}
                  <div className="time">{l.performedBy} · {new Date(l.performedAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Dialog>
  )
}
