## 2026-08-03 - Memoize Chat Messages
**Learning:** In Next.js chat applications using ai/react (useChat), streaming token updates frequently update the messages array. This triggers unnecessary O(n) DOM re-renders of the entire message history during streaming if individual messages are not memoized.
**Action:** Always extract individual message items into a separate component and wrap it in React.memo() when working with streaming chat interfaces.
