## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-16 - Prevent Accidental Data Loss
**Learning:** Destructive actions that clear significant user progress (like changing active projects or resetting chat state) need explicit confirmation dialogs. Without them, an accidental click leads to a frustrating loss of work. Adding an `aria-label` to these action buttons also ensures screen reader users understand the destructive nature of the action.
**Action:** Always wrap state-clearing UI actions in a native `window.confirm` dialog or custom confirmation modal to prevent accidental data loss.
