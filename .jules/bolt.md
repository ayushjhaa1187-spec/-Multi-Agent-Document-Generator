## 2026-07-31 - Memoize Chat Messages
**Learning:** In Next.js chat applications using `ai/react` (`useChat`), streaming token updates frequently update the messages array, causing unnecessary O(n) DOM re-renders of the entire message history if not properly memoized.
**Action:** Always extract individual message items into a separate component and wrap it in `React.memo()` with a custom comparison function focusing on `content` and other relevant properties to prevent full list re-renders.
