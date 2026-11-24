# iSarawakCare / iSC Workflow — source findings

Research scope: existing `nextjs/lib/projects/isc_workflow.ts`; official public
landing page; authenticated, read-only inspection of the owner-supplied repository.
No case-study code or shared files changed. No private source links, snippets,
credentials, configuration values, or API addresses are reproduced here.

## Primary evidence

- **[P1] Public official landing:** [iSarawakCare](https://isarawakcare.sarawak.gov.my/),
  fetched as readable text. Lists EFS, BIB, GTK, kidney-patient assistance, KGC,
  and LAKBI. This establishes the government-initiative context, not application
  architecture, service effectiveness, or the portfolio owner's contribution.
- **[R1] Repository metadata:** GitHub CLI reports the supplied repository as
  **PRIVATE**. Its default branch is `master`, but the user explicitly identified
  **`dev` as latest**; all source inspection used `dev` pinned to
  **`77f62f274dbbaa7ba8440dfd9d0f46b0b7e10a18`**, committed
  `2026-06-30T07:59:17Z`. This is a source snapshot, not proof of deployment.
  Private repository links must not be added to the public portfolio.
- **[R2] README/package evidence at [R1]:** `app_workflow/README.md`,
  `app_isc/README.md`, `app_workflow/pubspec.yaml`. The workflow README is mostly
  Flutter starter documentation, not a product specification. The separate
  iSarawakCare app README describes connecting Sarawakians with ministry services;
  its ministry name is historical wording, not verification of today's name.
- **[R3] Selective implementation at [R1]:** `app_workflow/lib/app.dart`,
  `app_state.dart`, `ui/routes/routes.dart`,
  `ui/ft_admin/pg_initiative_forms/sc_builder/mixin.dart`,
  `ui/ft_admin/pg_initiative_forms/sc_builder/dg_edit_field_item/state.dart`,
  `ui/ft_public/pg_forms/state.dart`,
  `ui/ft_admin/pg_process/dg_process_action/state.dart`,
  `ui/ft_admin/pg_process/sc_sifbas_batch/state.dart`, and
  `l10n/app_workflow_localizations.dart`. These are restricted evidence locators,
  not public citations or source excerpts.
- **[L1] Existing portfolio/media evidence:** `nextjs/lib/projects/isc_workflow.ts`,
  `nextjs/public/assets/portfolios/isc_workflow/`, and local Git history
  `d163adb1d6ac3bddb22edbbd6e55e07fd21b92fd`,
  `24147d6b3ee4e83ab214dac30725e54d4638cce4`,
  `8813da714c765d0db0b50d3cb79f576eccb8f3ac`.

## Verified facts and limits

| Topic                         | Evidence-backed finding                                                                                                                                                                                                                                                                             | Boundary                                                                                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Product scope                 | Public site presents Sarawak government initiatives for citizens and institutions. [P1] Workflow source contains both public application and administrative form/processing UI. [R3]                                                                                                                | Do not describe this as only an internal admin tool, or equate the public landing website with the Flutter workflow app.                                                 |
| App architecture              | Multi-package repository includes workflow and other iSarawakCare apps, shared components, API-client and API-model packages. Workflow declares Flutter/Dart, Provider, Freezed and AutoRoute. Runtime app uses Provider wiring and `MaterialApp.router`; app state extends ChangeNotifier. [R2–R3] | Dependencies establish stack, not authorship or backend implementation. Dart `^3.7.0` and Flutter `>=3.29.0` are declared constraints, not measured production versions. |
| Form builder and applications | Builder source includes field setters/validation and saving field edits. Public form state includes fetching forms/records, submission and resubmission. Admin processing state includes processing records. [R3]                                                                                   | Supports configurable forms and application-processing UI, not claims about reduced processing time or production reliability.                                           |
| Languages                     | Localization registration includes English (`en`), Malay (`ms`) and Chinese (`zh`), with corresponding localization resources in the tree. [R3]                                                                                                                                                     | Does not establish translation completeness, language quality, who implemented it, or specifically spoken Mandarin.                                                      |
| Financial integration surface | Client-side SIFBAS batch-log retrieval and SIFBAS/OVMI-related processing/form handling are present. [R3]                                                                                                                                                                                           | Does not verify external-system backend behavior, successful payment execution, security, or who performed the integration.                                              |
| Delivery/testing              | `.github/workflows/dev-publish-workflow.yaml` at [R1] contains a Flutter web build and a deployment command. No Playwright-named paths were found in the recursive tree or mention in that workflow.                                                                                                | Workflow existence is not a passing run or proof of current production delivery. Playwright usage remains unverified, not disproven.                                     |

## Owner statements and unsupported current copy

Treat these as **existing portfolio-owner statements**, not independent evidence:

1. **Role and dates:** “Front-end engineer”, “2020-Present”, and “ONGOING”. Confirm
   personal engagement dates and present status with the owner; a recent source
   commit does not establish continuing employment or contribution. [L1]
2. **Personal contributions:** responsibility for SIFBAS integration, co-leading
   multilingual support, refactoring the builder, and OVMI integration. Code
   supports relevant feature surfaces but not personal responsibility, leadership,
   or the claimed refactor/performance improvement. Retain only with owner
   confirmation, clearly framed as their account. [L1, R3]
3. **Notifications:** “notifies applicants promptly upon application approval or
   rejection” is not verified end-to-end. Email-related source references alone
   do not prove a notification trigger, actual delivery, or promptness. [L1, R3]
4. **Ownership/organization:** “owned by Sarawak state” and the precise current
   KPWK attribution need direct official ownership/organization evidence. The
   landing text establishes government initiatives, not software IP ownership;
   the separate app README uses an older ministry name. [P1, R2, L1]
5. **Outcomes and stack claims:** “reduce constraints”, “for the well-being of all
   Sarawakians”, “optimal performance”, and “seamless” integrations are intent or
   qualitative assertions, not measured outcomes. Playwright is unverified.
   No citizen-impact figures, user counts, throughput, performance measurements,
   backend architecture, or personal authorship were established. [L1, R1–R3]

## Recommended corrections for a later copy edit

- Use a bounded description: **“Flutter web application for configuring initiative
  application forms and supporting public applications and administrative
  processing for iSarawakCare.”** Ground the government-service context in [P1],
  and technical capabilities in [R2–R3]; do not present restricted sources as
  publicly accessible references.
- Describe multilingual resources as **English, Bahasa Malaysia and Chinese**;
  describe SIFBAS/OVMI as **client-side integration interfaces** unless the owner
  can substantiate broader delivery responsibility. Avoid “seamless”, “optimal”,
  “promptly”, and unsupported benefit claims.
- Keep public official website links only. Reconfirm role, dates/status, personal
  contributions, current ministry attribution, notification behavior and
  Playwright before retaining them as factual copy. Do not invent metrics.

## Existing media provenance

All current media is already local under
`nextjs/public/assets/portfolios/isc_workflow/`; none was obtained from the private
repository during this research. [L1]

- `d163adb` introduced the earlier PNG set (home, listing, KGC listing, landing,
  logo); `24147d6` replaced the PNG set with WebP and added the light logo.
- `8813da7` renamed `isc-home.webp` to `isc-admin-landing.webp` and
  `isc-listing.webp` to `isc-admin-form-listing.webp` with Git reporting identical
  content (`R100`). It added `isc-admin-initiative-form-builder.webp`,
  `isc-admin-applicants-processing.webp`, `isc-admin-manage-initiative.webp`,
  `isc-public-landing.webp`, and `isc-public-apply-initiative.webp`.
- The case study references those seven screenshots plus `isc-logo.webp` and
  `isc-logo-light.webp`. Labels establish the existing portfolio's intended
  subjects, not independent proof of capture environment or current UI.
- **Unknown:** original screenshot capturer, capture dates, production versus
  test environment, permission to publish, and whether personal data is visible.
  Git addition/conversion history proves file lineage only. Pixels were not
  audited in this research; privacy and permission review remains necessary
  before reusing or enlarging administrative screenshots.

## Verification and remaining unknowns

Checked repository visibility, exact branch SHA, READMEs, manifest declarations,
selected source and locale registration, build-workflow markers, local asset
existence, and Git media lineage. Official landing content was fetched; no app
login, form submission, build, deployment, or external financial-system operation
was performed. No credential/configuration files were opened. Backend behavior,
production parity, ownership and individual authorship remain unverified.

## Portfolio copy update

The display title is now “iSarawak Care”; `/projects/isc-workflow` remains stable. Copy separates the public initiative-information website from the Flutter public-application and administrative workflow, and bounds SIFBAS/OVMI contributions to client-side work. It removes prompt notification, unmeasured performance and Playwright claims. Existing dates, ongoing status and personal frontend contributions remain owner-provided history; the source snapshot does not independently verify them. The seven existing previews are retained and described as historical captures rather than the current deployed UI. HTTP checks returned 200 for both public links. No private repository link or code was added to the public case study.
