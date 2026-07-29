## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-11-21 - Accessible Form Pairings

**Learning:** Form components like inputs must have explicitly associated labels using `htmlFor` matching the `id` of the input element to ensure assistive technologies can properly understand their relationship. Relying merely on visual proximity is insufficient for proper UX accessibility. Screen readers rely on this binding to announce the label when the input receives focus. Using `aria-label` is also a suitable alternative for icon-only inputs or when visual labels are hidden.
**Action:** Consistently enforce strict label-to-input pairing using `htmlFor` and `id` across all form elements in 'glass-card' components, avoiding reliance on visual clustering.
