# Corrections Log

Accumulated feedback from the user. The agent reads this file on every run and applies learned rules.

---

### 2026-03-18

- **Original:** Topic 4a (Performance analysis - FMP RCA) — all bullets placed under a single `current` entry dated 16.03.2026
- **Was classified as:** All bullets in `current` with the processing date
- **Should be:** Only bullets that genuinely appeared on 16.03.2026 go in `current`. Bullets with explicit earlier dates (e.g. "Update by 13th of Feb", "25th of Jan — sys monitor to start") go in `earlier`, each grouped under their actual date. Bullets with no recoverable date go in `earlier` under `date: null`.
- **Rule learned:** When a topic has no date headers in the raw notes, do NOT default all bullets to the processing date. Only put bullets in `current` if they are clearly from the most recent meeting. Anything that references a past date or action belongs in `earlier` under that date. When no date is recoverable at all, use `date: null` — never infer the processing date.

---

- **Original:** Sub-topic 8.2 owner written as "Christina/Allianz"
- **Was classified as:** Christina
- **Should be:** Christian
- **Rule learned:** Do not globally substitute Christina → Christian. Instead: when a name appears only once or twice and a very similar name (Christian) appears consistently throughout the same document, flag it as a likely OCR/inference error and use the dominant form. If both names appear independently in the notes, treat them as different people.
