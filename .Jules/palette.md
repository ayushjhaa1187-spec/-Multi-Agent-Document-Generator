## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-11-20 - Auto-Resizing Multiline Chat Inputs
**Learning:** Replacing `<input>` with `<textarea>` in AI chat interfaces vastly improves UX by supporting multiline prompts. However, implementing standard "Enter to submit" behavior must explicitly check `!e.nativeEvent.isComposing` to prevent accidental submissions for IME (Input Method Editor) users typing in languages like Japanese or Chinese. Additionally, resetting the textarea height upon form submission requires a `setTimeout` to ensure the DOM updates (value clearing) before height recalculation.
**Action:** Use `<textarea>` with `overflow-y-auto` instead of `<input>` for chat inputs. Implement manual 'Enter' submission that checks for IME composition and loading state, preserve 'Shift+Enter' for newlines, and defer height resets upon submission via `setTimeout`.
