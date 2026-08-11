## 2024-08-11 - Chat Messages Memoization
**Learning:** Large arrays of chat messages rendered iteratively without memoization can cause unnecessary re-renders in Next.js/React applications.
**Action:** Extract the message rendering logic into a separate `React.memo` component, keeping function equality where possible to prevent re-renders when the parent state updates but the specific message prop hasn't changed.
