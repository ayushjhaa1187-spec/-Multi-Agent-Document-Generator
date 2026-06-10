## 2023-10-27 - Sanitize analytics stack traces
**Vulnerability:** The analytics tracker leaked error stack traces in its `getEvents` export.
**Learning:** Internal tracking of error stacks is useful for debugging but can expose sensitive internal paths and logic if the raw event data is exported directly.
**Prevention:** Sanitize event properties before returning or exporting them, specifically extracting and removing stack traces to prevent sensitive info leakage.
