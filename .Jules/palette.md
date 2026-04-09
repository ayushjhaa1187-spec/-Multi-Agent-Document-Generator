## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Chat Textareas
**Learning:** Using an auto-resizing `<textarea>` instead of a single-line `<input>` for chat interfaces significantly improves the user experience by allowing multi-line composition. When calculating the dynamic height with Tailwind (`box-sizing: border-box`), adding 2px to the `scrollHeight` prevents persistent scrollbars and flickering. Also, checking `!e.nativeEvent.isComposing` on the Enter key down event is crucial to avoid premature form submissions when users use Input Method Editors (IMEs).
**Action:** For all chat inputs, use an auto-resizing `<textarea>` with the `scrollHeight + 2` calculation, manual Enter submission with IME support (`!e.nativeEvent.isComposing`), Shift+Enter for newlines, and `aria-label` for accessibility.
