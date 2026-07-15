## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-05-23 - Form Accessibility (Label Associations & Input Labels)
**Learning:** React requires `htmlFor` instead of `for` when associating labels with inputs. Icon-only buttons or inputs without visible labels MUST have an `aria-label` to provide an accessible name for screen reader users.
**Action:** When creating forms, always ensure labels correctly map to input IDs using `htmlFor`, and add `aria-label` to fields that use placeholders instead of visible text labels.
