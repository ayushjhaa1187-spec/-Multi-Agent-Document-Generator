## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-23 - Auto-resizing Textarea for Chat Input
**Learning:** For chat interfaces where users might type long requirements or multi-line feedback, using a single-line `<input>` provides a poor experience as text disappears off-screen. Using a `<textarea>` that auto-resizes based on `scrollHeight` allows users to see their full context while keeping the UI compact initially.
**Action:** Use an auto-resizing `<textarea>` instead of `<input type="text">` for primary chat or detailed input fields. Ensure `min-w-0 resize-none overflow-hidden` are used to prevent flexbox overflow and hide native resize handles.
