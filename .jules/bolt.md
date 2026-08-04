## 2026-08-04 - Memoize Chat Messages
**Learning:** In Next.js chat applications using `ai/react` (`useChat`), streaming token updates frequently update the messages array. To prevent unnecessary O(n) DOM re-renders of the entire message history during streaming, individual message items should be extracted into a separate component and wrapped in `React.memo()`.
**Action:** Extract the inline message rendering logic in `app/page.tsx` into a `ChatMessage` component wrapped in `React.memo()`.
