## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-Resizing Chat Textarea UX
**Learning:** Using an auto-resizing `<textarea>` instead of a standard `<input>` for chat interfaces allows users to comfortably read and edit multi-line prompts without horizontal scrolling. However, implementing it in Next.js requires care: inline `ref` callbacks for DOM mutation cause layout thrashing and SSR warnings. Managing height via `useEffect` while preserving `scrollTop` is necessary to prevent scroll jumping when `scrollHeight` resets.
**Action:** Always use `<textarea>` for AI/chat inputs. When making it auto-resize, use `useEffect`, calculate height by adding 2px to `scrollHeight` (for borders in `box-sizing: border-box`), and manage `scrollTop` to ensure smooth UX.
