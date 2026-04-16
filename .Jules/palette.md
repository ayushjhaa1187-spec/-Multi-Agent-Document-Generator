## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-04-16 - Multiline Chat Input Accessibility & UX
**Learning:** For AI chat interfaces, `<input type="text">` severely limits user expression by restricting input to a single line. Upgrading to a multiline `<textarea>` with auto-resize (based on `scrollHeight`) while preserving 'Enter to submit' and 'Shift+Enter to newline' vastly improves the UX. Properly configuring `aria-label` ensures screen reader users understand the component.
**Action:** Always use auto-resizing textareas over single-line inputs for chat interfaces. Ensure keyboard navigation matches user expectations (Enter to submit) and handle IME composition states to avoid accidental submissions.
