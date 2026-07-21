## 2024-07-21 - Extract React MessageItem to Avoid O(n) Re-renders in Streaming Chat

**Learning:** Next.js chat applications using `ai/react` (`useChat`) frequently update the `messages` array during streaming. Keeping the message mapping inline without extracting items to memoized components causes an O(n) re-render of the entire message history on every streaming update chunk, leading to noticeable UI stuttering.

**Action:** Always extract individual list items into separate components and wrap them in `React.memo()` when rendering real-time streaming arrays like chat messages.
