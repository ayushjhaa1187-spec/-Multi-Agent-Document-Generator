## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-21 - [Destructive Action Confirmation]
**Learning:** In the BRD Generator context, changing a project is a destructive action that clears the current chat history. Without an explicit warning, users may accidentally lose their detailed prompt input.
**Action:** Implemented a native `window.confirm` dialog to prompt users before executing state-clearing actions to prevent unintended data loss. Added an ARIA label to explicitly describe the button's action.
