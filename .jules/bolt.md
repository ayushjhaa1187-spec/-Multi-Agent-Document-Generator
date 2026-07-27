## 2026-07-27 - Prevent O(n) message re-renders during streaming

**Learning:** In Next.js applications using `ai/react` \`useChat\` hook, rendering large lists of messages directly in the map loop without memoization causes massive performance bottlenecks. During streaming responses, the \`messages\` array updates constantly, forcing an O(n) re-render of every single message component in the list, even though older messages haven't changed.

**Action:** Always extract individual message items into a separate component and wrap it in \`React.memo()\`. This ensures only the actively streaming message re-renders, turning an O(n) rendering operation into O(1).
