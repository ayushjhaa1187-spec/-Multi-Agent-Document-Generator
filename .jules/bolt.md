## 2025-08-01 - React.memo for Chat Messages
**Learning:** Frequent updates to the messages array in useChat cause expensive O(n) re-renders of the entire message history during streaming.
**Action:** Extract individual message items into a separate component and wrap it in React.memo() to prevent unnecessary re-renders when other messages update or new tokens arrive.
