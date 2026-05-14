The user wants to give feedback on the last processed output. Ask them what needs correcting. Then:

For **classification corrections** (e.g. "that bullet should be under 0474" or "that's not a decision"):
- Append to `meeting-notes-agent/corrections.md` with today's date, the original text, what was wrong, and what's correct
- Format each entry as:

### [today's date]
- **Original:** [bullet text]
- **Was classified as:** [what the agent did]
- **Should be:** [what the user wants]
- **Rule learned:** [generalized pattern if one can be inferred]

For **new labeled examples** (multiple corrections on the same input):
- Create a new file in `meeting-notes-agent/config/examples/` named `example_NNN.md` (next sequential number)
- Include the raw input snippet and the corrected classification

Confirm what was saved and that it will be applied on the next `/process` run.
