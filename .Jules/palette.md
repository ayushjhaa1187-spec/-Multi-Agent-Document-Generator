## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Multiline Chat Input
**Learning:** AI chat interfaces require `<textarea>` instead of `<input>` to support multiline prompts effectively, preserving 'Shift+Enter' for newlines and manual 'Enter' key submission. The `!e.nativeEvent.isComposing` check is crucial to ensure IME (Input Method Editor) users can confirm their text without accidentally submitting the form. Additionally, deferring the height reset on submission using `setTimeout` is necessary to allow React to flush DOM updates.
**Action:** Always use `<textarea>` for AI chat interfaces with explicit IME submission checks (`!isComposing`) and deferred DOM measurements on reset.
