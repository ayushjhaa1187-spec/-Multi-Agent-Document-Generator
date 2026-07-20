## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-07-20 - [Form Accessibility in Glass Cards]
**Learning:** The custom `glass-card` form layouts in this application rely heavily on visual proximity for grouping labels and inputs, leading to omitted semantic HTML relationships (`htmlFor`/`id`) and missing accessibility labels.
**Action:** When implementing or modifying `glass-card` form components, always explicitly enforce `htmlFor`/`id` pairings and `aria-label` attributes to ensure structural accessibility matches the visual grouping.
