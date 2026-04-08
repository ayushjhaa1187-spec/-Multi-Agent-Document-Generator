## 2024-05-23 - Dynamic Character Counter
**Learning:** Combining `aria-describedby` with a visual character counter improves form accessibility significantly without cluttering the UI. Users with screen readers can check the limit, while sighted users get immediate feedback.
**Action:** For all limited text inputs, implement a character counter and link it via `aria-describedby`.

## 2024-05-24 - Auto-resizing Textarea for Chat Input
**Learning:** For AI chat interfaces, replacing `<input>` with an auto-resizing `<textarea>` significantly improves UX for multiline inputs. It must implement manual 'Enter' key submission (checking `!e.nativeEvent.isComposing` to support IMEs) while preserving 'Shift+Enter' for newlines, and resetting its height on form submission requires `setTimeout` to ensure the DOM has updated before recalculating the height.
**Action:** Use an auto-resizing `<textarea>` rather than a standard `<input>` for chat interfaces to provide a seamless multiline typing experience while keeping simple submissions smooth.
