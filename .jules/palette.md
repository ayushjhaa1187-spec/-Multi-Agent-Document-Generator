## 2024-06-11 - Add confirmation dialog for destructive action
**Learning:** The "Change Project" button immediately cleared all chat state and user progress without confirmation.
**Action:** Always wrap state-clearing or destructive UI actions (such as changing projects or clearing chat history) in a native `window.confirm` dialog to prevent accidental data loss and preserve user context.
