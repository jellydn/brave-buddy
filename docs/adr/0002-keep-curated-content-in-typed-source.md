# 2. Keep Curated Content in Typed Source for the Current Catalog

Date: 2026-09-10

## Status

Accepted

## Context

Brave Buddy has ten human-authored draft scenarios. The existing TypeScript model gives each scenario an immutable ID, versioned editorial metadata, age-band text, safety fields, and compile-time checks. CI also validates structural safety rules. A CMS or separate authoring format would add synchronization, validation, access-control, preview, and migration work before the editorial team and production architecture are approved.

## Decision

Keep the current curated catalog in typed TypeScript source while it remains small and repository contributors own authoring. Use pull requests, `docs/CONTENT_WORKFLOW.md`, and automated content validation as the review path.

Reassess this decision before any of these events:

- the catalog approaches 30 scenarios;
- non-developer authors need to edit content directly;
- independent draft, approval, publication, or urgent withdrawal must occur without an application release;
- localization starts;
- approved production architecture requires content delivery outside the application bundle.

Any later format or CMS must preserve stable IDs, versions, editorial status and evidence, withdrawal history, age-band text, and the same typed validation at the application boundary.

## Consequences

### Positive

- The current source of truth stays direct, typed, version-controlled, and covered by CI.
- The project does not add a content service or collect new data before privacy and security review.
- Reviewers can see content and application behavior in one pull request.

### Negative

- Authors currently need repository and TypeScript workflow access.
- Content preview remains coupled to a branch build.
- Publication and urgent withdrawal require an application deployment.
- The decision must be revisited before larger-scale authoring or localization.
