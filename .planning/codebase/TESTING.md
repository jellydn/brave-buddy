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
npx vitest           # Watch during development
npx vitest --coverage # Coverage after adding a coverage provider
```

## Test File Organization

**Location:**
- Co-located with the code under test.

**Naming:**
- `*.test.ts` for logic and `*.test.tsx` for rendered components.

**Structure:**
```text
src/lib/scenarioEngine.test.ts
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
const source = scenarios.find((scenario) => scenario.requiresAdultHelp)!
const unsafeCopy = { ...source, id: 'missing-help-path', choices: /* one targeted mutation */ }
```

**Location:**
- Inline in the test that owns the case.

## Coverage

**Requirements:** No percentage target is enforced for the MVP.

**View Coverage:**
```bash
npx vitest --coverage
```

## Test Types

**Unit Tests:**
- Content safety invariants, situation coverage, daily selection, and scoring.

**Integration Tests:**
- `ScenarioPlayer` interaction through visible feelings, choices, consequence, and adult help.

**E2E Tests:**
- No committed framework; live Portal flows are manually verified with agent-browser.

## Common Patterns

**Async Testing:**
```typescript
await screen.findByText('expected content')
```

**Error Testing:**
```typescript
expect(validateScenarios([unsafeCopy])).toContain('missing-help-path: urgent scenario needs a helpful adult-escalation choice')
```

---

*Testing analysis: 2026-09-09*
