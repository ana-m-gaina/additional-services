export default function PdfViewer({ panel }) {
  const { docId, pageNumber, filename } = panel
  const url = `http://localhost:8000/api/rr/document/${docId}/file#page=${pageNumber}&toolbar=0&navpanes=0&scrollbar=0`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ fontSize: '0.75rem', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {filename} — p.{pageNumber}
      </div>
      <embed
        src={url}
        type="application/pdf"
        style={{ width: '100%', height: '520px', borderRadius: 6, border: '1px solid #e0e0e0' }}
      />
    </div>
  )
}
