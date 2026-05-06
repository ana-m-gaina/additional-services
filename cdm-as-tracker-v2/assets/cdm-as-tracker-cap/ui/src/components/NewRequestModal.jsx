import { useState } from 'react'
import { Dialog, Bar, Button, Form, FormItem, Input, Select, Option, Label } from '@ui5/webcomponents-react'
import { postASRequest } from '../api.js'

const CURRENCIES = ['EUR', 'USD', 'CHF', 'GBP']
const PROCESS_TYPES = ['Standard', 'Premium', 'Custom']

export default function NewRequestModal({ open, onClose, cdmEmail }) {
  const [form, setForm] = useState({
    customerId: '', customerName: '', sid: '', rrCode: '',
    requestedService: '', processType: 'Standard', currency: 'EUR',
    estimatedPrice: '', notes: ''
  })
  const [saving, setSaving] = useState(false)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function submit() {
    if (!form.customerId.trim() || !form.requestedService.trim()) {
      alert('Customer ID and Requested Service are required.')
      return
    }
    setSaving(true)
    try {
      await postASRequest({
        ...form,
        estimatedPrice: form.estimatedPrice ? parseFloat(form.estimatedPrice) : null,
        cdmOwner: cdmEmail,
        status: 'New',
        createdAt: new Date().toISOString()
      })
      onClose(true)
      setForm({ customerId: '', customerName: '', sid: '', rrCode: '', requestedService: '', processType: 'Standard', currency: 'EUR', estimatedPrice: '', notes: '' })
    } catch (e) {
      alert('Failed to create request: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog
      open={open}
      onAfterClose={() => onClose(false)}
      headerText="New Additional Service Request"
      style={{ minWidth: 480 }}
      footer={
        <Bar endContent={
          <>
            <Button design="Emphasized" onClick={submit} disabled={saving}>
              {saving ? 'Creating…' : 'Create Request'}
            </Button>
            <Button onClick={() => onClose(false)}>Cancel</Button>
          </>
        } />
      }
    >
      <Form style={{ padding: '1rem' }}>
        <FormItem label={<Label required>Customer ID</Label>}>
          <Input value={form.customerId} onInput={e => set('customerId', e.target.value)} placeholder="e.g. C123456" />
        </FormItem>
        <FormItem label={<Label>Customer Name</Label>}>
          <Input value={form.customerName} onInput={e => set('customerName', e.target.value)} />
        </FormItem>
        <FormItem label={<Label>SID</Label>}>
          <Input value={form.sid} onInput={e => set('sid', e.target.value)} placeholder="e.g. PRD" />
        </FormItem>
        <FormItem label={<Label>R&R Code</Label>}>
          <Input value={form.rrCode} onInput={e => set('rrCode', e.target.value)} placeholder="e.g. SC-42" />
        </FormItem>
        <FormItem label={<Label required>Requested Service</Label>}>
          <Input value={form.requestedService} onInput={e => set('requestedService', e.target.value)} />
        </FormItem>
        <FormItem label={<Label>Process Type</Label>}>
          <Select onChange={e => set('processType', e.detail.selectedOption.value)}>
            {PROCESS_TYPES.map(pt => (
              <Option key={pt} value={pt} selected={form.processType === pt}>{pt}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label={<Label>Currency</Label>}>
          <Select onChange={e => set('currency', e.detail.selectedOption.value)}>
            {CURRENCIES.map(c => (
              <Option key={c} value={c} selected={form.currency === c}>{c}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label={<Label>Estimated Price</Label>}>
          <Input type="Number" value={form.estimatedPrice} onInput={e => set('estimatedPrice', e.target.value)} placeholder="0.00" />
        </FormItem>
        <FormItem label={<Label>Notes</Label>}>
          <Input value={form.notes} onInput={e => set('notes', e.target.value)} />
        </FormItem>
      </Form>
    </Dialog>
  )
}
