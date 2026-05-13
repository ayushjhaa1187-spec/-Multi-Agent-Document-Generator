## 2024-05-24 - AI Streaming Re-render Bottleneck
**Learning:** When using Vercel AI SDK's `useChat`, the parent component holding the messages array re-renders on every token during streaming. If message items are rendered inline within `messages.map` without memoization, it causes an O(N²) re-render issue where all previous messages are re-rendered for every token received.
**Action:** Extract items rendered within `messages.map()` into standalone components wrapped in `React.memo()` to prevent unnecessary re-renders of previous messages during text streaming.
