## 2024-08-06 - Initial setup
**Learning:** Found AI chat component which streams messages. Next.js app.
**Action:** Proceeding with performance optimizations.

## 2026-08-06 - Prevent O(n) message re-renders
**Learning:** In Next.js apps using ai/react, streaming token updates constantly re-render the entire message list array.
**Action:** Always extract message list items into a React.memo() component with a custom comparison function checking content/stage props.
