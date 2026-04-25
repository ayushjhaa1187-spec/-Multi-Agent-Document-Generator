## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Accessible Auto-Resizing Textareas
**Learning:** Using an auto-resizing `<textarea>` for chat interfaces instead of a single-line `<input>` greatly improves UX by allowing users to draft longer, multi-line prompts naturally. However, inline style mutations in React can cause layout thrashing.
**Action:** When implementing auto-resizing textareas, use a `useRef` and a `useEffect` hook to update the `style.height` based on `scrollHeight`, explicitly caching and restoring the `scrollTop` to prevent the UI from jumping. Also, handle `onKeyDown` to manually manage "Enter" vs "Shift+Enter", and checking `!e.nativeEvent.isComposing` prevents premature submission when users are using IME keyboards (like for Asian languages).
