## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-07-26 - Form Accessibility and Missing Labels
**Learning:** Inputs lacking proper `<label>` associations (using `htmlFor` and `id`) or `aria-label` attributes hinder screen reader utility. Without an explicit association, assistive tech can't consistently determine the purpose of the input.
**Action:** When adding or updating form inputs, ensure they're paired with `<label htmlFor="...">` and `id="..."`, or use `aria-label` for standalone inputs (like chat text boxes) where visual labels are omitted.
