## 2025-08-05 - Optimize Chat Messages Re-rendering
**Learning:** During token streaming in Next.js chat applications using `ai/react`, the messages array is updated frequently. This causes O(n) DOM re-renders of the entire message history if individual message components are not memoized.
**Action:** Always extract individual message items into a separate component and wrap it in `React.memo()` with a named function to prevent unnecessary re-renders of the entire list when only the latest message is streaming.
