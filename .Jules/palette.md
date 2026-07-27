## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Screen Reader Labels for Chat Inputs
**Learning:** Relying purely on placeholder text for chat inputs without explicit labels is inaccessible to screen readers. Adding a visually hidden (`sr-only`) label paired via `htmlFor` significantly improves the experience for assistive technologies.
**Action:** Always ensure chat inputs have a dedicated label, using `sr-only` class if a visible label disrupts the design.
