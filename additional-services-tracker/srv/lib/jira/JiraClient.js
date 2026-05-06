'use strict'

const https = require('https')
const http = require('http')

class JiraClient {
  constructor() {
    const base = process.env.JIRA_BASE_URL
    const pat  = process.env.JIRA_PAT

    if (!base || !pat) {
      throw new Error('JIRA_BASE_URL and JIRA_PAT must be set in environment')
    }

    this._base    = base.replace(/\/$/, '')
    this._headers = {
      'Authorization': `Bearer ${pat}`,
      'Content-Type':  'application/json',
      'Accept':        'application/json'
    }
  }

  // ── Create an issue, returns { key, id, url } ────────────────────────────

  async createIssue({ projectKey, summary, description, issueType = 'Task' }) {
    const body = JSON.stringify({
      fields: {
        project:     { key: projectKey || process.env.JIRA_PROJECT_KEY },
        summary,
        description,
        issuetype:   { name: issueType }
      }
    })

    const data = await this._request('POST', '/rest/api/2/issue', body)
    return {
      key: data.key,
      id:  data.id,
      url: `${this._base}/browse/${data.key}`
    }
  }

  // ── Get issue status, returns { key, status, summary } ──────────────────

  async getIssue(issueKey) {
    const data = await this._request('GET', `/rest/api/2/issue/${issueKey}?fields=summary,status`)
    return {
      key:     data.key,
      summary: data.fields.summary,
      status:  data.fields.status.name
    }
  }

  // ── Internal HTTP helper ─────────────────────────────────────────────────

  _request(method, path, body) {
    return new Promise((resolve, reject) => {
      const url      = new URL(this._base + path)
      const useHttps = url.protocol === 'https:'
      const lib      = useHttps ? https : http

      const options = {
        hostname: url.hostname,
        port:     url.port || (useHttps ? 443 : 80),
        path:     url.pathname + url.search,
        method,
        headers:  { ...this._headers }
      }

      if (body) options.headers['Content-Length'] = Buffer.byteLength(body)

      const req = lib.request(options, res => {
        let raw = ''
        res.on('data', chunk => { raw += chunk })
        res.on('end', () => {
          if (res.statusCode >= 400) {
            return reject(new Error(`JIRA ${method} ${path} → ${res.statusCode}: ${raw}`))
          }
          try {
            resolve(raw ? JSON.parse(raw) : {})
          } catch {
            reject(new Error(`JIRA response not JSON: ${raw}`))
          }
        })
      })

      req.on('error', reject)
      if (body) req.write(body)
      req.end()
    })
  }
}

module.exports = { JiraClient }
