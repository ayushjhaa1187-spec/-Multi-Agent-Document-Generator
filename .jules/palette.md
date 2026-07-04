## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-07-04 - Confirm Destructive Inline Actions
**Learning:** When users click inline actions that clear their entire workflow state (like resetting a chat session or changing active projects), failing to provide a confirmation prompt leads to accidental data loss and frustration. Users expect friction before destructive actions.
**Action:** Always add a native `window.confirm` or custom dialog before inline actions that clear significant state or unsaved work.
