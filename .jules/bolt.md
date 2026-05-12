## 2026-05-12 - Memoizing Chat Messages
**Learning:** In chat interfaces using Vercel AI SDK's useChat, rendering items within messages.map() directly causes O(N²) re-renders of the entire message list during text streaming.
**Action:** Extract items rendered within messages.map() into standalone components wrapped in React.memo() to prevent unnecessary re-renders.
