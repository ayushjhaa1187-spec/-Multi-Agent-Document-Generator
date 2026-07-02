## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-07-02 - Destructive Action Confirmation
**Learning:** For actions that wipe user state/progress (like changing projects in the middle of a flow), silently resetting without warning causes frustration. Native browser dialogs (`window.confirm`) can be an effective, quick micro-UX improvement for destructive or state-clearing actions to avoid accidental loss.
**Action:** Always add a confirmation step (via native dialog or custom modal) before actions that clear user input or state unexpectedly.
