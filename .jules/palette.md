## 2024-05-20 - Form Accessibility and Dynamic Alert Announcements
**Learning:** Adding `htmlFor` on labels targeting input `id`s is essential for screen readers. Using `role="alert"` and `aria-live="assertive"` on error display containers ensures that when a dynamic API or validation error occurs, screen readers immediately announce it, preventing visually impaired users from missing crucial feedback.
**Action:** Always link labels to inputs with `htmlFor` and apply `role="alert" aria-live="assertive"` to conditional error rendering blocks.
