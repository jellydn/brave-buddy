# Starring Generation Kids

A safety-first learning MVP for children aged 6–12 to practice friendship, confidence, boundaries, upstander skills, and getting help.

## Run locally

```bash
npm install
npx --no-install playwright install chromium
npm run dev
```

## Verify

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

The browser suite includes automated accessibility regression scans. These checks support, but do not replace, testing with children, accessibility specialists, and assistive technology.

## Product boundaries

- Human-authored content only; no generative role-play.
- Local browser storage only; no account, backend, analytics, or advertising.
- The parent view shows aggregate practice, not an answer transcript.
- This prototype does not claim legal, clinical, safeguarding, privacy, or accessibility compliance.

See [the product and technical plan](docs/PRODUCT_TECHNICAL_PLAN.md) and [the safety and privacy review gates](docs/SAFETY_PRIVACY_REVIEW.md).

## Deployment

GitHub Actions validates pull requests and deploys `main` to GitHub Pages for `https://brave-buddy.itman.fyi`. See [the deployment guide](docs/DEPLOYMENT.md) for the required one-time Pages and DNS settings.
