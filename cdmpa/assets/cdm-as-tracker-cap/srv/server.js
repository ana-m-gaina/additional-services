'use strict'

const cds = require('@sap/cds')

// Express middleware: proxy POST /api/chat to the Python agent service.
// All other routes handled by CAP as normal.
cds.on('bootstrap', app => {
  app.use('/health', (_req, res) => res.json({ status: 'ok' }))
})
