## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-16 - Dynamic Aria Labels
**Learning:** For dynamic input states (like switching from Clarification to Generation modes), simply changing the `placeholder` isn't enough. Screen readers rely heavily on an explicit `aria-label` which must be updated dynamically alongside the placeholder to provide accurate context.
**Action:** Whenever a placeholder changes dynamically based on state, ensure there is an equivalent dynamic `aria-label` providing clear context to assistive technologies.
