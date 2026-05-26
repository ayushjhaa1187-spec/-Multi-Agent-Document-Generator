## 2024-05-24 - Extract AI Chat Messages into Memoized Components
**Learning:** When using Vercel AI SDK's text streaming with inline components mapped over the `messages` array, every new chunk received triggers a re-render of the entire message list, resulting in O(N²) operations which causes UI jank on long conversations.
**Action:** Always extract items rendered within `messages.map()` into standalone components wrapped in `React.memo()` defined outside the parent component to ensure only the actively streaming message re-renders.
