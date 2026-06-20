## 2023-10-27 - React.memo() Optimization in Chat Lists
**Learning:** When rendering long lists of messages that update frequently (like in a streaming chat interface), not memoizing the individual message components causes the entire list to re-render for every new token/message.
**Action:** Always extract individual list items into separate components and wrap them with `React.memo()` (and explicitly set `displayName`) when they are part of a frequently updating parent component.
