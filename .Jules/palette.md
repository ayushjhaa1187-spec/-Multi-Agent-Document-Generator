## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2026-04-06 - Multiline Input in AI Chat Interfaces
**Learning:** Single-line `<input>` elements are insufficient for AI chat interfaces where users often need to provide detailed, multi-paragraph prompts or paste code snippets.
**Action:** Always use `<textarea>` elements with auto-resizing capabilities (`useEffect` adjusting `scrollHeight`) for AI chat inputs. Implement manual 'Enter' key submission (checking `!e.nativeEvent.isComposing` to support IMEs) while preserving 'Shift+Enter' for newlines, and include appropriate `aria-label` attributes for accessibility.