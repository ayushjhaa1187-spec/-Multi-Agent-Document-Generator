## 2026-07-30 - Memoizing Chat Messages
**Learning:** In Next.js chat applications using ai/react (useChat), streaming token updates frequently update the messages array, triggering unnecessary O(n) DOM re-renders of the entire message history.
**Action:** Always extract individual message items into a separate component and wrap it in React.memo() to prevent O(n) re-renders during streaming.
