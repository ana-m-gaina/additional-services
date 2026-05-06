import { useState } from 'react'
import { Table, TableHeaderRow, TableHeaderCell, TableRow, TableCell, Text } from '@ui5/webcomponents-react'
import RequestDetailDrawer from '../RequestDetailDrawer.jsx'

export default function RecordTable({ panel }) {
  const [selected, setSelected] = useState(null)
  const rows = panel.data || []

  return (
    <>
      <div>
        {panel.title && <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{panel.title}</div>}
        <Table
          header={
            <TableHeaderRow>
              <TableHeaderCell><Text>Customer</Text></TableHeaderCell>
              <TableHeaderCell><Text>Service</Text></TableHeaderCell>
              <TableHeaderCell><Text>SID</Text></TableHeaderCell>
              <TableHeaderCell><Text>Status</Text></TableHeaderCell>
              <TableHeaderCell><Text>Price</Text></TableHeaderCell>
              <TableHeaderCell><Text>R&amp;R</Text></TableHeaderCell>
            </TableHeaderRow>
          }
        >
          {rows.map(r => (
            <TableRow key={r.ID} onClick={() => setSelected(r)} style={{ cursor: 'pointer' }}>
              <TableCell><Text>{r.customerName || r.customerId}</Text></TableCell>
              <TableCell><Text>{r.requestedService}</Text></TableCell>
              <TableCell><Text>{r.sid || '—'}</Text></TableCell>
              <TableCell>
                <span className={`status-badge status-${r.status}`}>{r.status}</span>
              </TableCell>
              <TableCell><Text>{r.currency} {r.estimatedPrice ?? '—'}</Text></TableCell>
              <TableCell><Text>{r.rrCode || '—'}</Text></TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
      {selected && <RequestDetailDrawer request={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
