# How To — CDM AS Tracker Dev Guide

## Startup Checklist

1. **Start HyperAI** — run the HyperAI proxy (routes Claude calls through localhost:6655)
2. **Open VS Code**
3. **Open terminal** — `Ctrl+Shift+~`
4. **Go into cdmpa and run app through Playwright**
   ```bash
   cd cdmpa
   # start CAP backend
   cd assets/cdm-as-tracker-cap && npm start
   # start agent (separate terminal)
   cd assets/cdm-as-tracker-agent && npm start
   # run Playwright UI tests
   npx playwright test --ui
   ```
5. **Verify services are running:**
   - Backend: http://localhost:4004/CDMService
   - Agent: check agent terminal for listening port

## If Something Breaks

- **Undo last change:** `git revert HEAD` or `git checkout -- <file>`
- **Check what changed:** `git diff HEAD`
- **Ask Claude:** "Cum am facut X?" — go back in conversation history

## Credentials

| Service | Username | Password |
|---------|----------|----------|
| JoulePro / Profile Management | — | `Programezcuai2026#$` |
| CAP dev user | `ana` | `ana` |
| — | — | `Programez2026` |

## SideQuest — DED Page Scanner

### What it does
Go to `DED_LINK` (in `.env`), scrape all information from the **PanelOverview** tab, compare it to the local DB, and add any missing columns/entities.

### DED_LINK
```
https://statushec.hana.ondemand.com/ded/index.jsp#/landscape/62917/?tab=ContractDetails
```

### What was done
- Pulled DED data for **Allianz**
- The **Contracts** document can hold ALL contracts (not just one)

### Full import procedure (done once for Allianz, repeat for other customers)

1. **Open DED in Playwright** — navigate to `DED_LINK`, log in with SAP SSO + TOTP
2. **Go to Supplementary Services tab**
3. **Extract all rows from UI5 model** (virtual scroll — extract via `sap.ui.getCore().byId('AS_Table')` binding, not DOM):
   ```js
   const ui5Table = sap.ui.getCore().byId('AS_Table');
   const binding = ui5Table.getBinding('rows');
   const model = binding.getModel();
   const rows = [];
   for (let i = 0; i < binding.getLength(); i++) {
     const ctx = binding.getContexts(i, 1)[0];
     if (ctx) rows.push(model.getObject(ctx.getPath()));
   }
   ```
4. **Compare DED columns vs `cdm_tracker_ASRequest`** — add missing columns to `db/schema.cds` first, then `ALTER TABLE` in SQLite
5. **After schema change** — recreate the `CDMService_ASRequest` view (CAP generates it, but it won't auto-update):
   ```js
   // In better-sqlite3 script:
   const tableCols = db.prepare("PRAGMA table_info('cdm_tracker_ASRequest')").all().map(c => c.name);
   db.prepare('DROP VIEW IF EXISTS "CDMService_ASRequest"').run();
   const colList = tableCols.map(c => `"${c}"`).join(', ');
   db.prepare(`CREATE VIEW "CDMService_ASRequest" AS SELECT ${colList} FROM "cdm_tracker_ASRequest"`).run();
   ```
6. **Rebuild UI** — `cd ui && node ../node_modules/vite/bin/vite.js build`
7. **Add the new columns to `ClientDetailView.jsx`** table headers + row cells

### DataCenter code → label mapping
| Code | Label |
|------|-------|
| `310` | Azure: EU West Europe (Amsterdam) |
| `318` | Azure: EU North Europe (Dublin) |

### How to trigger
Ask Claude:
> "Go to DED_LINK, take all the information from PanelOverview, compare it to the local DB and add the missing columns/entities"

## DED Data Access — How to Get Data Into Beacon

### Why you can't query DED's database directly
DED reads from a **SAP Business One (B1)** ERP backend that is:
- On a private SAP internal network (IP `10.96.168.22`) — not reachable from your laptop
- Accessed only via RDP to a Windows Terminal Server (thick client, not HTTP)
- No JDBC/ODBC/REST connection available externally

The DED web app (`statushec.hana.ondemand.com`) is the only sanctioned API surface over that data, and it is protected by SAP SSO — no API keys, no OAuth client credentials, no service user flow.

### The only viable option: Browser Bookmarklet

Since the DED XSJS API (`GetLandscapeById.xsjs`) requires an SSO session cookie, the cleanest approach is a **bookmarklet** — a snippet of JS you click while already logged into DED in your browser. It runs on the DED domain, so the browser sends the SSO cookie automatically, fetches the data, and POSTs it to your local Beacon app.

**Bookmarklet code** (drag to browser toolbar):
```javascript
javascript:(async()=>{
  const oppId = prompt('Opportunity ID?', '62917');
  const res = await fetch(`/ded/proxy/b1xsjs/GetLandscapeById.xsjs?UserCode=I759703&OpportunityId=${oppId}`);
  const data = await res.json();
  await fetch('http://localhost:4004/CDMService/importDEDLandscape', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  alert('Done! Landscape data imported into Beacon.');
})();
```

**How to use:**
1. Open DED in your browser (log in via SAP SSO as normal)
2. Click the bookmarklet in your toolbar
3. Enter the Opportunity ID when prompted
4. Beacon's local SQLite is updated — refresh the right panel

### Manual fallback (already done for Allianz)
If the bookmarklet isn't set up yet, you can:
1. Open the DED API URL directly in your browser while logged in:
   `https://statushec.hana.ondemand.com/ded/proxy/b1xsjs/GetLandscapeById.xsjs?UserCode=I759703&OpportunityId=62917`
2. Save the JSON as `landscape-data.json` in the repo root
3. Run: `cd CDMPA/assets/cdm-as-tracker-cap && node landscape-import.js`

### DED Landscape API
```
GET https://statushec.hana.ondemand.com/ded/proxy/b1xsjs/GetLandscapeById.xsjs
  ?UserCode=I759703
  &OpportunityId={opportunityId}
```
Returns: `{ GetLandscapeById: { OpportunityId, Name, BPName, Phases[], WeeklyStatus[], TopIssues[], LandscapeStructure[], ... } }`

## Key Files

| File | Purpose |
|------|---------|
| `cdmpa/assets/cdm-as-tracker-agent/.env` | All env vars — HAI keys, CAP URL, DED_LINK, VOYAGE key |
| `cdmpa/assets/cdm-as-tracker-cap/db/schema.cds` | Data model / entities |

## If You Forget What to Do

Go back in Claude conversation history and ask:
> "Cum am facut X?" or "What did we do last session?"
