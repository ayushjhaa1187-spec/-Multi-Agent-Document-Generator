## 2025-02-22 - [React.memo in Streaming Chat]
**Learning:** During streaming token updates from useChat, Next.js frequently updates the messages array, triggering unnecessary O(n) DOM re-renders of the entire message history and raising CPU load.
**Action:** Always extract individual message items into a separate component and wrap it in React.memo() to prevent unnecessary re-renders of the full message list during token streaming.
