<p align="center">
  <img src="public/assets/brave-buddy-logo.png" alt="Brave Buddy shield with a gold star and two blue friendship arcs" width="168" />
</p>

<h1 align="center">Brave Buddy</h1>

<p align="center">
  A short, playful place for children aged 6–12 to practice friendship skills, calm boundaries, confidence, and getting help.
</p>

<p align="center">
  <a href="https://github.com/jellydn/brave-buddy/actions/workflows/deploy-pages.yml"><img src="https://github.com/jellydn/brave-buddy/actions/workflows/deploy-pages.yml/badge.svg" alt="Validation and deployment status" /></a>
  · <a href="https://brave-buddy.itman.fyi/">Open the live preview</a>
</p>

> [!IMPORTANT]
> Brave Buddy is the working project name for the **Starring Generation Kids** prototype. Its content and launch controls still need the external reviews listed below. It is not approved as legal, clinical, safeguarding, privacy, or accessibility guidance.

## What children practice

Every story follows one memorable path:

**SEE → THINK → RESPOND → GET HELP**

- Notice what happened and name a possible feeling.
- Tell apart a misunderstanding, ordinary conflict, teasing, repeated bullying, and unsafe behavior.
- Choose a calm response and see its immediate consequence.
- Practice friendship, boundaries, upstander skills, and trusted-adult help.
- Use shorter wording for ages 6–8 or more detail for ages 9–12.

The MVP has five learning worlds and ten human-authored draft scenarios across the playground, classroom, canteen, school bus, home, parties, activities, and online spaces.

## How it works

1. A child chooses an age band, avatar, and nickname, with a prompt not to use a real name.
2. A daily mission or learning world starts a short illustrated story.
3. The child identifies an emotion and chooses from authored responses.
4. The app explains what can happen next and shows trusted-adult guidance when needed.
5. Helpful strategies can be saved in the Response Toolbox.
6. The grown-up view shows aggregate skills and conversation prompts, not a transcript of every choice.

Progress stays in versioned browser local storage and can be deleted from the grown-up view.

## Safety and privacy boundaries

- Human-authored content only. There is no generative role-play, free text, voice, chat, or upload.
- No account, backend, analytics, advertising, behavioral tracking, or third-party child-data service.
- The app does not evaluate attractiveness, body shape, voice, accent, or language ability.
- Responses never encourage retaliation, humiliation, secrecy, threats, or physical confrontation.
- Repeated harm, threats, physical danger, unsafe feelings, uncomfortable secrets, sexual content, self-harm concerns, serious abuse, and problems a child cannot solve alone route to trusted-adult guidance.
- The arithmetic grown-up gate separates experiences. It is not identity, age, or parental-consent verification.
- Singapore is the only proposed v1 launch region. Required legal, safeguarding, accessibility, privacy, and security approvals remain pending.

Read the [safety and privacy review](docs/SAFETY_PRIVACY_REVIEW.md), [launch readiness register](docs/LAUNCH_READINESS_REGISTER.md), and [security policy](SECURITY.md) before changing child-facing behavior or data handling.

## Technology

- React 19 and TypeScript
- Vite 8
- Vitest and Testing Library
- Playwright and axe-core
- React Doctor with score, sharing, and crash reporting disabled
- GitHub Pages with a least-privilege Actions workflow

## Run locally

Requires Node.js 24 and npm.

```bash
git clone https://github.com/jellydn/brave-buddy.git
cd brave-buddy
npm ci
npx --no-install playwright install chromium
npm run dev
```

Open the URL printed by Vite. Local state stays in that browser profile.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run lint` | Run ESLint. |
| `npm run doctor` | Run the local-only React Doctor error gate. |
| `npm run typecheck` | Check TypeScript project references. |
| `npm run validate:content` | Check authored scenario safety and structure. |
| `npm test` | Run unit and component tests once. |
| `npm run test:coverage` | Enforce core-logic coverage thresholds. |
| `npm run test:e2e` | Run deterministic browser journeys. |
| `npm run build` | Typecheck and create the production bundle. |

Run the complete local verification set:

```bash
npm run lint
npm run doctor
npm run typecheck
npm run validate:content
npm test
npm run test:coverage
npm run test:e2e
npm run build
```

Automated accessibility checks cover critical flows, keyboard focus, reduced motion, semantics, and a 390 px layout. They do not replace review with children, accessibility specialists, VoiceOver, or TalkBack.

## Content and architecture

Scenario content lives in [`src/content/scenarios.ts`](src/content/scenarios.ts) and follows the [editorial workflow](docs/CONTENT_WORKFLOW.md). Keep new scenarios in `draft` until attributable expert evidence exists for the exact application commit and content versions.

The current local-first architecture deliberately avoids child accounts and server storage. Start with:

- [Product and technical plan](docs/PRODUCT_TECHNICAL_PLAN.md)
- [Scenario coverage audit](docs/SCENARIO_COVERAGE.md)
- [Supported browser matrix](docs/SUPPORTED_BROWSERS.md)
- [Architecture decisions](docs/adr/)
- [Draft threat model](docs/THREAT_MODEL_DRAFT.md)

Production accounts, synchronization, telemetry, and AI remain blocked by the recorded Singapore review gates. Confidential evidence belongs in the private governance repository; this public repository contains only redacted evidence identifiers.

## Contributing

Issues and focused pull requests are welcome. Before opening a pull request:

1. Keep child data and confidential governance evidence out of commits, logs, fixtures, and screenshots.
2. Preserve the safety rules and human-authored content boundary.
3. Add tests for behavior or safety-path changes.
4. Run the complete verification set above.
5. Explain **WHAT** changed, **WHY** it is needed, and **HOW** it works.

Report security problems through the private route in [`SECURITY.md`](SECURITY.md), not a public issue. The repository does not currently declare a software license.

## Deployment

Pull requests validate but do not deploy. A green push to `main` publishes the static build to [brave-buddy.itman.fyi](https://brave-buddy.itman.fyi/) through GitHub Pages. See the [deployment guide](docs/DEPLOYMENT.md) for workflow, DNS, and HTTPS details.
