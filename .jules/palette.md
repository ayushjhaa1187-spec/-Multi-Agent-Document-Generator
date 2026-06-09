## 2024-06-09 - Add confirmation dialog for Change Project
**Learning:** Destructive actions that clear user state (like changing projects and clearing chat history) require explicit confirmation to prevent accidental data loss and frustration.
**Action:** Always wrap state-clearing actions in a native `window.confirm` or custom dialog to preserve user context and improve overall usability.
