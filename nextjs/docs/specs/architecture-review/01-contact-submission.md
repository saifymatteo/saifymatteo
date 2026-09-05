# Contact Submission module

**Status:** Spec written 2026-09-05 — awaiting build confirmation · **Strength:** Strong · **Dependency category:** local-substitutable
**Source:** architecture review 2026-09-05 · **Top recommendation of the review**
**Artifacts:** spec → `../contact-submission.md` · ADR → `../../adr/0005-contact-submission-module.md`

## Friction

The site's only business rules — field limits, email shape, Human Check gating, email HTML — are implementation details locked inside the POST handler. The Contact Form knows none of them, and nothing is testable without live HTTP.

**Evidence:**

- `app/api/send/route.ts:120-135` — field rules exist only here: `coerceField(body, 100/254/100/5000)` for name/email/subject/message, plus email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- `app/contact/components/contact_form.tsx:60-89` — the form has only HTML5 `required` + `type="email"`; **no `maxLength` attributes**. A 6000-character message passes browser validation and dies with a generic `{ok:false}` 400. The rule and the UI cannot see each other.
- `route.ts:14-76` — `escapeHtml`, `coerceField`, `buildHtmlBody` (inline HTML email template) are private functions inside the route file.
- `route.ts:78-115` — Human Check (Turnstile): secret + expected hostnames from env, `action === 'contact'`, remoteip from `x-forwarded-for`, 10s timeout. All inside the handler.
- Resend construction is lazy (`getResend`) so builds without secrets succeed.
- Client submits `Object.fromEntries(new FormData(form))` + `cf-turnstile-response` to `/api/send` (`contact_form.tsx:26-34`).
- Turnstile **siteKey is hardcoded** at `contact_form.tsx:116` (public key; the secret is server-side env).
- Tests: `tests/theme.test.ts` is the only test file; zero test surface for submission rules.

**Locality measurement:** adding a form field (e.g. phone) today requires edits in `contact_form.tsx` + `route.ts`, with the length rule expressible in only one of them. The API contract (field names, `cf-turnstile-response`, `{ok}` shape) is known to both sides but written nowhere.

## Shape of the deepening (not yet designed — no interface decided)

A `contact_submission` module owns the Contact Submission: the field schema (names + limits + rules), validation, and the email shape (subject/text/html building). The Contact Form and the POST route become two adapters at the same seam — which makes the seam real rather than hypothetical. Human Check and Resend stay server-side adapters.

## Frontier to grill (draft — first round)

*(Round 1 asked 2026-09-05 — see Settled for answers; remaining frontier in Round 2)*

## Settled

- **Q1 — Module scope: (b).** `lib/contact_submission.ts` owns the field schema, `validate()` and email building (`buildEmail(submission)` → subject/text/html). Isomorphic: no Node APIs, no fetch, no React. Human Check (Turnstile) and Resend stay adapters in `route.ts` — settled without veto.
- **Q2 — Client consumption: (b), minimally.** Form gets schema-driven attributes (`required`, `type="email"`, `maxLength` from schema) AND runs the same `validate()` on submit; invalid input shows in the existing status line instead of fetching. No per-field error UI.
- **Q3 — Error contract: (a).** API responses byte-identical to today (`{ok:false}` binary; 400/403/500). Module's internal validate result is rich; the route maps to binary. Field-level errors deliberately deferred.
- **Q4 — Config placement: module constants.** Limits, email regex, subject prefix and from/to addresses are typed constants in the module; env keeps only secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET`) and `TURNSTILE_HOSTNAMES`; siteKey stays hardcoded. Rationale (user accepted the middle ground): env-based config is two places by platform design (local `.env.local` vs Cloudflare secrets) and client-shared values are build-inlined anyway — the module is the actual single place.
- **Q5 — Test plan: approved.** `tests/contact_submission.test.ts` via `node --test --experimental-strip-types`: trim+truncate, whitespace-only, email edges, CRLF flattening, escapeHtml entities, newline→`<br/>`, text shape. No fetch mocking / no adapter tests.

## Log

- 2026-09-05 — queued from architecture review.
- 2026-09-05 — Round 1 answered: 1(b), 2(b), 3(a), 5(ok). Q4 partially open (user leans .env for configuration; prefers singular/simple).
- 2026-09-05 — Round 2 answered: Q6 module constants, Q7 ADR yes. Frontier empty → spec written (`../contact-submission.md`), ADR-0005 written. Awaiting build confirmation.
- 2026-09-05 — **Built and verified.** `lib/contact_submission.ts` (schema/validate/buildEmail), route thinned to adapters, form schema-driven + client validate gate, `tests/contact_submission.test.ts` (19 tests; `npm run test` script extended, AGENTS.md synced). Checks: tsc/eslint/prettier/build PASS, 27/27 tests PASS. Browser: schema attrs live (100/254/100/5000), whitespace-only → status-line hint with 0 API calls, 7 API paths byte-identical to legacy (over-limit truncates then 403s at the token gate, never 400s), full flow = legacy dev behavior. 200-path not exercisable in dev (no secrets) — covered by unit tests + tsc against Resend types.
