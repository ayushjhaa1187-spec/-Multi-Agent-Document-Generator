## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-06-22 - Data Loss Prevention UI
**Learning:** State-clearing actions that aren't immediately obvious as destructive (like "Change Project") need confirmation barriers to prevent accidental context loss.
**Action:** Always wrap state-clearing UI actions in a native `window.confirm` dialog to preserve user data.
