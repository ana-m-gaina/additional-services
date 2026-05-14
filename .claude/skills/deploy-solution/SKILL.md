---
name: deploy-solution
description: Deploys the solution. Requires solution.yaml per skill `setup-solution`.
---

# Deploy Solution

This skill deploys the solution using either the `joulework-cli` tool or the `deploy_solution` tool. It assumes that the solution has already been set up with the `setup-solution` skill, and that the current working directory is the root of the solution (the directory containing `solution.yaml`).

**CRITICAL: Use tools (`deploy_solution`, `get_deployment_job`, `get_deployment_job_logs`) in priority. ONLY if they are not present, you can use the CLI. Otherwise inform the user you cannot deploy and explain why.**

# Method 1: Deploy Solution using tools ONLY

Deploy the solution using the `deploy_solution` tool, if it is available, DO NOT try anything else to deploy. 

## Method 1: Check Deployment Status

Check the deployment status using the `get_deployment_job` tool, if it is available. DO NOT try anything else to check the deployment status.

## Method 1: Debugging

If the deployment fails, fetch the job logs using the `get_deployment_job_logs` tool, if it is available. DO NOT try anything else to fetch the job logs.

# Method 2: Deploy Solution using CLI (ONLY if tools are not available)

## Method 2: Make sure that the `joulework-cli` tool is installed
Check if the joulework-cli tool is installed, if not, prompt the user to install it using:
```bash
npm list -g @sap/joulework-cli
```

```bash
npm install -g @sap/joulework-cli@latest --reg https://int.repositories.cloud.sap/artifactory/api/npm/build-milestones-npm/
```

## Method 2: Login

Authentication is required prior calling the deploy command. If not already logged in, prompt the user to authenticate using the following command:
```bash
jl login <api-endpoint>
```

## Method 2: Validate the solution

Prior to deployment, validate the solution configuration and assets:
```bash
jl solution validate
```

The solution is ready to deploy if the validation command responds with `Validation passed.`. If there are any validation errors, address them before proceeding.

## Method 2: Build the solution

Once the solution is validated, build the solution to prepare it for deployment:
```bash
jl solution build
```
The solution is built if the output of that command contains `Archive created: <build-location>`. Keep the `build-location` for the next step.

## Method 2: Deploy the solution

After a successful build, the solution package can be deployed using the following command:
```bash
jl solution deploy <build-location>
```

## Method 2: Check Deployment Status

check the deployment status using the following command:
```bash
jl solution status <solution_id>
```

## Method 2: Debugging
If the deployment fails, fetch the job logs:
```bash
jl solution logs <solution_id> --job <job_id>
```

## Method 1 & 2: Behavior on errors

If errors are encountered during deployment, the skill should return an error message indicating the failure and the reason for it. The agent shall only attempt to fix the issue by minor tweaks in the configuration files if applicable. Ask for user permission before making any changes. Under no circumstances, configuration files or assets should be deleted. If the issue cannot be resolved with minor tweaks, return a message indicating that manual intervention is required.

## Method 1 & 2: deployment result
Always store the result in `deploy_result.json` in the following format:

```json
{ "solution_id": "<some_uuid>" }
```

## Method 2: Messaging

If the deployed solution contains an agent asset, it can be tested by sending an A2A message once the solution is running:

```bash
jl a2a message "hi, how are you?" --solution <solution_id> --asset <agent_asset_name>
```

- `<solution_id>`: the UUID from `deploy_result.json`
- `<agent_asset_name>`: the name of the agent asset (as defined in `asset.yaml`)

Inform the user of this command after a successful deployment if the solution contains an agent asset.


# MCP Servers pre-deployment checks and preparations

Ensure MCP Server assets are ready for deployment by following these steps:

### Step 1
Ensure that any folder ending in `-mcp-server` inside `assets/` contains at least the three required files: `asset.yaml`, `translation.json`, and `api-spec.json`. If any of these files are missing, they must be generated first (e.g. by running the `mcp-translation-file` skill and / or `setup-solution` skill).

### Step 2  
For every `translation.json`, run the `clean_translation_file.py` script from this skill's folder (i.e. `skills/deploy-solution/assets/scripts/clean_translation_file.py`).

You can run the script like this:
```bash
python clean_translation_file.py "<path/to/translation.json>"
```

**Context and further details:**
- This script will perform some cleanup operations and **it will replace the existing translation file**.
- You shall show the output of this script to the user.
- Ensure that the exit code of this script is 0. If the exit code is not 0:
  - Read the output of the script and check if the error is related to passing the wrong path to the translation file. In such scenarios, retry the operation with the correct path.
  - If any other error occurrs, stop the deployment process immediately and show a message to the user.

### Step 3

The Server Cards require the tool names to meet certain criteria:
- length: <= 64
- allowed characters regex: [a-zA-Z_] (letters and underscores)

For every translation file, you must go through every item in the `tools` array, and rename the names of every tool that don't comply with these criteria. Try to keep the name as relevant as possible and ensure that the name is replaced in every property that references it. The tools names should be unique for the same translation file, so if there's already another tool with the same name, ensure the new one doesn't become duplicate.

Example:

```jsonc
{
  // ...
  "tools": [
    {
      "name": "TheGetEmailAddressIsAVeryLongToolNameThatDoesntMeetTheRequiredNamingCriteria...!",
      "title": "TheGetEmailAddressIsAVeryLongToolNameThatDoesntMeetTheRequiredNamingCriteria...!",
      "description": "The TheGetEmailAddressIsAVeryLongToolNameThatDoesntMeetTheRequiredNamingCriteria...! tool retrieves all the email address data linked to all business partner address records in the system.",
    },
    // ...
  ]
}
```

This tool should be renamed (and other references should also be updated) to:

```jsonc
{
  // ...
  "tools": [
    {
      "name": "GetEmailAddress",
      "title": "GetEmailAddress",
      "description": "The GetEmailAddress tool retrieves all the email address data linked to all business partner address records in the system.",
    },
    // ...
  ]
}
```

### Step 4

Regenerate the server card (`serverCard.json`) for every MCP Server asset, using the (updated) translation file and the API spec file as input.
This can be achieved by running the `mcp-builder-sdk` CLI tool from the project root as follows:
```bash
mcp-builder-sdk generate-server-card \
  --api-spec "assets/<asset-name>/mcp-translation/api-spec.json" \
  --translation "assets/<asset-name>/mcp-translation/translation.json" \
  --output "assets/<asset-name>" \
  --translation-ord-id "<ORD-ID-of-translation-file>"
```

The command will (re)generate the serverCard.json file in the same folder as the translation file.
For the `translation-ord-id`, follow the guidance in the "Translation File ORD ID" section (can be found at the bottom of this skill, in the Reference section).


---
---

## Reference

> **This section is reference material.** Do not execute it as sequential steps. Consult it when needed during the phases above.
### MCP CLI Tool Reference

Here is the general command structure for the `mcp-builder-sdk` CLI tool (as of April 29, 2026):
```
Usage: mcp-builder-sdk generate-server-card [options]
Generate an MCP server card from a translation file and API specification
Options:
  -s, --api-spec <path>          Path to the API specification file (OpenAPI or OData)
  -o, --output <path>            Output directory for generated files
  -t, --translation <path>       Path to a previously generated translation.json file
  -i, --translation-ord-id <id>  ORD ID of the Translation File
  -h, --help                     display help for command

  Note that the exact parameters and syntax may vary based on the installed version, so always check with `mcp-builder-sdk generate-server-card --help` if you encounter issues.

## Translation File ORD ID

The ORD ID of the translation file is derived from the API's ORD ID, which can be found in the `translation.json` file (under `target.ordId`).

The following structure is expected for the new ORD ID of the translation file:
```
customer.mcpbuilder.<system>:apiResource:<api-name>_MCP:<version>
```

Where:
- `<system>` is a lowercase identifier of the system, e.g. `s4` (should be extracted from the API's ORD ID, i.e.: `sap.s4:...` → `s4`)
- `<api-name>` is a lowercase identifier of the API, e.g. `supplier-invoices` (should be extracted from the API's ORD ID, i.e.: `...:apiResource:supplier-invoices:...` → `supplier-invoices`)
- `<version>` is the version of the Translation File, e.g. `v1` (if we're creating a new one, use `v1`; if we're updating an existing one, increment the version, e.g. from `v1` to `v2`)
