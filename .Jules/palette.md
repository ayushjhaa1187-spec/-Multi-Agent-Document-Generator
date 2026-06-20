## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-06-20 - Add Confirmation and ARIA label to Change Project Action
**Learning:** The "Change Project" button clears chat history instantly, which can lead to accidental data loss. Furthermore, its purpose ("clears chat history") isn't immediately obvious to screen readers just from the label "Change Project".
**Action:** Always wrap state-clearing actions in a native `window.confirm` dialog to preserve user context, and supplement ambiguous visible labels with a descriptive `aria-label` or `title` explaining the consequence.
