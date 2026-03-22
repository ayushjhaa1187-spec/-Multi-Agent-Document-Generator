## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-01-20 - Multiline Input in AI Chat Interfaces
**Learning:** Using a single-line `<input>` for AI chat interfaces severely limits users from formatting complex queries with newlines or pasting structured text. An auto-resizing `<textarea>` is necessary.
**Action:** When implementing AI chat interfaces, always use an auto-resizing `<textarea>` that supports manual 'Enter' key submission (checking `!e.nativeEvent.isComposing` to support IMEs) while preserving 'Shift+Enter' for newlines, and include appropriate `aria-label` attributes for accessibility.
