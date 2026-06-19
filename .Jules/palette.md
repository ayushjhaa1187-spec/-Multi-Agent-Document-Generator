## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2025-02-13 - Confirm Before Clearing Chat History
**Learning:** Users can accidentally lose their context and work in multi-step AI conversations if state-clearing actions (like changing projects) aren't confirmed first. The `Change Project` button would silently clear all chat history and state.
**Action:** Always wrap destructive or state-clearing UI actions in a native `window.confirm` dialog or custom modal to prevent accidental data loss and preserve user context.
