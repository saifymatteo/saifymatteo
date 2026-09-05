# Contact Submission module

## Problem Statement

Every business rule of the Contact Submission — field limits (name 100, email 254, subject 100, message 5000), the email-shape check, Human Check gating and the email template — lives as private logic inside the `POST /api/send` handler. The Contact Form knows none of these rules: its fields carry only HTML5 `required` and `type="email"`, so a visitor can compose a 6000-character message that passes browser validation and then dies with a generic `{ok:false}` 400 — and whitespace-only input costs a doomed round-trip. Nothing about validation is testable without live HTTP and secrets.

## Solution

A single isomorphic module, `lib/contact_submission.ts`, owns the Contact Submission: the field schema (names and limits as typed constants), `validateSubmission()` for raw input, and `buildEmail()` producing the full email payload (from/to/reply-to, subject prefix, text and HTML bodies). The Contact Form and the POST route are two adapters at the same seam:

- **Contact Form** — imports the schema for field attributes (`required`, `type="email"`, `maxLength` from the schema) and runs the same `validateSubmission()` on submit; invalid input shows a message in the existing status line instead of fetching. No per-field error UI.
- **POST route** — thins to: parse body → `validateSubmission()` → Human Check adapter (Turnstile, unchanged) → Resend adapter. The API contract stays **byte-identical** (`{ok:false}` binary responses, same status codes); the module's rich internal result is mapped onto it.
- **Constants** — limits, email regex, subject prefix and addresses live in the module (ADR-0005); env keeps only secrets and `TURNSTILE_HOSTNAMES`. The Turnstile siteKey stays hardcoded in the form (public key).
- **Tests** — `tests/contact_submission.test.ts` (node --test, same pattern as `tests/theme.test.ts`): trim + truncate per field, whitespace-only rejection, email regex edges, CRLF flattening in the subject, `escapeHtml` entities, message newlines → `<br/>`, text-body shape. No fetch mocking; adapters stay untested (exercised by the deploy battery).

The received email is visually unchanged, and no new dependency is introduced.

## User Stories

1. As the owner, I want every submission rule (field names, limits, email shape) defined in one typed module, so that changing a rule is one tsc-checked edit.
2. As the owner, I want the rules covered by node tests without HTTP or secrets, so that regressions are caught cheaply before a release.
3. As a visitor, I want the form fields to enforce the real limits as I type (`maxLength` from the schema), so that I never compose a message the server will silently reject.
4. As a visitor, I want invalid input (whitespace-only, malformed email) caught before the request is sent, so that I get immediate feedback in the form's status line.
5. As a visitor, I want the API to behave exactly as today (same responses and status codes, including the 403 Human Check path), so that nothing changes for me.
6. As the owner, I want the received email to look exactly as today (subject prefix, HTML template, text fallback, visitor's email as reply-to), so that my inbox workflow is unchanged.
7. As the owner, I want Human Check and Resend to stay thin adapters inside the route, so that the pure core never depends on secrets or network.
8. As the owner, I want the module free of Node, fetch and React APIs, so that both the client and the server can import it.
9. As the owner, I want no new third-party dependency for this, so that the dependency surface stays minimal.
10. As the owner, I want a future form field to require edits in the module and the form only, so that the route stays untouched when the schema grows.
