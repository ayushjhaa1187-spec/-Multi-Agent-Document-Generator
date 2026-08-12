## 2026-08-12 - Memoization in AI Chat Interfaces
**Learning:** The React `useChat` hook streams messages continuously, causing frequent re-renders of the entire message list component. Since message items are expensive to render (parsing text, rendering copy buttons), not memoizing the list items leads to UI lag during generation.
**Action:** Always extract individual chat messages into separate components wrapped in `React.memo` to ensure only the currently generating message re-renders, protecting the performance of older messages in the list.
