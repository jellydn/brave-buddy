# Coding Conventions

**Analysis Date:** 2026-09-09

## Naming Patterns

**Files:**
- Components use PascalCase; content and libraries use camelCase.

**Functions:**
- Use verb-led camelCase names such as `getDailyScenarios`, `calculateProgress`, and `saveStrategy`.

**Variables:**
- Use descriptive camelCase nouns; callbacks use `on...` props.

**Types:**
- Use PascalCase interfaces and unions such as `Scenario`, `Choice`, and `AgeGroup`.

## Code Style

**Formatting:**
- Two-space indentation, single quotes, no semicolons, and trailing commas in multiline structures.
- No separate formatter is configured.

**Linting:**
- ESLint flat config in `eslint.config.js`.
- TypeScript recommended, React Hooks, and React Refresh rules.

## Import Organization

**Order:**
1. React and third-party runtime imports.
2. Local runtime modules.
3. Type-only imports with `import type`.

**Path Aliases:**
- None; use relative imports.

## Error Handling

**Patterns:**
- Pure validators return error lists instead of throwing.
- Recoverable browser-storage failures return an empty state.

## Logging

**Framework:** None.

**Patterns:**
- Do not log child profile or practice events.

## Comments

**When to Comment:**
- Prefer clear names and structure. Add comments only for non-obvious policy or rationale.

**JSDoc/TSDoc:**
- Not used for self-explanatory internal contracts.

## Function Design

**Size:** Keep domain functions single-purpose and components aligned to one product screen.

**Parameters:** Use typed props objects for components and direct typed arguments for pure functions.

**Return Values:** Pure calculations return explicit typed values; UI event handlers return `void`.

## Module Design

**Exports:** Named exports for components and helpers; default export only for `App`.

**Barrel Files:** Not used; direct imports keep ownership clear in this small codebase.

---

*Convention analysis: 2026-09-09*
