---
name: n8n-workflow
description: Writes or edits n8n workflow JSON files (.n8n.json). Only invoke this skill during spec or code generation (called from specification skill). Never invoke on its own.
---

# n8n Workflow Skill

## Key Constraints

- **NEVER** answer with the n8n URL in the message

## References

- [workflows-hooks.md](./references/workflows-hooks.md): ONLY read this file when the user is creating a **pre-hook or post-hook** workflow for an **agent extension** scenario. It contains the A2A message protocol, hook-specific response patterns, and examples. Do NOT read it for regular (non-hook) workflows.

## Steps

### **Set up project folder**
If a ``assets/n8n/workflows/`` folder already exists, use it. Otherwise create it by executing:
   ```bash
   mkdir -p assets/n8n/workflows/
   ```

### **MANDATORY: Setup the Solution**
If not already run, run the `setup-solution` skill. The final asset.yaml must look like the one provided in `assets/n8n/asset.yaml`.

### **MANDATORY: Look up nodes from the catalog (MUST do this for EVERY node)**
Before writing ANY node in the workflow JSON, you MUST look up its exact `type` and `typeVersion` from the catalog. Call the `search-nodes-catalog` MCP tool for all nodes you need:
   - Pass all needed node keywords in a single call (e.g. `webhook`, `http request`, `if`, `schedule`, `slack`, `task center`). The tool searches by displayName, name, and description.
   - Use the returned `name` as `type` and `version` as `typeVersion` in the workflow JSON.
   - NEVER guess node type names or typeVersion — only use values returned by the tool.
   - Custom/SAP nodes (e.g. `CUSTOM.approvalTask`) include full `properties` in the output to help you configure them correctly.
   - If the workflow involves **tasks** (approvals, task assignments, task status updates), search for `"task center"` to find the **SAP Task Center** node. Do not try to use Task Center APIs directly. Always use the dedicated SAP Task Center node.
   - If the `search-nodes-catalog` tool is unavailable or returns no results for SAP Task Center, as a fallback check the properties instructions and example JSON below.
   - If the workflow involves **LLM calls**, search for `"sap ai core"` to find the **SAP AI Core** nodes . Always use these dedicated SAP AI Core nodes
   - If the workflow involes **LLM** Information Extractor, Text Summarizer, ... nodes, search for `"sap ai core"` to find the dedicated model **SAP AI Core Model Chat**
   - Never call LLM endpoints via a generic HTTP Request node, and never use third-party nodes such as OpenAI or Gemini, only SAP ones.
   - If the workflow involves **Calling an AI Agent** prioritarily search for `"SAP Agent"` to find the dedicated SAP Agent node to use. If a corresponding Agent to call with this node is not found in the catalog, as a fallback search for `"AI Agent"` to find the generic AI Agent node and associate to it the SAP AI Core Model Chat.

### **MANDATORY: Create the file to the filesystem**
Write workflow files to `assets/{{asset-name}}/n8n/workflows/`. The file **MUST** use the `.n8n.json` extension (e.g. `my-workflow.n8n.json`). NEVER use MCP to create or update workflows.

Every workflow JSON **MUST** include a `"description"` field at the top level that accurately summarises what the workflow does. When editing an existing workflow, update the `"description"` to reflect any changes made.

### **MANDATORY: Resolve credentials before writing the workflow**
Any node that requires authentication (HTTP Request, SAP AI Core, SAP Task Center, etc.) needs a `credentials` field with a real credential `id` and `name` from the n8n instance. **Never leave credential fields as empty strings, placeholders, or omit them — always resolve them first.**

1. Call the `get-credentials` MCP tool with only `global: true` — do **not** pass `type` or `name` filters. Fetching all global credentials at once gives you the full picture and makes it easier to match each credential to the nodes that need it.
2. From the returned list, match each node to the credential whose `type` corresponds to that node's expected credential type. If no match exists, do **not** fall back to non-global ones — inform the user that a global credential of the required type must be created first.
3. In the workflow JSON, set the node's `credentials` field using the returned `id` and `name`:

```json
"credentials": {
  "<credentialType>": {
    "id": "<id from get-credentials>",
    "name": "<name from get-credentials>"
  }
}
```

**Example** — assigning an SAP AI Core credential to a node:
```json
"credentials": {
  "sapAiCoreApi": {
    "id": "aB3xY9z",
    "name": "SAP AI Core (Global)"
  }
}
```

If `get-credentials` returns no results, **omit the `credentials` field entirely** and inform the user that a global credential of the required type must be created in the n8n UI. Never guess, invent, or reuse a credential from a different node or example — an absent credential is always preferable to an invalid one.

### **Validate the workflow**
After writing the workflow file, use the `validate-n8n-workflow` MCP tool to validate the workflow content. If validation returns errors, use the message to fix the workflow. Some errors are expected and cannot be fixed by the agent — for example, credentials with `"id": "MISSING"`. In those cases, inform the user and leave the credential configuration to be done manually in the n8n UI.

### **Delete workflows**
Use the n8n MCP tool only for deletion from the remote n8n instance.

## CRITICAL: Node parameter rules

- **ONLY use parameters exactly as shown in the example below**. NEVER invent or add extra parameters.
- **Webhook `path` MUST be `{workflow-slug}-{webhookId}`** (e.g. workflow `"Travel Expense Approval"` + webhookId `"e57d9e77-..."` → path `"travel-expense-e57d9e77-..."`). Never use a plain human-readable string. Never reuse UUIDs from examples — always generate a fresh UUID v4 for each webhook.
- **SAP Task Center requires a switch node for branching**: SAP Task Center is a task node — it pauses execution until a person acts, then resumes with a single output containing the decision in `$json.result.response`. Because it has only **one output**, you MUST always place a switch node (`n8n-nodes-base.switch`) immediately after it to branch on the decision value. Configure the switch with `rules.values` containing one condition per possible response (e.g., `$json.result.response` equals `"approved"`, equals `"rejected"`). Use `renameOutput: true` and `outputKey` to label each branch. See the example below.
- **SAP Task Center mandatory parameters**: `subject` (task title), `priority` (e.g. `"VERY_HIGH"`, `"HIGH"`, `"MEDIUM"`, `"LOW"`), `recipients.recipientValues` (array of `{ userId }` objects), `taskDefinition.definitionName` (name of the task definition).
- **SAP Task Center optional parameters**: `description` (task details), `dueDate` (ISO 8601 datetime), `recipientGroups.recipientGroupValues` (array of `{ groupId }` objects).
- **SAP Task Center task recipient value**: If an user's email (ID) isn't specified DO NOT generate a random email! You should ask the user to specify who will be the task recipient and ask for their email.

## Example: Travel Expense Approval with SAP Task Center

```json
{
  "name": "Travel Expense Approval",
  "description": "Handles travel expense approval requests. Automatically approves expenses below 50 EUR; routes higher amounts to a manager via SAP Task Center for manual approval or rejection. Responds to the requester with the final decision.",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "travel-expense-approval-e57d9e77-30a3-4b7f-bad5-1e3288f68617",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "f87b684f-c68e-4019-b22e-53a8b75d6cf4",
      "name": "Expense Submitted",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2.1,
      "position": [-416, -48],
      "webhookId": "e57d9e77-30a3-4b7f-bad5-1e3288f68617"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict"
          },
          "conditions": [
            {
              "id": "condition1",
              "leftValue": "={{ $json.body.amount }}",
              "rightValue": 50,
              "operator": {
                "type": "number",
                "operation": "lt"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "1ef04aff-4ebe-45e1-9ebc-05874cb79392",
      "name": "Amount Below 50 EUR?",
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.3,
      "position": [-176, -48]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            { "id": "field1", "name": "status", "value": "approved", "type": "string" },
            { "id": "field2", "name": "message", "value": "=Expense of {{ $('Expense Submitted').item.json.body.amount }} EUR auto-approved (below 50 EUR threshold).", "type": "string" },
            { "id": "field3", "name": "expenseId", "value": "={{ $('Expense Submitted').item.json.body.expenseId }}", "type": "string" }
          ]
        },
        "options": {}
      },
      "id": "4ceabcf2-ae77-4179-a5a0-7d86e38ea32a",
      "name": "Set Auto-Approved",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [416, -192]
    },
    {
      "parameters": {
        "subject": "=Approve Travel Expense for {{ $('Expense Submitted').item.json.body.employeeName }}",
        "priority": "VERY_HIGH",
        "description": "=Travel expense of {{ $('Expense Submitted').item.json.body.amount }} EUR submitted for approval.",
        "dueDate": "2026-04-30T00:00:00",
        "recipients": {
          "recipientValues": [
            {
              "userId": "manager@company.com"
            }
          ]
        },
        "taskDefinition": {
          "definitionName": "Travel Expense Approval"
        }
      },
      "type": "CUSTOM.sapTaskCenter",
      "typeVersion": 1,
      "position": [192, 48],
      "id": "29656fda-7d54-4279-8362-c034b6085a3c",
      "name": "SAP Task Center",
      "webhookId": "515abf90-3602-472a-96e6-4163feeba231"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict"
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.result.response }}",
                    "rightValue": "approved",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "Approved"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict"
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.result.response }}",
                    "rightValue": "rejected",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "Rejected"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.4,
      "position": [416, 48],
      "id": "8c69ea2e-e2a8-4dcb-92d3-28a3b9af0a68",
      "name": "Approval Decision"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            { "id": "field1", "name": "status", "value": "approved", "type": "string" },
            { "id": "field2", "name": "message", "value": "=Expense of {{ $('Expense Submitted').item.json.body.amount }} EUR approved by manager.", "type": "string" },
            { "id": "field3", "name": "expenseId", "value": "={{ $('Expense Submitted').item.json.body.expenseId }}", "type": "string" }
          ]
        },
        "options": {}
      },
      "id": "60bc7ca5-3c6c-4440-b64b-55677c90a05a",
      "name": "Set Manager Approved",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [688, -32]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            { "id": "field1", "name": "status", "value": "rejected", "type": "string" },
            { "id": "field2", "name": "message", "value": "=Expense of {{ $('Expense Submitted').item.json.body.amount }} EUR rejected by manager.", "type": "string" },
            { "id": "field3", "name": "expenseId", "value": "={{ $('Expense Submitted').item.json.body.expenseId }}", "type": "string" }
          ]
        },
        "options": {}
      },
      "id": "39f2460c-6635-41a0-8015-9c8dc072e01e",
      "name": "Set Manager Rejected",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [688, 144]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ JSON.stringify({ expenseId: $json.expenseId, status: $json.status, message: $json.message }) }}",
        "options": {
          "responseCode": 200
        }
      },
      "id": "e92a8cbd-de06-42ff-a44b-e461b766f6e2",
      "name": "Respond to Requester",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.5,
      "position": [1040, -128]
    }
  ],
  "connections": {
    "Expense Submitted": {
      "main": [[{ "node": "Amount Below 50 EUR?", "type": "main", "index": 0 }]]
    },
    "Amount Below 50 EUR?": {
      "main": [
        [{ "node": "Set Auto-Approved", "type": "main", "index": 0 }],
        [{ "node": "SAP Task Center", "type": "main", "index": 0 }]
      ]
    },
    "SAP Task Center": {
      "main": [
        [{ "node": "Approval Decision", "type": "main", "index": 0 }]
      ]
    },
    "Approval Decision": {
      "main": [
        [{ "node": "Set Manager Approved", "type": "main", "index": 0 }],
        [{ "node": "Set Manager Rejected", "type": "main", "index": 0 }]
      ]
    },
    "Set Auto-Approved": {
      "main": [[{ "node": "Respond to Requester", "type": "main", "index": 0 }]]
    },
    "Set Manager Approved": {
      "main": [[{ "node": "Respond to Requester", "type": "main", "index": 0 }]]
    },
    "Set Manager Rejected": {
      "main": [[{ "node": "Respond to Requester", "type": "main", "index": 0 }]]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true
  }
}
```
