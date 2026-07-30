## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-07-30 - Semantic Form Accessibility
**Learning:** Explicitly pairing labels with inputs using `htmlFor` and `id`, as well as adding dynamic `aria-label` attributes to fields that lack visible labels (like chat inputs), ensures that screen readers can accurately interpret the form's context at all stages of interaction.
**Action:** Always enforce 'htmlFor'/'id' pairings for form components and ensure unlabelled inputs have context-aware 'aria-label' attributes.
