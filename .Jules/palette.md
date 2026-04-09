## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-11-20 - Multi-line Chat Input and Keyboard Submission
**Learning:** For chat interfaces, utilizing a `textarea` with automatic `Enter` submission (while reserving `Shift+Enter` for newlines) significantly improves natural conversational flow compared to a standard `input type="text"`, allowing users to construct complex, multi-line prompts without resorting to an external editor.
**Action:** When implementing chat interfaces that support detailed requirements, use a `<textarea>` with an `onKeyDown` listener that intercepts `Enter` without `Shift` to submit, and ensure it dynamically scales or handles scrolling gracefully.