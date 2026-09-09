# Safety and Privacy Review Gates

This document is a product checklist, not a compliance claim. The MVP is a local prototype and must not be treated as launch-ready guidance without expert review.

## Current safeguards

- All scenarios and outcomes are human-authored in `src/content/scenarios.ts`.
- The content model marks urgent situations with `requiresAdultHelp`.
- Automated validation requires each urgent scenario to include a helpful trusted-adult path.
- Urgent feedback always says that the child does not need to solve the situation alone.
- The app does not include chat, free-text role-play, uploads, advertising, analytics, or generative AI.
- The profile requests only an age band, avatar, and nickname and tells the child not to use a real name.
- Data stays in browser local storage and can be deleted from the parent dashboard.
- The parent dashboard presents aggregate practice themes, not an answer-by-answer transcript.

## Required review before public launch

### Safeguarding and content

- A qualified child safeguarding professional must review all scenario wording, escalation instructions, and outcome framing.
- Define jurisdiction-specific routes for imminent danger, sexual abuse, serious abuse, and self-harm concerns.
- Define what the product does when a child discloses real harm. The current app has no disclosure input.
- Create an editorial workflow with named reviewers, content versions, and withdrawal procedures.
- Test age adaptations with children, caregivers, educators, and accessibility specialists.

### Privacy, consent, and retention

- Complete a regional legal review for child privacy and parental consent requirements.
- Approve a data inventory before adding any server, account, telemetry, or support integration.
- Set documented retention and deletion periods for every data class.
- Design verified caregiver access, export, correction, and deletion processes where required.
- Prohibit behavioral advertising and prevent third-party tracking in the child experience.
- Review whether the nickname field should use a fixed generated list for production.

### Security and moderation

- Complete security threat modeling, dependency review, penetration testing, and incident response planning.
- If free text, chat, sharing, or generative features are ever added, define moderation, grooming prevention, crisis escalation, evidence retention, and human review before implementation.
- A simple arithmetic parent gate is only a child-experience boundary. It is not identity, age, or consent verification.

## Data retained by this MVP

The browser stores one JSON record: age band, nickname, avatar, completed scenario and choice identifiers, completion timestamps, and saved strategy identifiers. No data is transmitted by application code. Clearing site data or using the dashboard delete action removes this record from that browser.
