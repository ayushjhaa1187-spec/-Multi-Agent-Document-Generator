## 2024-05-24 - Initializing Bolt Journal
**Learning:** Establishing the journal to record critical performance learnings.
**Action:** Use this file to log significant findings about the codebase's architecture and performance characteristics.

## 2026-08-15 - Memoize Chat Messages
**Learning:** Extracting inline mapping of chat messages into a separate memoized component prevents unnecessary re-renders of all messages when new characters stream in, improving frontend rendering performance.
**Action:** Use `React.memo` for mapped items that depend on stable props to optimize list rendering performance in React applications.
