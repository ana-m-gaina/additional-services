The user wants to change the visual styling of the output document. Ask them what they want to change.

Then:
1. Read `meeting-notes-agent/config/design_config.json`
2. Find the relevant property
3. Update it with the new value
4. Save the file
5. Confirm what was changed and that it will apply on the next `/process` run

Examples of changes:
- "Make topic titles bigger" → update typography.topicTitle.size
- "Change date color to blue" → update colors.timeline.dates
- "Make the status badges larger" → update typography for status badge size
- "Change the header background color" → update colors.tableHeader.background
