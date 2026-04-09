## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - AI Chat Input Enhancements
**Learning:** For AI chat interfaces, `<textarea>` components that automatically resize provide a significantly better user experience than `<input>`. Furthermore, handling `onKeyDown` to allow submitting via `Enter` requires checking `!e.nativeEvent.isComposing` to robustly support IMEs (Input Method Editors), ensuring characters are fully formed before submission.
**Action:** Always use auto-resizing `<textarea>` for chat interfaces, ensuring `Enter` submission is guarded with `!isComposing` checks.
