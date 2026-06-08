## 2024-06-08 - Added confirmation for destructive state reset
**Learning:** Instantly resetting state on a button click without warning caused accidental loss of the user's ongoing chat history.
**Action:** Always wrap state-clearing UI actions in a native `window.confirm` dialog and provide an explicit `aria-label` to indicate the action's destructive consequences.
