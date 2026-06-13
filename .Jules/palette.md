## 2024-06-13 - Add Window Confirm and ARIA Alerts to Project Flow
**Learning:** Destructive actions like changing a project that clears the current chat messages need explicit confirmation to prevent accidental data loss. Furthermore, dynamic error messages must immediately be announced by screen readers.
**Action:** Always wrap state-clearing actions in `window.confirm` and apply `role="alert"` and `aria-live="assertive"` to dynamic error components.
