## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-08-07 - Form Semantic Relationships in Glass-Card UIs
**Learning:** When using custom 'glass-card' form layouts, visual proximity is often used to group labels and inputs. However, screen readers rely on explicit semantic relationships. Adding `htmlFor` on the label and matching `id` on the input, along with `aria-label` for standalone inputs, ensures these relationships are programmatically determinable.
**Action:** Always enforce strict `htmlFor`/`id` pairings for labeled inputs and `aria-label` for standalone inputs in custom form component designs.
