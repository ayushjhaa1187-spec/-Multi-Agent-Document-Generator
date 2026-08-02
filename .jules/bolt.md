## 2025-02-28 - Memoize Chat Messages
**Learning:** During streaming token updates, useChat frequently updates the messages array. This triggers O(n) re-renders of the entire message history for every single token received, increasing CPU usage and layout thrashing.
**Action:** Extract individual message items into a separate component and wrap it in React.memo() to prevent unnecessary re-renders.
