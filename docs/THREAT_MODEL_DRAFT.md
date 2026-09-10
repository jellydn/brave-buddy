# Draft MVP Threat Model

**Prepared:** 2026-09-10
**Status:** Repository preparation only. Dung owns security and incident review. External legal, safeguarding, accessibility, and independent security evidence remains pending.

## Current boundary

The proposed v1 region is Singapore only. The deployed application is a static GitHub Pages site. Application code stores one versioned record in browser local storage. It has no application backend, account, analytics, advertising, free-text input, upload, chat, voice, or generative AI. GitHub Pages and the browser/network remain outside the application's control.

```text
Child or caregiver
       │
       ▼
┌──────────────────────┐
│ Static browser app   │
│ React + authored data│
└──────────┬───────────┘
           │ same-origin browser API
           ▼
┌──────────────────────┐
│ Versioned local data │
└──────────────────────┘
```

## Assets and trust boundaries

- **Child profile:** nickname, avatar, and age band. A nickname can still contain identifying information.
- **Practice record:** scenario and choice IDs, completion times, and saved strategy IDs.
- **Caregiver aggregate:** totals derived in the browser from the practice record.
- **Content integrity:** human-authored scenarios and trusted-adult guidance in the deployed bundle.
- **Build and deployment:** repository, dependencies, GitHub Actions, and GitHub Pages configuration.

The device, browser extensions, same-origin scripts, repository collaborators, GitHub, and future services are separate trust boundaries.

## Current threats and controls

| Threat | Current control | Residual risk / required owner decision |
| --- | --- | --- |
| A child enters an identifying nickname | UI asks for a fun nickname and limits it to 16 characters | Privacy and safeguarding owners must decide whether generated aliases replace entry. |
| Another device user reads local progress | Data is minimized and can be deleted in the parent view | Local storage is not confidential. The caregiver model and shared-device guidance are unapproved. |
| Script injection reads or changes local data | React escapes rendered text; scenarios are bundled; no third-party application scripts exist | A security lead must review CSP, dependency, XSS, and extension risks. |
| Corrupt or future-version storage changes behavior | Parsing validates the profile and records; malformed and unknown versions fail closed | Recovery and deletion behavior need privacy and caregiver review. |
| A child treats the arithmetic gate as access control | UI and docs state that it is only an experience boundary | Approved caregiver verification and consent models are required before accounts or sensitive parent data. |
| Unsafe scenario content reaches children | Content remains draft; typed validation blocks selected structural errors; CI runs tests | Qualified safeguarding, cultural, reading-load, and accessibility review is still required. |
| Build dependency or workflow compromise | Exact package versions, lockfile installs, pinned actions, least-privilege workflow permissions, GitGuardian, and Socket checks | Security owner must approve dependency policy and supply-chain response. |
| Public vulnerability details increase risk | `SECURITY.md` directs reporters to GitHub private vulnerability reporting | Repository owner must enable and test the channel; Dung must watch it and assign a backup owner. |

## Future architecture threats

Do not add accounts, APIs, synchronization, analytics, support tools, free text, voice, AI, or transcript storage to this model. Issue #7 needs approved Singapore privacy, data-inventory, and consent evidence before design or implementation starts. Issue #8 additionally needs reviewed moderation, disclosure escalation, provider retention, red-team, and human-review controls. It requires a fresh review because free-form child disclosures change the risk.

## Required review evidence

Dung must review this draft and incident response under `SG-SEC-001`. An independent tester must record scope, remediation, and retest evidence under `SG-PENTEST-001`. External privacy and safeguarding reviewers must separately approve risks in their scope. Every record must name the exact full application commit SHA and applicable scenario IDs and content versions.
