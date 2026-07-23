## 2024-03-20 - [React Streaming Re-render Optimization]
**Learning:** In Next.js chat applications using ai/react, streaming token updates frequently update the messages array. Because React re-renders the entire mapped list on state changes, mapping directly inside the parent component causes O(n) re-renders.
**Action:** Always extract individual message items into a separate component and wrap it in React.memo(). This ensures only the newly streaming message is re-rendered, reducing rendering time to O(1) for active streaming.
