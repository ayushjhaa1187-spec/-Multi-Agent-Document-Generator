## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-06-28 - Change Project Confirmation Dialog
**Learning:** Destructive actions that result in the loss of context (such as changing a project, which clears conversation history) should always have an explicit user confirmation.
**Action:** When identifying destructive actions, wrap them in a native browser `window.confirm` dialog to ask the user if they're sure before executing the action.
