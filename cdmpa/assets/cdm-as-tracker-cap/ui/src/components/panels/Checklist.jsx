import { useState } from 'react'
import { Button, CheckBox } from '@ui5/webcomponents-react'
import { patchASRequest } from '../../api.js'

const CHECKLIST_FIELDS = [
  { name: 'chk1ScopingDone',          label: 'Scoping done' },
  { name: 'chk2PriceSent',            label: 'Price communicated to customer' },
  { name: 'chk3ApprovalReceived',     label: 'Customer approval received' },
  { name: 'chk4O2ITicketCreated',     label: 'O2I ticket created' },
  { name: 'chk5DeliveryConfirmed',    label: 'Delivery confirmed' },
  { name: 'chk6InvoiceRequested',     label: 'Invoice requested' },
]

export default function Checklist({ panel }) {
  const r = panel.data || {}
  const [values, setValues] = useState(() => {
    const init = {}
    CHECKLIST_FIELDS.forEach(f => { init[f.name] = !!r[f.name] })
    return init
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function toggle(name) {
    setSaved(false)
    setValues(v => ({ ...v, [name]: !v[name] }))
  }

  async function save() {
    setSaving(true)
    try {
      await patchASRequest(panel.requestId || r.ID, values)
      setSaved(true)
    } catch (e) { alert(e.message) }
    finally { setSaving(false) }
  }

  return (
    <div>
      {panel.title && <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{panel.title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
        {CHECKLIST_FIELDS.map(f => (
          <CheckBox
            key={f.name}
            text={f.label}
            checked={values[f.name]}
            onChange={() => toggle(f.name)}
          />
        ))}
      </div>
      <Button design="Emphasized" onClick={save} disabled={saving}>
        {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Checklist'}
      </Button>
    </div>
  )
}
