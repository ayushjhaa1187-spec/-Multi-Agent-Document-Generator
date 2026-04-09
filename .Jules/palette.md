## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Textarea for Chat Inputs
**Learning:** Using a `<textarea>` instead of `<input>` for AI chat interfaces significantly improves UX for multiline requirements. However, simply using `scrollHeight` can cause scroll-jumping and visual thrashing. Additionally, keyboard submissions (`Enter`) must explicitly check `!e.nativeEvent.isComposing` to support IMEs (Input Method Editors) gracefully without premature submission.
**Action:** For chat inputs, implement auto-resizing textareas using `useEffect` (not `useLayoutEffect` to avoid SSR issues) that explicitly save and restore `scrollTop` during the height recalculation (`height: auto` then `height: scrollHeight + 2px`), and always check `isComposing` on `Enter` keydowns.
