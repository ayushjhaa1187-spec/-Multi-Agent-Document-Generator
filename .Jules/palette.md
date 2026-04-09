## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-03-04 - Multi-line AI Chat Input
**Learning:** Using a `<textarea>` with a custom `onKeyDown` handler instead of an `<input>` for AI chat interfaces significantly improves UX. It supports multi-line requirements (via Shift+Enter) while preserving intuitive single-key submission (Enter), ensuring users can comfortably draft complex inputs without fighting the UI.
**Action:** Use a `<textarea>` with an `onKeyDown` handler to submit on Enter and add new lines on Shift+Enter, along with an explicit `aria-label`, for all conversational AI inputs.
