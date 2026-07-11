## 2025-07-11 - Add form accessibility and ARIA labels
**Learning:** Dynamic input elements that lack explicit visible labels (like chat boxes) must use `aria-label` to be comprehensible to screen readers. Furthermore, standard inputs must have an explicit `id` tied to a `htmlFor` on their labels for proper focus association.
**Action:** Always associate visible labels with `htmlFor`+`id` and inject contextual `aria-label` props on standalone inputs to ensure full keyboard and screen reader accessibility.
