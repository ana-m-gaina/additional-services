'use strict'

const cds = require('@sap/cds')
const http = require('http')

cds.on('bootstrap', app => {
  app.use('/health', (_req, res) => res.json({ status: 'ok' }))

  // Mock SAP approuter user-api for local development
  app.get('/user-api/currentUser', (_req, res) => {
    res.json({ firstname: 'Ana', lastname: 'Gaina', email: 'ana.gaina@sap.com', name: 'ana.gaina@sap.com' })
  })

  // Proxy /api to Python agent on port 8000
  app.use('/api', (req, res) => {
    const options = {
      hostname: 'localhost',
      port: 8000,
      path: req.url === '/' ? '/api' : '/api' + req.url,
      method: req.method,
      headers: { ...req.headers, host: 'localhost:8000' },
    }
    const proxy = http.request(options, upstream => {
      res.writeHead(upstream.statusCode, upstream.headers)
      upstream.pipe(res)
    })
    proxy.on('error', () => res.status(502).json({ error: 'Agent unavailable' }))
    req.pipe(proxy)
  })
})
