## 2025-03-09 - Proper Form Label Association

**Learning:** Inputs without explicit label relationships (using htmlFor and id for <label> elements or aria-label for standalone inputs) are a significant accessibility gap for screen reader users and those navigating visually.
**Action:** Always ensure any <label> specifies the correct htmlFor binding to the adjacent input's id, and always supply an aria-label attribute if the input lacks a visual label entirely.
