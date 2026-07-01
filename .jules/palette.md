## 2025-07-01 - Keyboard Focus States for Custom Buttons
**Learning:** Elements styled as interactive controls (like icon buttons or plain text links) often lack default browser focus rings when resetting styles with utility classes. This makes the interface inaccessible to keyboard users navigating via Tab.
**Action:** Always verify keyboard navigation and explicitly add `focus-visible:outline-none focus-visible:ring-2` (with appropriate colors/padding) to custom buttons to ensure a clear focus indicator is present.
