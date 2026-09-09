# External Integrations

**Analysis Date:** 2026-09-09

## APIs & External Services

**Application runtime:**
- None. `src/` contains no API client, telemetry, advertising, font, or generative-AI integration.

## Data Storage

**Databases:**
- None.

**File Storage:**
- None at runtime; build assets are static files.

**Caching:**
- None beyond normal browser asset caching.

## Authentication & Identity

**Auth Provider:**
- None. `src/components/ParentDashboard.tsx` uses a simple arithmetic child-experience boundary and states that it is not identity verification.

## Monitoring & Observability

**Error Tracking:**
- None.

**Logs:**
- No application logging or child-event telemetry.

## CI/CD & Deployment

**Hosting:**
- Development review uses an Amp orb Portal. Production deployment targets GitHub Pages at `brave-buddy.itman.fyi`.

**CI Pipeline:**
- `.github/workflows/deploy-pages.yml` validates pull requests and deploys `main` or manual runs with GitHub's Pages actions and OIDC.

## Environment Configuration

**Required env vars:**
- None.

**Secrets location:**
- No application secrets.

## Webhooks & Callbacks

**Incoming:**
- None.

**Outgoing:**
- None.

---

*Integration audit: 2026-09-09*
