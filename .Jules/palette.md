## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Textareas for Chat Interfaces
**Learning:** For AI chat interfaces, `<input type="text">` prevents multi-line entries which is detrimental to user experience. Switching to an auto-resizing `<textarea>` requires tracking both \`scrollHeight\` and explicitly managing \`scrollTop\` via \`useLayoutEffect\` to prevent jarring scroll jumps when typing. In addition, capturing the \`Enter\` key while explicitly excluding IME composition states (\`!e.nativeEvent.isComposing\`) is critical for internationalization and robust keyboard interactions.
**Action:** For all chat inputs, use an auto-resizing textarea rather than a standard text input. Ensure manual submit triggers use \`e.currentTarget.form?.requestSubmit()\` to correctly fire React synthetic events, and manage height dynamic recalculation strictly within \`useLayoutEffect\`.
