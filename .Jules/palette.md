## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-08-01 - Form Label Association
**Learning:** In glass-card form components, labels are visually grouped but semantically detached from inputs, causing screen readers to miss context. Relying solely on visual proximity is insufficient for accessibility.
**Action:** Enforce explicit `htmlFor`/`id` pairing for all form elements in glass-card components to ensure semantic association.
