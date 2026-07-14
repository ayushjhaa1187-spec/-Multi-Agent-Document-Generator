## 2024-07-14 - Add accessible labels to forms
**Learning:** Inputs without `id` and corresponding `htmlFor` on labels, or inputs entirely missing labels, make the UI inaccessible to screen reader users because the fields are not properly narrated.
**Action:** Always associate labels with inputs using `htmlFor` and `id`. If a visible label breaks the design, use a visually hidden `sr-only` label.
