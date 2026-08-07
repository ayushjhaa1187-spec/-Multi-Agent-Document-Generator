## 2026-08-07 - Memoize AI Chat Messages
**Learning:** In Next.js chat applications using `ai/react` (`useChat`), streaming token updates frequently update the messages array. This causes O(n) DOM re-renders of the entire message history if rendered inline.
**Action:** Always extract individual message items into a separate component and wrap it in `React.memo()` to prevent unnecessary re-renders of historical messages during active streaming.
