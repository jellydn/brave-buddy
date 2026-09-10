# Testing Patterns

**Analysis Date:** 2026-09-09

## Test Framework

**Runner:**
- Vitest 5.0.0.
- Config: `vite.config.ts` with jsdom and `src/test/setup.ts`.

**Assertion Library:**
- Vitest assertions and `@testing-library/jest-dom`.

**Run Commands:**
```bash
npm test             # Run all tests once
npm run test:coverage # Enforce core-logic coverage thresholds
npm run validate:content # Run the focused content gate
npm run test:e2e        # Run isolated Chromium journeys
npm run doctor          # Run the local-only React Doctor error gate
npx vitest           # Watch during development
npx vitest --coverage # Run the full unit suite with coverage
```

## Test File Organization

**Location:**
- Co-located with the code under test.

**Naming:**
- `*.test.ts` for logic and `*.test.tsx` for rendered components.

**Structure:**
```text
src/lib/scenarioEngine.test.ts
src/content/scenarioValidation.test.ts
src/components/ScenarioPlayer.test.tsx
src/test/setup.ts
```

## Test Structure

**Suite Organization:**
```typescript
describe('scenario content safety', () => {
  it('rejects an urgent scenario without adult help', () => { /* assertion */ })
})
```

**Patterns:**
- Use fixed dates for daily selection.
- Derive malformed fixtures from valid content and change only the tested invariant.
- Assert visible safety guidance and callback payloads for component behavior.

## Mocking

**Framework:** Vitest `vi`.

**Patterns:**
```typescript
const complete = vi.fn()
expect(complete).toHaveBeenCalledWith(scenario, expect.objectContaining({ id: 'meet' }))
```

**What to Mock:**
- Component callback boundaries and browser methods unavailable in jsdom.

**What NOT to Mock:**
- Curated scenario data or pure scenario-engine behavior.

## Fixtures and Factories

**Test Data:**
```typescript
const scenario = copyScenario('bullying-repeated-exclusion')
scenario.choices = scenario.choices.map((choice) => ({ ...choice, getsAdultHelp: false }))
```

**Location:**
- Inline in the test that owns the case.

## Coverage

**Requirements:** Core scenario validation and local domain logic enforce 85% lines, statements, and functions plus 75% branches. UI confidence comes from component and E2E behavior checks rather than line-coverage targets.

**View Coverage:**
```bash
npx vitest --coverage
```

## React static analysis

- React Doctor 0.9.13 runs a full scan in the read-only validation job.
- Error diagnostics block CI. Warning diagnostics stay visible and require review.
- `--no-score` disables score, share, and crash-reporting services. `--no-supply-chain` disables the external dependency lookup.
- `docs/REACT_DOCTOR.md` records the reviewed baseline warnings and update process.

## Test Types

**Unit Tests:**
- Editorial evidence, content safety invariants, withdrawal, situation coverage, daily selection, scoring, storage corruption, and version migration.

**Integration Tests:**
- `ScenarioPlayer` interaction through visible feelings, choices, consequence, and adult help.

**E2E Tests:**
- Playwright runs profile persistence for both age bands, daily practice, urgent help, Toolbox save/remove persistence, parent access/reset, keyboard order and focus, reduced-motion behavior, automated WCAG scans, and a 390 px overflow smoke test.
- Tests use fresh browser contexts and roles, labels, visible names, and ARIA state instead of implementation-detail selectors.
- CI retains traces and screenshots only when a browser test fails.

## Common Patterns

**Async Testing:**
```typescript
await screen.findByText('expected content')
```

**Error Testing:**
```typescript
expect(validateScenarios([scenario])).toContain(`${scenario.id}: urgent scenario needs a helpful adult-escalation choice`)
```

---

*Testing analysis: 2026-09-09*
