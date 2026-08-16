## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-08-16 - Destructive Action Confirmation
**Learning:** Users can accidentally lose significant progress when clicking buttons that clear state (like "Change Project") without warning. While destructive actions often have confirmations, state-clearing navigation actions are sometimes overlooked but are just as destructive to user progress.
**Action:** Always add a confirmation dialog to UI elements that clear significant user-generated state or history, even if they aren't explicit "delete" buttons.
