import { useState, useEffect } from 'react'
import { getPersonalTemplates, savePersonalTemplate, deletePersonalTemplate } from '../api.js'

export default function PromptsView() {
  const [prompts, setPrompts]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editKey, setEditKey]     = useState('')
  const [editOriginalKey, setEditOriginalKey] = useState('')
  const [editContent, setEditContent] = useState('')
  const [adding, setAdding]       = useState(false)
  const [newKey, setNewKey]       = useState('')
  const [newContent, setNewContent] = useState('')
  const [copiedId, setCopiedId]   = useState(null)

  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

  function load() {
    setLoading(true)
    getPersonalTemplates().then(setPrompts).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  function startEdit(p) {
    setEditingId(p.ID)
    setEditKey(p.templateKey || '')
    setEditOriginalKey(p.templateKey || '')
    setEditContent(p.content || '')
    setSaveError(null)
  }

  async function saveEdit() {
    setSaving(true)
    setSaveError(null)
    try {
      if (editKey !== editOriginalKey) {
        await deletePersonalTemplate(editingId).catch(() => {})
      }
      await savePersonalTemplate(editKey, editKey, editContent)
      setEditingId(null)
      load()
    } catch (e) {
      setSaveError('Save failed — ' + (e.message || 'unknown error'))
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    await deletePersonalTemplate(id).catch(() => {})
    setPrompts(p => p.filter(x => x.ID !== id))
  }

  async function handleAdd() {
    if (!newKey.trim() || !newContent.trim()) return
    await savePersonalTemplate(newKey.trim(), newKey.trim(), newContent.trim())
    setAdding(false)
    setNewKey('')
    setNewContent('')
    load()
  }

  function copyPrompt(p) {
    const text = p.content
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text))
    } else {
      fallbackCopy(text)
    }
    setCopiedId(p.ID)
    setTimeout(() => setCopiedId(null), 1500)
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px'
    document.body.appendChild(ta)
    ta.focus(); ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }

  function handleImportSkill() {
    document.dispatchEvent(new CustomEvent('cdm:fire-prompt', {
      detail: { content: '__skill_import_start__' }
    }))
  }

  return (
    <div className="prompts-view">
      <div className="prompts-header">
        <h2 className="prompts-title">Prompts</h2>
        <div className="prompts-header-actions">
          <button className="prompts-import-btn" onClick={handleImportSkill}>Import Skill</button>
          <button className="prompts-add-btn" onClick={() => setAdding(true)}>+ Add</button>
        </div>
      </div>

      {loading && <div className="prompts-empty">Loading…</div>}
      {!loading && prompts.length === 0 && !adding && (
        <div className="prompts-empty">No prompts yet. Add one to get started.</div>
      )}

      <div className="prompts-list">
        {prompts.map(p => (
          <div key={p.ID} className="prompt-card">
            {editingId === p.ID ? (
              <>
                <input
                  className="prompt-edit-key"
                  value={editKey}
                  onChange={e => setEditKey(e.target.value)}
                  placeholder="Name"
                />
                <textarea
                  className="prompt-edit-content"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={4}
                />
                <div className="prompt-card-actions">
                  {saveError && <span className="prompt-save-error">{saveError}</span>}
                  <button className="prompt-btn-save" onClick={saveEdit} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                  <button className="prompt-btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="prompt-card-name">{p.templateKey || p.description}</div>
                <div className="prompt-card-content">{p.content}</div>
                <div className="prompt-card-actions">
                  <button className="prompt-btn-copy" onClick={() => copyPrompt(p)}>
                    {copiedId === p.ID ? '✓ Copied' : 'Copy'}
                  </button>
                  <button className="prompt-btn-edit" onClick={() => startEdit(p)}>Edit</button>
                  <button className="prompt-btn-delete" onClick={() => handleDelete(p.ID)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}

        {adding && (
          <div className="prompt-card prompt-card-new">
            <input
              className="prompt-edit-key"
              value={newKey}
              onChange={e => setNewKey(e.target.value)}
              placeholder="Name"
              autoFocus
            />
            <textarea
              className="prompt-edit-content"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="Prompt text…"
              rows={4}
            />
            <div className="prompt-card-actions">
              <button className="prompt-btn-save" onClick={handleAdd}>Add</button>
              <button className="prompt-btn-cancel" onClick={() => { setAdding(false); setNewKey(''); setNewContent('') }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
