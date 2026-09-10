# Launch Readiness Decision Register

This register prepares expert review. It does not approve a launch and does not make a compliance claim. All entries are blocked until the user names accountable people and they record their decisions.

## Product boundary now

- The application is a browser-local prototype with human-authored draft content.
- It has no account, backend, analytics, free-text child input, voice input, advertising, or generative AI.
- The arithmetic parent gate is not identity, age, or consent verification.
- Public launch regions are not selected.

## Required decisions and evidence

| Decision | Required accountable role | Named owner | Evidence required | Status |
| --- | --- | --- | --- | --- |
| Select supported launch regions and applicable child-privacy requirements | Qualified child-privacy legal counsel | Unassigned | Written region list and legal requirements | Blocked |
| Select parental consent and caregiver verification model | Product owner with child-privacy legal counsel | Unassigned | Approved consent and caregiver-access specification | Blocked |
| Approve data inventory, purpose, retention, export, correction, and deletion rules | Privacy lead with legal counsel | Unassigned | Approved data inventory and retention schedule | Blocked |
| Approve scenario wording and trusted-adult escalation | Qualified child-safeguarding professional | Unassigned | Per-scenario review evidence under `docs/CONTENT_WORKFLOW.md` | Blocked |
| Define routes for imminent danger, sexual abuse, serious abuse, and self-harm concerns in each launch region | Qualified child-safeguarding professional with regional legal counsel | Unassigned | Reviewed escalation matrix and localized resources | Blocked |
| Approve parent aggregate boundaries and local deletion behavior | Privacy lead and child-safeguarding professional | Unassigned | Signed parent-view and deletion review | Blocked |
| Complete accessibility review with children and assistive technology | Accessibility specialist | Unassigned | Findings, blocking defects, and retest record | Blocked |
| Approve security threat model and incident response | Security lead | Unassigned | Threat model, incident plan, and penetration-test scope | Blocked |
| Assign launch authority and record the release decision | Accountable product owner | Unassigned | Signed launch checklist referencing all evidence above | Blocked |

## Gate rules

1. A repository contributor can collect evidence but cannot approve their own specialist review.
2. A checklist item closes only when the named owner and evidence location are recorded.
3. Automated tests support review. They do not satisfy legal, safeguarding, privacy, security, or accessibility approval.
4. Production architecture work in issue #7 stays blocked until the launch regions, consent model, and data inventory are approved.
5. AI coach work in issue #8 stays blocked until issues #4 and #7 provide approved safeguarding, moderation, privacy, retention, and architecture decisions.

## How to update this register

Replace `Unassigned` only after the person accepts the accountable role. Link durable review evidence; do not put sensitive child data, legal advice, security secrets, or incident details in this public repository. Record the final product decision separately from an expert recommendation when they differ.
