## 2024-05-11 - AI Chat Stream Memoization
**Learning:** In chat interfaces using Vercel AI SDK's useChat, items rendered within messages.map() cause O(N^2) re-renders of the entire message list during text streaming.
**Action:** Extract list items into standalone components wrapped in React.memo() with a displayName.
