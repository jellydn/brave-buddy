# Supported Browser and Device Matrix

This matrix defines the MVP engineering target. It is not an accessibility certification or a substitute for testing with children and assistive technology.

## Automated release checks

| Surface | Current check | Release expectation |
| --- | --- | --- |
| Desktop Chromium | Playwright on the current GitHub Actions Ubuntu image | Critical child and parent journeys pass. |
| Narrow layout | Chromium at 390 CSS pixels | Setup and navigation have no horizontal overflow and keyboard focus remains visible. |
| Reduced motion | Chromium with `prefers-reduced-motion: reduce` | Interface transitions have zero duration. |
| Semantic accessibility | Chromium plus axe-core WCAG A/AA rules | No automated violation in the covered critical states. |

## Manual pre-launch matrix

The accountable accessibility owner must set exact supported versions and record results. At minimum, review:

- current Chrome on desktop and Android;
- current Safari on macOS and iOS;
- current Firefox on desktop;
- keyboard-only use on every screen;
- VoiceOver on Safari and TalkBack on Android;
- 200% text zoom, high contrast, reduced motion, and coarse-pointer touch targets.

Failures in a supported browser or assistive-technology path must be fixed or accepted in writing by the accountable owner before launch.

For Singapore v1, record the external specialist review under `SG-A11Y-NNN` in the private `jellydn/brave-buddy-governance` repository. The evidence must name the exact full application commit SHA and the reviewed scenario IDs and content versions. Keep only the evidence identifier and a redacted status in this public repository.
