# Architecture review queue — nextjs/

Source: architecture review of 2026-09-05 (deepening opportunities surfaced from commit-history hot spots). Each candidate below has its own file. Work them **one at a time**, in priority order — the order is a recommendation and can be reshuffled at any time.

| #   | File                                                           | Candidate                                   | Strength        | Status                                                                                                      |
| --- | -------------------------------------------------------------- | ------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | [01-contact-submission.md](01-contact-submission.md)           | Contact Submission module                   | Strong          | Spec written ([spec](../contact-submission.md), [ADR-0005](../../adr/0005-contact-submission-module.md))    |
| 2   | [02-case-study-sections.md](02-case-study-sections.md)         | Section invariant behind the content module | Worth exploring | Built — [ADR-0006](../adr/0006-case-study-sections-module.md) · [spec](../case-study-sections.md)           |
| 3   | [03-theme-choice-completion.md](03-theme-choice-completion.md) | Finish the Theme choice module              | Worth exploring | Built — [ADR-0007](../adr/0007-theme-choice-set-ownership.md) · spec's Implementation Decisions updated     |
| 4   | [04-stacking-width-tokens.md](04-stacking-width-tokens.md)     | One place for stacking and width rules      | Speculative     | Built — [ADR-0008](../adr/0008-stacking-order-named-tokens.md) · width half already solved, rhythm declined |

## Status values

- **Open** — queued, grilling not started.
- **In design** — grilling in progress; the file records settled decisions and the current frontier.
- **Spec written** — shared understanding reached; a spec (Problem Statement / Solution / User Stories, in the style of `../specs/theme-choice.md`) was written from the settled decisions. Implementation is a separate decision.
- **Rejected** — declined with a load-bearing reason; check the file for a possible ADR.

## How to pick a candidate up (fresh session, low context)

1. Read this README and the candidate file for the next **Open** item (or the one the user names).
2. Run the **grilling loop** (`.agents/skills/mattpocock/productivity/grilling`): work the candidate's frontier in rounds — numbered questions, each with a recommended answer — and wait for the user between rounds. Facts are looked up, not asked; decisions are the user's.
3. As decisions settle: record them under **Settled** in the candidate file, recompute the frontier, and keep going. When a decision names a concept not in `CONTEXT.md`, add the term there in the same step.
4. If the user rejects something for a load-bearing reason, offer an ADR (`../adr/`) so future reviews don't re-suggest it.
5. When the frontier is empty and the user confirms shared understanding, write the spec and flip the status here.

## Rules of the game

- Deep-module vocabulary: module, interface, implementation, depth, seam, adapter, leverage, locality (`.agents/skills/mattpocock/engineering/codebase-design`).
- Domain vocabulary comes from `../CONTEXT.md`.
- ADRs 0001–0004 are settled decisions — don't re-litigate them; a candidate that needs to contradict one must say so explicitly.
- Nothing lands in the repo during a review run; these files and any later specs/ADRs are the only durable artifacts.
