## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-03-24 - Add Confirmation Dialog for Destructive Project Change
**Learning:** Changing projects in the BRD generator implicitly clears all current chat history and context without warning. This is a highly destructive action that users could trigger accidentally since it's just a regular button next to the project name. In state-heavy AI generation flows, preserving user context and providing safety nets against accidental data loss is critical.
**Action:** Always wrap state-clearing actions in a confirmation dialog (like `window.confirm`) and explicitly label the action's consequences in ARIA attributes to prevent accidental context loss and ensure users make informed decisions about destructive actions.
