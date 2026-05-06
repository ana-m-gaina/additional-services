import { useState } from 'react'
import { Button, Form, FormItem, Input, Label } from '@ui5/webcomponents-react'
import { patchASRequest } from '../../api.js'

export default function FieldForm({ panel }) {
  const fields = panel.fields || []
  const [values, setValues] = useState(() => {
    const init = {}
    fields.forEach(f => { init[f.name] = f.value ?? '' })
    return init
  })
  const [status, setStatus] = useState(null) // null | 'confirm' | 'saving' | 'done'

  function set(name, value) { setValues(v => ({ ...v, [name]: value })) }

  async function save() {
    setStatus('saving')
    try {
      await patchASRequest(panel.requestId, values)
      setStatus('done')
    } catch (e) {
      alert(e.message)
      setStatus(null)
    }
  }

  if (status === 'done') {
    return <div style={{ padding: '0.75rem', color: '#0a6640', fontWeight: 500 }}>Saved.</div>
  }

  return (
    <div>
      {panel.title && <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{panel.title}</div>}
      <Form>
        {fields.map(f => (
          <FormItem key={f.name} label={<Label>{f.label || f.name}</Label>}>
            <Input
              value={values[f.name]}
              onInput={e => set(f.name, e.target.value)}
              disabled={status === 'saving'}
            />
          </FormItem>
        ))}
      </Form>
      {status === 'confirm' ? (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
          <Button design="Emphasized" onClick={save}>Confirm Update</Button>
          <Button onClick={() => setStatus(null)}>Cancel</Button>
        </div>
      ) : (
        <Button design="Emphasized" onClick={() => setStatus('confirm')} style={{ marginTop: '0.75rem' }}>
          {status === 'saving' ? 'Saving…' : 'Update'}
        </Button>
      )}
    </div>
  )
}
