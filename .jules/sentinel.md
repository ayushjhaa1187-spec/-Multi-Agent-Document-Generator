## 2024-07-03 - [Fix Information Leakage in Error Responses]
**Vulnerability:** The application was exposing full stack traces in analytics error tracking and could potentially leak internal paths or library versions if errors were logged to standard output or sent over the network improperly handled.
**Learning:** Returning `error.stack` inside tracking objects, which may eventually get serialized or viewed by untrusted parties via exported APIs, is an information disclosure vulnerability.
**Prevention:** Avoid attaching `error.stack` anywhere it might be exposed (e.g., frontend analytics payloads or responses). Log `error.message` instead and ensure stack trace recording is strictly controlled and omitted by default.
