## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - AI Chat Input Multiline Support
**Learning:** Single-line inputs are restrictive for AI chat interfaces where users frequently need to paste or compose long, multi-paragraph prompts. Using an auto-resizing textarea with a max-height (to allow scrolling for very long text) provides a significantly better user experience while maintaining a clean initial UI. Handling the Enter key carefully (checking for `!e.nativeEvent.isComposing` to support IMEs and `!e.shiftKey` for newlines) is critical for accessibility and global usability.
**Action:** Always use `<textarea>` elements with auto-resizing logic (handling `scrollHeight` properly to prevent layout thrashing/flickering) instead of `<input>` for AI chat interfaces or any text input where users might provide lengthy responses. Include `aria-label` since it's typically visually label-less.
