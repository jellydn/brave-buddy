# React Doctor Check

React Doctor adds deterministic React-specific checks for correctness, security, accessibility, performance, and maintainability. It complements ESLint, TypeScript, Vitest, Playwright, and the content validator.

## Pinned command

The repository pins `react-doctor` 0.9.13 in `devDependencies` and the npm lockfile. Run:

```bash
npm run doctor
```

The script performs a full scan and blocks error-level diagnostics. Warning-level findings remain visible for review but do not fail CI. Do not change the blocking level or suppress a rule to avoid investigating a finding.

## Privacy and network behavior

The command always passes:

- `--no-score`, which the official CLI reference says disables the score API, share URL, and crash reporting;
- `--no-supply-chain`, which disables the Socket.dev dependency check.

The scan therefore runs against the checked-out source without React Doctor score, sharing, crash-reporting, or supply-chain network services. CI uses the existing `contents: read` validation job and does not grant React Doctor pull-request, issue, or status write permissions. The repository does not use the official Action because its default feedback and score features need more permissions and external reporting behavior.

The separate agent-skill installer and local hooks are not installed. They are not needed for this repository gate.

## Reviewed baseline warnings

The first full scan found no errors and five performance warnings:

| Finding | Location | Review outcome |
| --- | --- | --- |
| Set/map lookup suggestion | `src/components/ParentDashboard.tsx` | Two repeated `includes` calls operate on at most five situation types. Keep the direct rendering code. |
| Set/map lookup suggestion | `src/lib/scenarioEngine.ts` daily selection | `result` is limited to the requested daily mission count, currently three. A second index would add complexity without useful work reduction. |
| Index-map suggestion | `src/lib/scenarioEngine.ts` progress | The app keeps one completion per scenario and targets 30–50 scenarios. The existing codebase concern records this bounded linear lookup and its measured-change trigger. |
| Combined-iteration suggestion | `src/lib/scenarioEngine.ts` practiced kinds | The catalog is bounded and the two direct transformations make the intent clear. |

These are reviewed warnings, not suppressions. Recheck them if the catalog, completion model, or measured runtime cost changes. New findings must be inspected in code before they are accepted or fixed.

## Updates

Update the pinned package in a focused dependency pull request. Read the React Doctor changelog and data-use documentation, run a full local scan, and review changed diagnostics before merging.
