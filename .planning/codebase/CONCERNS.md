# Codebase Concerns

**Analysis Date:** 2026-09-09

## Tech Debt

**Content editorial workflow:**
- Issue: The repository defines lifecycle and version metadata, but the MVP scenarios remain `draft` with no named expert approval.
- Files: `src/content/scenarios.ts`, `docs/CONTENT_WORKFLOW.md`.
- Impact: Structural checks are available, but the content is not ready for a responsible public launch.
- Fix approach: Assign qualified reviewers and record completed review evidence before marking content approved or published.

## Known Bugs

**No known reproducible application bug:**
- Symptoms: None after automated and live Portal verification.
- Files: `src/`.
- Trigger: Not applicable.
- Workaround: Not applicable.

## Security Considerations

**Local child data:**
- Risk: Local storage is readable by scripts on the same origin and people with device access.
- Files: `src/lib/storage.ts`.
- Current mitigation: Minimal fields, no transmission, no external scripts, and a visible delete action.
- Recommendations: Complete privacy and threat-model review before any production data service.

**Parent boundary:**
- Risk: An arithmetic question is not access control, age assurance, or consent verification.
- Files: `src/components/ParentDashboard.tsx`.
- Current mitigation: The interface states the limitation and exposes only aggregate views.
- Recommendations: Select a reviewed caregiver and consent model before launch.

## Performance Bottlenecks

**Repeated linear content lookups:**
- Problem: Progress calculation searches scenario and choice arrays for each completion.
- Files: `src/lib/scenarioEngine.ts`.
- Cause: Simplicity is preferred for 10–50 scenarios.
- Improvement path: Build identifier maps only if measured content volume makes this material.

## Fragile Areas

**Safety-sensitive authored content:**
- Files: `src/content/scenarios.ts`, `src/content/scenarioValidation.ts`.
- Why fragile: Correctness depends on both safety flags and exact human wording.
- Safe modification: Require expert review and run content validation tests for each change.
- Test coverage: Structural escalation is tested; clinical and regional wording still needs expert review.

## Scaling Limits

**Browser-only state:**
- Current capacity: One local profile and tens of scenarios.
- Limit: No device synchronization, caregiver account, recovery, or durable retention controls.
- Scaling path: Create a new reviewed architecture and data inventory before adding a backend.

## Dependencies at Risk

**Fast-moving frontend toolchain:**
- Risk: React, Vite, TypeScript, ESLint, and Vitest need regular security and compatibility review.
- Impact: Deferred updates can increase migration effort or retain known defects.
- Migration plan: Use deliberate, tested dependency updates; `package.json` and `package-lock.json` currently pin the reviewed MVP versions.

## Missing Critical Features

**Production safeguarding and consent operations:**
- Problem: No disclosure channel, jurisdiction routing, verified consent, moderation, or incident process exists.
- Blocks: Public launch and any user-generated or generative feature.

## Test Coverage Gaps

**Full navigation and persistence automation:**
- Covered: Profile persistence, daily navigation, urgent guidance, Toolbox persistence, parent gate/reset, keyboard focus, and a 390 px viewport smoke test.
- Remaining gaps: Full keyboard traversal, multiple browsers/devices, screen-reader output, reduced motion, and specialist accessibility review.
- Files: `e2e/app.spec.ts`, `src/lib/storage.ts`.
- Priority: Add broader accessibility and browser coverage next; complete specialist accessibility testing before launch.

---

*Concerns audit: 2026-09-09*
