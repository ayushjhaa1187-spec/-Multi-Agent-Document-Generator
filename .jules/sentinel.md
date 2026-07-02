## 2025-02-25 - Information Exposure Through Stack Trace
**Vulnerability:** The analytics tracker was capturing full error stack traces and potentially sending them to external logs or endpoints.
**Learning:** Even internal logging mechanisms like `analyticsTracker` can become vectors for information leakage if they inadvertently capture detailed environment context (like stack traces) which might be exposed later.
**Prevention:** Avoid blindly logging the `.stack` property of Error objects in tracking mechanisms unless strictly necessary for debugging specific backend-only systems and ensure these are sanitized before storage or transmission.
