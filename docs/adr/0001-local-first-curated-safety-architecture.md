# 1. Use a Local-First Curated Safety Architecture

Date: 2026-09-09

## Status

Accepted

## Context

The first product version teaches sensitive social and safety skills to children aged 6–12. It needs age-adapted content, immediate consequence-based feedback, urgent adult escalation, and minimal child data. Generative role-play and a production child-data service would add content, privacy, and safeguarding risks before the product has an approved review process.

## Decision

Build a client-only React and TypeScript application. Keep human-authored scenarios in a typed content module, with presentation kept separate from pure selection, validation, and progress logic. Mark safety-sensitive scenarios with `requiresAdultHelp`; reject content sets in tests when an urgent scenario does not include a helpful trusted-adult response.

Store only age band, nickname, avatar, scenario and choice identifiers, timestamps, and saved strategy identifiers in versioned browser local storage. Add no account, backend, analytics, advertising, free-text input, upload, or generative AI. Show parents only aggregate practice themes in the interface.

## Consequences

### Positive

- The MVP is simple to deploy, test, and extend with more reviewed scenarios.
- Safety requirements are represented in both content and executable validation.
- No application code transmits child profile or practice data.
- UI modules do not own content policy or scoring logic.

### Negative

- Progress does not synchronize between devices and can be lost with browser data.
- Local storage is not an access-control boundary; another person using the device can inspect it.
- The arithmetic parent gate is a visual boundary, not consent or identity verification.
- Production accounts, disclosures, moderation, retention, and regional escalation require new reviewed decisions before implementation.
