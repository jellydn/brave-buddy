# Architecture

**Analysis Date:** 2026-09-09

## Pattern Overview

**Overall:** Client-only, content-driven React application with pure domain logic.

**Key Characteristics:**
- Human-authored typed content is separate from presentation.
- Pure functions own validation, daily selection, scoring, and aggregate summaries.
- One top-level component owns versioned local state and view transitions.

## Layers

**Content and domain model:**
- Purpose: Define worlds, scenarios, editorial state, safety flags, and structural content validation.
- Location: `src/types.ts`, `src/content/`.
- Contains: Typed records, the full scenario catalog, playable-content selection, and pure validation rules.
- Depends on: Shared types.
- Used by: Logic and UI layers.

**Domain logic and persistence:**
- Purpose: Select daily practice, calculate progress, and save local state.
- Location: `src/lib/`.
- Contains: Pure scenario functions plus a small local-storage adapter.
- Depends on: Domain types.
- Used by: `src/App.tsx` and screen components.

**Presentation:**
- Purpose: Render profile, map, scenarios, Toolbox, and parent dashboard.
- Location: `src/components/`, `src/styles.css`.
- Contains: React function components and responsive CSS.
- Depends on: Content, domain logic, and callback contracts from `App`.
- Used by: `src/App.tsx`.

## Data Flow

**Scenario practice:**
1. `Home` selects a world or the pure daily selection returns three scenarios.
2. `App` passes scenarios and the profile age band to `ScenarioPlayer`.
3. The player collects a feeling and response, then shows the authored explanation and outcome.
4. `App` replaces that scenario's completion and optionally saves its strategy identifier.
5. React state is serialized to local storage; derived views recalculate aggregate progress.

**State Management:**
- `App` owns `AppState` with React state. No global store or server cache is used.

## Key Abstractions

**Scenario:**
- Purpose: One complete authored situation with editorial metadata, safety classification, feelings, choices, and family prompt.
- Examples: `src/types.ts`, `src/content/scenarios.ts`.
- Pattern: Typed content-as-data.

**Content validator:**
- Purpose: Reject structural safety errors without claiming expert approval.
- Examples: `src/content/scenarioValidation.ts`.
- Pattern: Pure validation over the complete catalog.

**Scenario engine:**
- Purpose: Keep selection and scoring independent from rendering.
- Examples: `src/lib/scenarioEngine.ts`.
- Pattern: Pure functions.

## Entry Points

**Browser entry:**
- Location: `src/main.tsx`.
- Triggers: Vite loads `index.html`.
- Responsibilities: Mount `App` and load global styles.

**Application coordinator:**
- Location: `src/App.tsx`.
- Triggers: React render and user navigation.
- Responsibilities: State persistence, view selection, and component callbacks.

## Error Handling

**Strategy:** Prevent invalid authored content in tests and recover from unreadable local state.

**Patterns:**
- `validateScenarios` returns actionable content errors.
- `loadState` catches parse/storage errors and returns an empty state.

## Cross-Cutting Concerns

**Logging:** None by design.

**Validation:** TypeScript at build time and an explicit `npm run validate:content` CI gate over the full catalog.

**Authentication:** None; the parent arithmetic gate is not authentication.

---

*Architecture analysis: 2026-09-09*
