const TICKET_SYSTEMS = [
  { key: 'sap4MeId',      label: 'SAP4Me',      urlFn: id => `https://itsm.services.sap.com/sp?id=ticket&table=sn_customerservice_case&sys_id=${id}` },
  { key: 'spcId',         label: 'SPC',         urlFn: id => `https://spc.ondemand.com/ticket/${id}` },
  { key: 'btpTicketId',   label: 'BTP Support', urlFn: id => `https://launchpad.support.sap.com/#incident/${id}` },
  { key: 'amsTicketId',   label: 'AMS',         urlFn: id => `https://ams.sap.com/ticket/${id}` },
  { key: 'o2iTicketNo',   label: 'O2I',         urlFn: null },
  { key: 'serviceNowId',  label: 'ServiceNow',  urlFn: null },
]

export default function TicketRef({ panel }) {
  const r = panel.data || {}
  const refs = TICKET_SYSTEMS.filter(t => r[t.key])

  return (
    <div>
      {panel.title && <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{panel.title}</div>}
      {refs.length === 0 ? (
        <div style={{ color: '#666', fontSize: '0.85rem' }}>No external tickets linked.</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {refs.map(t => (
            <div key={t.key} style={{ background: '#f5f5f5', borderRadius: 6, padding: '0.5rem 0.875rem', fontSize: '0.875rem' }}>
              <span style={{ color: '#666', marginRight: '0.4rem' }}>{t.label}:</span>
              {t.urlFn ? (
                <a href={t.urlFn(r[t.key])} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', fontWeight: 500 }}>
                  {r[t.key]}
                </a>
              ) : (
                <strong>{r[t.key]}</strong>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
