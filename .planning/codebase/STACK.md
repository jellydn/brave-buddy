# Technology Stack

**Analysis Date:** 2026-09-09

## Languages

**Primary:**
- TypeScript 6.0.3 - application, content schema, logic, components, and tests in `src/`.

**Secondary:**
- CSS - responsive visual system in `src/styles.css`.
- HTML - Vite document shell in `index.html`.

## Runtime

**Environment:**
- Browser ES2022 target; Node.js 26.5.1 for development and builds.

**Package Manager:**
- npm 10.9.9.
- Lockfile: `package-lock.json` is present.

## Frameworks

**Core:**
- React 19.2.8 and React DOM 19.2.8 - component UI and client state.

**Testing:**
- Vitest 5.0.0, Testing Library 16.3.3, jest-dom 7.0.1, and jsdom 30.0.1.

**Build/Dev:**
- Vite 8.2.2 with `@vitejs/plugin-react` 6.1.1.
- TypeScript project references and ESLint 10.10.0.

## Key Dependencies

**Critical:**
- `react` and `react-dom` render the application.
- No runtime SDK, router, state library, icon package, or network client is used.

**Infrastructure:**
- Vite provides the development server and static production bundle.

## Configuration

**Environment:**
- No environment variables or secret files are required.
- Browser state uses the versioned `sgk-mvp-v1` local-storage key.

**Build:**
- `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, and `eslint.config.js`.

## Platform Requirements

**Development:**
- A current Node.js release and npm.

**Production:**
- Any static HTTPS host that supports an SPA entry document.

---

*Stack analysis: 2026-09-09*
