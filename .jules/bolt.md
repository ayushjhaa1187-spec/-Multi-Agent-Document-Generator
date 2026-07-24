## 2024-07-24 - React.memo for Chat Messages
**Learning:** In Next.js chat applications using ai/react (useChat), streaming token updates frequently update the messages array.
**Action:** To prevent unnecessary O(n) DOM re-renders of the entire message history during streaming, always extract individual message items into a separate component and wrap it in React.memo().
