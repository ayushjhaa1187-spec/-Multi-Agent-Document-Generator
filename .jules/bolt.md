## 2024-06-18 - Memoize Chat Messages
**Learning:** In chat applications where messages stream continuously or inputs update rapidly, inline mapping of message items causes unnecessary re-renders of the entire history list.
**Action:** Always extract message rendering into a `React.memo()` component to prevent previous, unchanged messages from re-rendering.
