## 2024-06-25 - Prevent O(n) re-renders in useChat by extracting and memoizing MessageItem
**Learning:** In Next.js chat applications using `ai/react` (`useChat`), streaming token updates frequently update the messages array. This triggers unnecessary O(n) DOM re-renders of the entire message history during streaming.
**Action:** Always extract individual message items into a separate component and wrap it in `React.memo()` to prevent unnecessary re-renders.
