export default function KpiStrip({ panel }) {
  const kpis = panel.kpis || []

  const colorMap = {
    success: '#0a6640',
    warning: '#e76500',
    error:   '#c00',
    info:    '#0070f3',
  }

  return (
    <div>
      {panel.title && <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{panel.title}</div>}
      <div className="kpi-strip">
        {kpis.map((k, i) => (
          <div key={i} className="kpi-tile">
            <div
              className="kpi-value"
              style={{ color: colorMap[k.semantic] || '#333' }}
            >
              {k.value}
            </div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
