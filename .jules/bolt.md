## 2026-08-17 - Memoize Chat Messages
**Learning:** Extracting an inline JSX element into a separate component and wrapping it with `memo()` prevents unnecessary re-renders of chat messages when the user types in the input field. Because `messages` array can be large, avoiding full re-renders of each message component significantly improves input responsiveness and UI performance.
**Action:** When a parent component manages both list state and rapid user input state (like typing), extract list items into `memo`ized components so they only re-render when their specific props change.
