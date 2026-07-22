## 2025-02-20 - [Prevent O(n) re-renders during chat streaming]
**Learning:** In Next.js chat applications using ai/react (useChat), streaming token updates frequently update the messages array, causing O(n) DOM re-renders of the entire message history.
**Action:** Always extract individual message items into a separate component and wrap it in React.memo() to prevent unnecessary re-renders of the entire list during high-frequency updates.
