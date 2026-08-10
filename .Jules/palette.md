## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-08-10 - Dynamic ARIA Labels for Multi-Stage Inputs
**Learning:** When a single input field serves different purposes based on the application state (e.g., clarifying vs. generating), screen readers need to be informed of the changing context. A static placeholder is not sufficient.
**Action:** Use dynamic `aria-label` attributes that update alongside the placeholder text to ensure assistive technologies provide accurate context for the current stage.
