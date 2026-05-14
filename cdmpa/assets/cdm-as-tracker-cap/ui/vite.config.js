import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local mock for SAP approuter user-api (replaced by real approuter on BTP)
function userApiMock() {
  return {
    name: 'user-api-mock',
    configureServer(server) {
      server.middlewares.use('/user-api/currentUser', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          firstname: 'Ana',
          lastname:  'Gaina',
          email:     'ana.gaina@sap.com',
          name:      'ana.gaina@sap.com',
        }))
      })
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), userApiMock()],
  server: {
    proxy: {
      '/CDMService':   'http://localhost:4004',
      '/AdminService': 'http://localhost:4004',
      '/api':          'http://localhost:8000',
    },
  },
  build: { outDir: '../app/webapp', emptyOutDir: true },
})
