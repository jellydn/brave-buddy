# Launch Readiness Decision Register

This register prepares expert review. It does not approve a launch and does not make a compliance claim. Named ownership does not remove a gate; each entry stays blocked until the required evidence is approved for the exact release revision.

## Product boundary now

- The application is a browser-local prototype with human-authored draft content.
- It has no account, backend, analytics, free-text child input, voice input, advertising, or generative AI.
- The arithmetic parent gate is not identity, age, or consent verification.
- Singapore is the only proposed v1 launch region. The United States, United Kingdom, European Union, and all other regions need separate future gates.

## Required decisions and evidence

| Decision | Accountable role | Public owner | Evidence ID | Status |
| --- | --- | --- | --- | --- |
| Confirm Singapore child-privacy and PDPA requirements | External Singapore counsel with PDPA and children's-data experience | Reviewer not yet engaged; never self-approved | `SG-PRIVACY-001` | Pending external review |
| Approve parental consent and caregiver verification | Product owner with external legal approval | Dung | `SG-CONSENT-001` | Pending legal review |
| Approve data inventory, purpose, retention, export, correction, and deletion | Privacy lead with external legal approval | Dung | `SG-RETENTION-001` | Pending legal review; blocks production storage |
| Approve scenario wording, trusted-adult escalation, and Singapore help routes | External child-safeguarding professional with school or child-development experience | Reviewer not yet engaged | `SG-SAFE-001` | Pending external review |
| Approve parent aggregate boundaries and local deletion behavior | Privacy lead and external child-safeguarding reviewer | Dung plus pending reviewer | `SG-CONSENT-001`, `SG-RETENTION-001`, `SG-SAFE-001` | Pending reviews |
| Complete WCAG, VoiceOver, TalkBack, and child-interaction review | External accessibility specialist | Reviewer not yet engaged | `SG-A11Y-001` | Pending external review |
| Approve threat model and incident response | Security and incident owner | Dung | `SG-SEC-001` | Pending review evidence |
| Complete independent penetration testing | Independent security tester | Tester not yet engaged | `SG-PENTEST-001` | Pending test and remediation |
| Record final Singapore v1 launch decision | Final launch authority after every required sign-off | Dung | `SG-LAUNCH-001` | Blocked by all evidence above |

## Evidence records

Confidential evidence belongs in the private `jellydn/brave-buddy-governance` repository. This public repository contains only redacted summaries and identifiers in the form `SG-<AREA>-NNN`. Every approval must name the exact full application commit SHA and every reviewed scenario ID and content version. Approval of one revision does not approve later code or content.

## Prepared repository evidence

- `docs/THREAT_MODEL_DRAFT.md` describes the current static, local-storage boundary and open risks. Dung owns security review; legal, safeguarding, accessibility, and independent test evidence remain pending.
- `docs/INCIDENT_RESPONSE_DRAFT.md` provides a response sequence and names Dung as initial security/incident owner. Notification duties, response targets, backup ownership, and reviewed regional escalation still remain open.
- `SECURITY.md` directs reports to GitHub private vulnerability reporting. The feature must be enabled and tested, notifications must be watched, and a backup owner remains required.
- Current CI uses locked dependencies, pinned actions, least-privilege job permissions, content validation, unit tests, browser tests, and connected security scans. These controls do not replace expert review or penetration testing.

## Gate rules

1. A repository contributor can collect evidence but cannot approve their own specialist review.
2. A checklist item closes only when the named owner and evidence location are recorded.
3. Automated tests support review. They do not satisfy legal, safeguarding, privacy, security, or accessibility approval.
4. Production architecture work in issue #7 stays blocked until `SG-PRIVACY-001`, `SG-CONSENT-001`, and `SG-RETENTION-001` are approved for Singapore.
5. AI coach work in issue #8 stays blocked until issues #4, #5, and #7 provide approved safeguarding, moderation, privacy, retention, content, and architecture evidence. Free-form child disclosures require a fresh review even if the MVP evidence is approved.

## How to update this register

Update a status only after the accountable person accepts the role and attributable evidence exists. Link the private record by identifier; do not put sensitive child data, confidential legal advice, security secrets, or incident details in this public repository. Record a product decision separately from an expert recommendation when they differ.
