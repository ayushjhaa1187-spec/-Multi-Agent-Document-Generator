## 2024-05-18 - [Memoize Chat Messages in React]
**Learning:** Next.js chat applications using ai/react stream token updates which frequently update the messages array, leading to unnecessary re-renders of all message components if not memoized.
**Action:** Extract individual message items into a separate component wrapped with React.memo() to optimize rendering performance during streaming updates.
