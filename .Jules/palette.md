## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Textarea for Chat Input
**Learning:** Using an `<input>` for chat input limits users when they need to type multi-line complex requirements. Switching to a `<textarea>` with auto-sizing, intercepting `Enter` to submit, and allowing `Shift+Enter` for newlines creates a much more powerful and natural experience for generative AI inputs.
**Action:** For all AI chat or requirement-gathering inputs, always use a `<textarea>` instead of `<input>` to support multiline text entry natively. Ensure accessibility by keeping clear `aria-labels` and appropriate styling.
