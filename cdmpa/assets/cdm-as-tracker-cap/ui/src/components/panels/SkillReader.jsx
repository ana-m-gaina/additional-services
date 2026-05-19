import { useState } from 'react'
import { savePersonalTemplate } from '../../api.js'

const SEVERITY_COLOR = { high: '#b00020', medium: '#e67e00', low: '#0064a0' }
const SEVERITY_BG    = { high: '#fdf0f0', medium: '#fff8f0', low: '#f0f5ff' }

export default function SkillReader({ panel }) {
  const cfg = panel?.config || {}
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [saveError, setSaveError] = useState(null)

  async function handleSave() {
    const key     = cfg.title || 'Imported Skill'
    const content = cfg.rawText || ''
    if (!content) return
    setSaving(true)
    setSaveError(null)
    try {
      await savePersonalTemplate(key, key, content)
      setSaved(true)
    } catch (e) {
      setSaveError(e.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="skill-reader-panel">
      <div className="skill-reader-panel-header">
        <div>
          <div className="skill-reader-panel-title">{cfg.title || 'Skill Analysis'}</div>
          {cfg.summary && <div className="skill-reader-panel-summary">{cfg.summary}</div>}
        </div>
        <div className="skill-reader-panel-actions">
          {saveError && <span className="skill-reader-panel-error">{saveError}</span>}
          {saved
            ? <span className="skill-reader-panel-saved">Saved to Prompts</span>
            : (
              <button
                className="skill-reader-panel-save-btn"
                onClick={handleSave}
                disabled={saving || !cfg.rawText}
              >
                {saving ? 'Saving…' : 'Save as Prompt'}
              </button>
            )
          }
        </div>
      </div>

      <div className="skill-reader-panel-io-grid">
        <div className="skill-reader-panel-io-col">
          <div className="skill-reader-panel-section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            Inputs
          </div>
          {(cfg.inputs || []).length === 0
            ? <div className="skill-reader-panel-empty">None specified</div>
            : (cfg.inputs || []).map((inp, i) => (
              <div key={i} className="skill-reader-panel-io-row">
                <span className="skill-reader-panel-io-name">{inp.name}</span>
                <span className="skill-reader-panel-io-desc">{inp.description}</span>
              </div>
            ))
          }
        </div>
        <div className="skill-reader-panel-io-col">
          <div className="skill-reader-panel-section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Outputs
          </div>
          {(cfg.outputs || []).length === 0
            ? <div className="skill-reader-panel-empty">None specified</div>
            : (cfg.outputs || []).map((out, i) => (
              <div key={i} className="skill-reader-panel-io-row">
                <span className="skill-reader-panel-io-name">{out.name}</span>
                <span className="skill-reader-panel-io-desc">{out.description}</span>
              </div>
            ))
          }
        </div>
      </div>

      {(cfg.gotchas || []).length > 0 && (
        <div className="skill-reader-panel-gotchas-section">
          <div className="skill-reader-panel-section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Risks &amp; Gotchas
          </div>
          {cfg.gotchas.map((g, i) => (
            <div
              key={i}
              className="skill-reader-panel-gotcha"
              style={{ background: SEVERITY_BG[g.severity] || '#f7f8f9', borderLeft: `3px solid ${SEVERITY_COLOR[g.severity] || '#888'}` }}
            >
              <span className="skill-reader-panel-gotcha-badge" style={{ color: SEVERITY_COLOR[g.severity] || '#888' }}>
                {g.severity?.toUpperCase()}
              </span>
              <span className="skill-reader-panel-gotcha-text">{g.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
