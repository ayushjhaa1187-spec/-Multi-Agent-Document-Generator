## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-18 - Improve Form Accessibility in BRD Generator
**Learning:** Found multiple instances where form inputs and buttons lacked proper accessibility attributes (e.g., `aria-label`, `htmlFor`). Adding these small touches significantly improves screen reader support without altering the visual design.
**Action:** Always ensure that form inputs have associated labels (either visible or visually hidden using `sr-only`) and that interactive elements like buttons have descriptive `aria-label` attributes if their action isn't immediately obvious from their text content.
