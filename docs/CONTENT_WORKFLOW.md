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

Named people and launch regions are not set in this repository. Project owners must assign them before any scenario is marked `approved` or `published`.
