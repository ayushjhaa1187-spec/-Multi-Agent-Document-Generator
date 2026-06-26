## 2024-06-26 - Add Confirmation Dialog for Destructive Actions
**Learning:** Users can easily lose context and data when state-clearing actions, such as changing active projects or resetting chat history, lack a confirmation step. Wrapping these destructive or flow-resetting actions in a native `window.confirm` dialog is a simple yet effective way to prevent accidental data loss.
**Action:** Always wrap state-clearing or destructive UI actions (such as changing projects or clearing chat history) in a confirmation dialog (e.g., `window.confirm`) to preserve user context.
