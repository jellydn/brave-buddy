# Starring Generation Kids — MVP Plan

## Product goal

Create a short, playful practice experience for children aged 6–12. Children learn to **SEE → THINK → RESPOND → GET HELP** in common social situations. The app uses only reviewed, human-authored scenarios.

## MVP experience

1. A child creates a local profile with only an age band, nickname, and avatar.
2. A daily 5–10 minute mission selects three curated scenarios across five learning worlds.
3. Each scenario shows a visual scene, asks the child to notice feelings, and offers 3–4 safe response choices.
4. Every choice gives an immediate consequence-based explanation and a short outcome. Unsafe choices are explained without shame and can be retried.
5. Helpful strategies can be saved to the Response Toolbox.
6. Progress is shown across Courage, Kindness, Calmness, Friendship, and Safety.
7. A parent view shows aggregate skills practiced and family conversation prompts, not a transcript of every choice.

## Content and safety rules

- Distinguish misunderstanding, ordinary conflict, teasing, repeated bullying, and unsafe behavior.
- Include upstander practice and more than one setting.
- Use calm, direct responses. Never reward retaliation, humiliation, confrontation, or secrecy.
- Never ask a child to judge attractiveness, body shape, voice, or accent.
- Direct a child to a trusted adult for repeated behavior, threats, physical harm, unsafe feelings, uncomfortable secrets, sexual content, self-harm concerns, serious abuse, or a problem they cannot solve alone.
- Do not imply that getting help is tattling. Do not make the child responsible for investigating danger.
- Keep explanations concrete, short, and adapted for ages 6–8 and 9–12.

## Technical plan

- **Stack:** React, TypeScript, Vite, Vitest, Testing Library, and ESLint.
- **State:** small React context with versioned local storage. No account, analytics, network API, or server database in the MVP.
- **Content:** typed scenario records in a separate content module. Validation rejects malformed or safety-incomplete scenarios during development and tests.
- **Logic:** pure functions own daily mission selection, answer outcomes, progress updates, age adaptation, and aggregate parent summaries.
- **UI:** component-based single-page app with keyboard-visible controls, semantic headings, large touch targets, strong contrast, reduced-motion support, and no time pressure.

## Delivery phases

1. Foundation, data model, safety policy, and curated seed content.
2. Profile, home map, daily mission, and scenario engine.
3. Response Toolbox, progress, and parent dashboard.
4. Logic and safety tests, accessibility checks, lint, and production build.

## Before-launch expert review

This MVP does **not** claim legal, clinical, safeguarding, or accessibility compliance. Before launch, specialists must review:

- child privacy and applicable consent requirements by launch region;
- whether a parent gate and verifiable parental consent are required;
- data minimization, retention periods, deletion/export requests, and incident response;
- safeguarding language, mandatory-reporting duties, crisis and local emergency resources;
- content moderation and escalation if user-generated content is introduced;
- security threat modeling, abuse prevention, accessibility testing, and independent content review.

The current local-only prototype must not silently become a cloud data model. A production service needs an approved data inventory and retention schedule first.
