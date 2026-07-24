## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.
## 2024-05-23 - Form Accessibility Enhancements
**Learning:** In Next.js applications, mapping custom interactive components and form inputs requires strict adherence to HTML semantics and ARIA standards. Many custom styled UI elements visually look like inputs/buttons but lack the necessary labels for screen readers. Explicitly linking labels to inputs using `htmlFor`/`id` pairs and adding descriptive `aria-label`s to dynamically changing or visually standalone inputs ensures broad accessibility.
**Action:** When updating "glass-card" or any custom styled inputs and interactive elements, always pair labels with explicit `id`s using `htmlFor` on the `<label>`, and add meaningful `aria-label`s if explicit text labels aren't visually present.
