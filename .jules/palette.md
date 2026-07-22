## 2025-03-01 - [Added missing semantic relationships in page inputs]
**Learning:** Found that "glass-card" form components were visually grouping labels and inputs, but lacking programmatic semantic relationships (`htmlFor`/`id` bindings) which is crucial for accessibility. Similarly, input fields designed for chat lacked explicit `aria-label` despite having clear placeholder context.
**Action:** Always enforce programmatic explicit `htmlFor`/`id` pairs on labels/inputs and `aria-label`s on specialized input fields when auditing Next.js form components.
