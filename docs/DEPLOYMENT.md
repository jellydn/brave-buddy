# GitHub Pages Deployment

The application is a client-only static Vite build, so GitHub Pages is the smallest deployment system that meets its current needs. It requires no hosting credential or application secret.

## Workflow

`.github/workflows/deploy-pages.yml` runs for pull requests, pushes to `main`, and manual dispatches.

- Every event installs locked dependencies and runs lint, typecheck, content and unit tests, browser end-to-end tests, and the production build.
- The browser job installs only Chromium, caches the version locked by `package-lock.json`, and keeps failure traces and screenshots for seven days.
- Pull requests stop after validation and never upload or deploy a Pages artifact.
- Pushes to `main` and manual dispatches upload `dist/` and deploy it through GitHub's OIDC-based Pages deployment.
- The deployment job alone receives `pages: write` and `id-token: write`; all other workflow access is read-only.
- Official actions are pinned to full commit SHAs.
- One Pages concurrency group prevents overlapping deployments.

Vite builds with the root base path `/`. `public/CNAME` is copied to `dist/CNAME`, which declares `brave-buddy.itman.fyi` in every published artifact.

## One-time GitHub setup

1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Run **Validate and deploy GitHub Pages** from the Actions tab, or push to `main` after the setting is saved.
4. After the first successful deployment, confirm that **Custom domain** shows `brave-buddy.itman.fyi`.
5. Enable **Enforce HTTPS** after GitHub finishes issuing the certificate.

No repository secret is required. Do not add a personal access token to this workflow.

## DNS setup

At the DNS provider for `itman.fyi`, create this record:

| Type | Name/host | Target/value |
| --- | --- | --- |
| CNAME | `brave-buddy` | `jellydn.github.io` |

Remove conflicting A, AAAA, or CNAME records for the same host. Do not use a wildcard record as a substitute. If the DNS provider offers HTTP proxying, use DNS-only mode until GitHub has verified the domain and issued its TLS certificate.

For takeover protection, the repository owner should also verify `itman.fyi` in **GitHub profile Settings → Pages**. GitHub supplies a unique TXT record for that process; use the exact value GitHub displays and do not place it in this repository.

DNS and certificate changes can take time. Verify both the Pages deployment and the HTTPS response before announcing the domain as live.
