import { useState, useEffect } from 'react'
import { getPersonaLayout } from '../api.js'
import PanelRenderer from './PanelRenderer.jsx'

export default function PersonaShell({ cdmEmail }) {
  const [panels, setPanels]       = useState([])
  const [pdfPanel, setPdfPanel]   = useState(null)

  useEffect(() => {
    getPersonaLayout().then(row => {
      if (row?.layoutJson) {
        try { setPanels(JSON.parse(row.layoutJson).panels || []) } catch { /* ignore */ }
      }
    }).catch(() => {})

    const handler = () => getPersonaLayout().then(row => {
      if (row?.layoutJson) {
        try { setPanels(JSON.parse(row.layoutJson).panels || []) } catch { /* ignore */ }
      }
    })
    document.addEventListener('cdm:layout-updated', handler)
    return () => document.removeEventListener('cdm:layout-updated', handler)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      const { docId, pageNumber, filename } = e.detail
      setPdfPanel({ id: `pdf-${docId}-${pageNumber}`, type: 'pdf-viewer', title: filename, docId, pageNumber, filename })
    }
    document.addEventListener('cdm:open-pdf', handler)
    return () => document.removeEventListener('cdm:open-pdf', handler)
  }, [])

  const sorted    = [...panels].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
  const allPanels = pdfPanel ? [pdfPanel, ...sorted] : sorted

  return (
    <div style={{ padding: '1.5rem', height: '100%', boxSizing: 'border-box' }}>
      {allPanels.length === 0 ? (
        <div style={{ color: '#666', fontSize: '0.9rem', padding: '2rem' }}>
          No panels pinned yet. Switch to Chat and ask your assistant to set up your workspace.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>
          {allPanels.map((p, i) => (
            <div key={p.id || i} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.1)', padding: '1rem', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                {p.type === 'pdf-viewer' && (
                  <button
                    onClick={() => setPdfPanel(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '1.1rem', lineHeight: 1, padding: '0 2px', flexShrink: 0 }}
                    title="Close"
                  >×</button>
                )}
              </div>
              <PanelRenderer panel={p} cdmEmail={cdmEmail} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
