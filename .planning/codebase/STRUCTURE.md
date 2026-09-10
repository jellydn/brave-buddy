# Codebase Structure

**Analysis Date:** 2026-09-09

## Directory Layout

```text
project-root/
├── .github/workflows/    # Pull-request validation and Pages deployment
├── .planning/codebase/ # Current codebase map
├── docs/               # Product, safety, and architecture decisions
├── e2e/                # Playwright browser journeys
├── public/              # Static files copied into the production build
├── src/
│   ├── components/     # Screen and feature components
│   ├── content/        # Human-authored worlds and scenarios
│   ├── lib/            # Pure domain logic and local persistence
│   ├── test/           # Shared test setup
│   ├── App.tsx         # Application state and navigation
│   ├── main.tsx        # Browser entry
│   ├── styles.css      # Responsive visual system
│   └── types.ts        # Domain contracts
├── index.html          # HTML shell
└── package.json        # Scripts and dependencies
```

## Directory Purposes

**`src/components/`:**
- Purpose: Render one clear product surface per component.
- Contains: React TSX and the co-located scenario-player test.
- Key files: `Home.tsx`, `ScenarioPlayer.tsx`, `ParentDashboard.tsx`.

**`src/content/`:**
- Purpose: Hold extensible, human-authored learning material and its structural safety rules.
- Contains: World metadata, the versioned scenario catalog, playable-content selection, and validation.
- Key files: `scenarios.ts`, `scenarioValidation.ts`, `worlds.ts`.

**`src/lib/`:**
- Purpose: Hold UI-independent rules and persistence boundaries.
- Contains: Scenario engine, tests, and storage adapter.
- Key files: `scenarioEngine.ts`, `storage.ts`.

## Key File Locations

**Entry Points:**
- `src/main.tsx`: Mounts React.
- `src/App.tsx`: Coordinates views and state.

**Configuration:**
- `vite.config.ts`: Vite and Vitest.
- `eslint.config.js`: TypeScript and React lint rules.
- `.github/workflows/deploy-pages.yml`: Validation and GitHub Pages deployment.

**Core Logic:**
- `src/lib/scenarioEngine.ts`: Daily missions and progress.
- `src/content/scenarios.ts`: Full catalog and playable-content selection.
- `src/content/scenarioValidation.ts`: Editorial and structural safety validation.

**Testing:**
- `src/**/*.test.ts(x)`: Co-located tests.
- `src/test/setup.ts`: DOM matchers and browser stubs.
- `e2e/*.spec.ts`: Isolated browser journeys using accessible selectors.
- `playwright.config.ts`: Chromium, local web server, retry, and failure-artifact settings.

**Launch governance:**
- `docs/LAUNCH_READINESS_REGISTER.md`: Singapore v1 ownership, redacted evidence identifiers, pending expert decisions, and hard gates for production and AI work.
- `docs/SCENARIO_COVERAGE.md`: Point-in-time coverage evidence and prioritized content gaps.
- `docs/adr/0002-keep-curated-content-in-typed-source.md`: Current authoring-format decision and reassessment triggers.
- `docs/SUPPORTED_BROWSERS.md`: Automated and manual browser, device, and assistive-technology targets.
- `docs/REACT_DOCTOR.md`: Pinned React static-analysis gate, privacy controls, and reviewed baseline warnings.
- `docs/THREAT_MODEL_DRAFT.md`: Current assets, trust boundaries, controls, and unapproved residual risks.
- `docs/INCIDENT_RESPONSE_DRAFT.md`: Non-approved response procedure, initial ownership, and remaining operational gates.
- `SECURITY.md`: GitHub private vulnerability-reporting route and current response limits.

## Naming Conventions

**Files:**
- PascalCase for components, such as `ScenarioPlayer.tsx`.
- camelCase for domain modules, such as `scenarioEngine.ts`.

**Directories:**
- Lowercase role names, such as `content`, `lib`, and `components`.

## Where to Add New Code

**New Feature:**
- Primary code: the owning screen in `src/components/` and pure rules in `src/lib/`.
- Tests: co-located `*.test.ts` or `*.test.tsx`.

**New Component/Module:**
- Implementation: `src/components/`.

**Utilities:**
- Shared helpers: `src/lib/`; avoid a helper for one simple call site.

## Special Directories

**`dist/`:**
- Purpose: Vite production output.
- Generated: Yes.
- Committed: No.

---

*Structure analysis: 2026-09-09*
