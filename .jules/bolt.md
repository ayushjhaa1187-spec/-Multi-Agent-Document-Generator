## 2024-06-12 - Extracted MessageItem in AI streaming component
**Learning:** When using Vercel AI SDK text streaming, mapping inline elements over the `messages` array causes O(N^2) re-renders for every new chunk streamed. This creates significant main thread blocking on longer conversations.
**Action:** Always extract individual items from arrays mapped during streaming into standalone components wrapped in `React.memo()`. Ensure the component is defined outside the parent to preserve reference equality.
