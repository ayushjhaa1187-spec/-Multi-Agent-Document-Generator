## 2024-06-21 - Memoize React Chat Messages During Streaming
**Learning:** In applications using AI SDK streaming hooks (like `useChat`), the entire component tree holding the messages map re-renders frequently as the stream progresses. If message components are complex and rendered inline inside the `.map()`, they will cause measurable frame drops.
**Action:** Always extract rendered items inside streaming chat views into their own `React.memo()` wrapper component to prevent stable past messages from re-rendering alongside the active streaming message.
