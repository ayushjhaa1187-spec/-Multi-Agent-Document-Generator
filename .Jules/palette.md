## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textareas in AI Chats
**Learning:** Single-line inputs (`<input>`) in AI chat interfaces are frustrating for complex prompts. Using an auto-resizing `<textarea>` improves the experience. However, inline ref callbacks cause layout thrashing, and `useLayoutEffect` causes SSR warnings in Next.js. Furthermore, `box-sizing: border-box` in Tailwind requires adding border width (e.g., +2px) to `scrollHeight` to prevent scrollbar flickering.
**Action:** When implementing chat inputs, use a `<textarea>` with an `overflow-y-auto` max height, paired with a `useEffect` auto-resizer that stores/restores `scrollTop` and accounts for border width. Always implement `!e.nativeEvent.isComposing` to support IMEs during manual Enter submissions.
