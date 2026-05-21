## 2025-01-20 - Memoizing useChat messages
**Learning:** In chat interfaces using Vercel AI SDK's useChat, items rendered within messages.map() must be extracted into standalone components wrapped in React.memo(). Failing to do so causes O(N²) re-renders of the entire message list during text streaming.
**Action:** When using Vercel AI SDK, always extract list items inside messages.map() to standalone components wrapped in React.memo() placed outside the parent component's body.
