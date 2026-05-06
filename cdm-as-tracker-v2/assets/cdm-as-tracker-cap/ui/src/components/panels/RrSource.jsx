import { useState } from 'react'

const CONFIDENCE_COLOR = { HIGH: '#0f7a0f', MEDIUM: '#e67e00', LOW: '#b00020' }

export default function RrSource({ panel }) {
  const sources    = panel.sources || []
  const matches    = panel.matches || []
  const confidence = panel.confidence || 'LOW'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {panel.summary && (
        <div style={{ lineHeight: 1.6, fontSize: '0.9rem' }}>{panel.summary}</div>
      )}

      {matches.length > 0 && (
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Matched service codes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {matches.map((m, i) => {
              const src    = sources[i] || sources[0]
              const hasPdf = !!src?.docId

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (!hasPdf) return
                    document.dispatchEvent(new CustomEvent('cdm:open-pdf', {
                      detail: { docId: src.docId, pageNumber: src.pageNumber, filename: src.filename }
                    }))
                  }}
                  style={{
                    background: '#f0f4ff', border: '1px solid #d0daf5', borderRadius: 8,
                    padding: '0.65rem 0.875rem', cursor: hasPdf ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => { if (hasPdf) e.currentTarget.style.background = '#e4ecff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f0f4ff' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: m.note ? '0.35rem' : 0 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0064d9', fontFamily: 'monospace' }}>
                      {m.code}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#333', flex: 1 }}>{m.name}</span>
                    {m.chargeable && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.15rem 0.55rem', borderRadius: 12, background: '#e67e00', color: '#fff' }}>
                        Chargeable
                      </span>
                    )}
                    {!m.chargeable && m.responsibility && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.15rem 0.55rem', borderRadius: 12, background: '#275e76', color: '#fff' }}>
                        {m.responsibility === 'SAP' ? 'Standard' : m.responsibility}
                      </span>
                    )}
                    {hasPdf && (
                      <span style={{ fontSize: '0.7rem', color: '#888' }}>p.{src.pageNumber} ↗</span>
                    )}
                  </div>
                  {m.note && (
                    <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.25rem' }}>{m.note}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {matches.length === 0 && (
        <div style={{ color: '#888', fontSize: '0.85rem', fontStyle: 'italic' }}>
          No specific service codes found in the R&R documents for this query.
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
        <span style={{ color: '#666' }}>Confidence:</span>
        <span style={{ fontWeight: 700, color: CONFIDENCE_COLOR[confidence] || '#333' }}>{confidence}</span>
      </div>

    </div>
  )
}
