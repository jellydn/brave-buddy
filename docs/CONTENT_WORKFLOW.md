# Scenario Content Workflow

This workflow makes scenario changes traceable. It does not replace child-safeguarding, legal, cultural, or accessibility review.

## Metadata

Each scenario has an immutable `id` and an `editorial` record:

- `version` starts at 1 and increases for each published wording or behavior change.
- `status` is one of `draft`, `expert-review`, `approved`, `published`, or `withdrawn`.
- `reviewedBy` and `reviewedAt` identify the expert approval. Do not add these fields until the review is complete.

The ten MVP scenarios are `draft`. This status is intentional. No expert approval has been recorded.

## Lifecycle

1. **Draft:** An author creates or changes a scenario and its age-band text.
2. **Expert review:** A named child-safeguarding reviewer checks the scene, choices, explanations, outcomes, help path, and family prompt. Cultural and accessibility reviewers join when their scope applies.
3. **Approved:** The author addresses findings. The expert records their name and review date. Automated checks must pass, but they are not approval.
4. **Published:** A release owner confirms that the approved version is the version in the release.
5. **Withdrawn:** A release owner removes a scenario from practice when it is unsafe, outdated, or under review. The scenario ID and history stay reserved.

Moving a scenario back to `draft` clears its prior approval metadata. Any material wording, response, outcome, safety classification, or adult-help change needs a new version and a new expert review.

## Sign-off checklist

The pull request must show:

- the situation type, world, setting, and age-band intent;
- a calm helpful response with a consequence-based explanation;
- no rewarded retaliation, humiliation, physical confrontation, or secrecy;
- a trusted-adult path for repeated bullying and unsafe behavior;
- no evaluation of appearance, body shape, voice, accent, or attractiveness;
- an accessibility and reading-load review;
- the named expert reviewer and date before approval.

## Withdrawal

Change the status to `withdrawn`, stop selecting the scenario in the application, and publish the removal as soon as practical. Keep the ID reserved so saved local progress cannot refer to a different scenario later. Record why it was withdrawn in the pull request or private safeguarding record. Do not put sensitive child information in source control.

## Responsibilities

- **Author:** writes content, updates the version, and addresses review findings.
- **Child-safeguarding reviewer:** approves safety language and escalation behavior.
- **Accessibility/content reviewer:** checks reading load and accessible wording.
- **Release owner:** verifies recorded approval and controls publication or withdrawal.

Singapore is the only proposed v1 launch region. A named external child-safeguarding professional with school or child-development experience must review the content. Dung is final launch authority only after all required expert evidence exists. The United States, United Kingdom, European Union, and other regions need separate future review gates.

## Approval evidence

Use `SG-SAFE-NNN` identifiers for Singapore safeguarding evidence. Confidential records belong in the private `jellydn/brave-buddy-governance` repository. Public pull requests and this repository contain only the evidence identifier, a redacted status, and enough source linkage to audit the release.

Every review and approval must name the exact full application commit SHA and every scenario ID and `editorial.version` reviewed. A later commit or content version is not approved unless the record explicitly includes it. Do not mark content `approved` or `published` from a verbal statement, automated test, or unattributed summary.

## Automated checks

Run `npm run validate:content` before review. CI runs the same command. It checks version and approval metadata, IDs, age-band text, choice structure, Toolbox strategies, adult-help paths, and selected clear retaliation or secrecy instructions in helpful responses.

These checks find structural mistakes. They cannot decide whether wording is safe, suitable for an age group, culturally appropriate, or ready to publish. The expert review remains required.
