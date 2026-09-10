# Safety and Privacy Review Gates

This document is a product checklist, not a compliance claim. The MVP is a local prototype and must not be treated as launch-ready guidance without expert review.

Singapore is the only proposed v1 launch region. The United States, United Kingdom, European Union, and all other regions require separate future gates. Confidential review evidence belongs in the private `jellydn/brave-buddy-governance` repository. Public records use redacted `SG-<AREA>-NNN` identifiers and name the exact commit and content versions reviewed.

## Current safeguards

- All scenarios and outcomes are human-authored in `src/content/scenarios.ts`.
- The content model marks urgent situations with `requiresAdultHelp`.
- Automated validation checks content structure, age-band text, clear unsafe instructions, and trusted-adult paths. It does not replace expert review.
- Urgent feedback always says that the child does not need to solve the situation alone.
- The app does not include chat, free-text role-play, uploads, advertising, analytics, or generative AI.
- The profile requests only an age band, avatar, and nickname and tells the child not to use a real name.
- Data stays in browser local storage and can be deleted from the parent dashboard.
- The parent dashboard presents aggregate practice themes, not an answer-by-answer transcript.

## Required review before public launch

### Safeguarding and content

- An external child-safeguarding professional with school or child-development experience must review all scenario wording, escalation instructions, and outcome framing.
- Define jurisdiction-specific routes for imminent danger, sexual abuse, serious abuse, and self-harm concerns.
- Define what the product does when a child discloses real harm. The current app has no disclosure input.
- Apply the editorial workflow in `CONTENT_WORKFLOW.md`, then record named reviewers and approvals for each scenario.
- Test age adaptations with children, caregivers, educators, and accessibility specialists.

### Privacy, consent, and retention

- External Singapore counsel with PDPA and children's-data experience must review child privacy and parental consent requirements. The review cannot be self-approved.
- Approve a data inventory before adding any server, account, telemetry, or support integration.
- Set documented retention and deletion periods for every data class.
- Design verified caregiver access, export, correction, and deletion processes where required.
- Prohibit behavioral advertising and prevent third-party tracking in the child experience.
- Review whether the nickname field should use a fixed generated list for production.

### Security and moderation

- Dung is the initial security and incident owner. Complete security threat modeling, dependency review, an independent penetration test, and incident response planning before launch.
- If free text, chat, sharing, or generative features are ever added, define moderation, grooming prevention, crisis escalation, evidence retention, and human review before implementation.
- AI role-play needs a fresh privacy and safeguarding review because free-form child disclosures change the risk.
- A simple arithmetic parent gate is only a child-experience boundary. It is not identity, age, or consent verification.

## Data retained by this MVP

The browser stores one JSON record: age band, nickname, avatar, completed scenario and choice identifiers, completion timestamps, and saved strategy identifiers. No data is transmitted by application code. Clearing site data or using the dashboard delete action removes this record from that browser.
