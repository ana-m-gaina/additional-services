All paths are relative to the `meeting-notes-agent/` subfolder: `/Users/i746475/oana/meeting-notes-agent/`

Read all files in `meeting-notes-agent/input/` folder. For each file:

1. Read `meeting-notes-agent/config/extraction_schema.json` for data model and rules
2. Read `meeting-notes-agent/config/design_config.json` for visual styling
3. Read `meeting-notes-agent/corrections.md` for accumulated feedback
4. Read all files in `meeting-notes-agent/config/examples/` for labeled examples
5. Parse the raw meeting notes
6. Extract topics, sub-topics, statuses, owners, due dates, decisions, timeline entries
7. Apply any correction patterns from `corrections.md`
8. Generate JSON data matching the extraction schema
9. Run `node meeting-notes-agent/templates/process_notes.js` with the JSON to generate a .docx file in `meeting-notes-agent/output/`
10. Show a summary: how many topics found, how many decisions extracted, any items marked unclear

If `meeting-notes-agent/input/` is empty, ask the user to paste their notes directly or drop a file in `meeting-notes-agent/input/`.
