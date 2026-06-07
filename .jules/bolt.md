## 2025-06-07 - Optimize React Chat Messages Re-renders
**Learning:** Vercel AI SDK text streaming causes the parent component to re-render on every single streamed chunk, leading to O(N^2) re-renders for mapped chat messages.
**Action:** Always extract inline mapped chat messages into a standalone component wrapped in `React.memo` outside the parent, and explicitly pass required props. Remember to set `displayName` to prevent `react/display-name` errors.
