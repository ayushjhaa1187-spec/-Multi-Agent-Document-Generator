## 2026-08-13 - Memoize Chat Messages
**Learning:** In Next.js/React applications with streaming AI chat interfaces, re-rendering the entire message list for every new token chunk received can become a significant performance bottleneck.
**Action:** Extract the individual chat message rendering logic into a standalone component wrapped with `React.memo()` to prevent unnecessary re-renders of older, unchanged messages when new ones update.
