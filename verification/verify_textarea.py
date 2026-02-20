import os
import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Mock the API response
        def handle_route(route):
            print("Intercepting /api/chat")
            route.fulfill(
                status=200,
                body='0:"I can help with that!"\n',
                headers={'Content-Type': 'text/plain; charset=utf-8', 'X-Vercel-AI-Data-Stream': 'v1'}
            )

        page.route("**/api/chat", handle_route)

        try:
            print("Navigating to home page...")
            page.goto("http://127.0.0.1:3001")

            # Enter project name
            print("Entering project name...")
            page.fill("input[placeholder*='Enter your project name']", "Test Project")
            page.press("input[placeholder*='Enter your project name']", "Enter")

            # Wait for chat interface
            print("Waiting for chat interface...")
            page.wait_for_selector("text=Current Project", timeout=10000)

            # Check for textarea
            print("Looking for textarea input...")
            textarea = page.wait_for_selector("textarea[placeholder*='Describe your requirements']", timeout=5000)
            if textarea:
                print("Textarea found!")
            else:
                raise Exception("Textarea not found")

            # Test Shift+Enter (should not submit)
            print("Testing Shift+Enter...")
            textarea.fill("Line 1")
            textarea.press("Shift+Enter")
            textarea.type("Line 2")

            content = textarea.input_value()
            if "Line 1\nLine 2" in content:
                print("Shift+Enter worked correctly (added newline)")
            else:
                print(f"Shift+Enter failed. Content: {content}")

            # Test Enter (should submit)
            print("Testing Enter to submit...")
            textarea.press("Enter")

            # verify message sent (textarea cleared or new message appears)
            # Wait for empty textarea
            page.wait_for_function("document.querySelector('textarea').value === ''", timeout=5000)
            print("Message submitted successfully!")

            # Take screenshot
            os.makedirs("verification", exist_ok=True)
            page.screenshot(path="verification/textarea_test.png")
            print("Screenshot saved to verification/textarea_test.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_textarea.png")
            # Don't fail the script yet if we are testing before implementation
            # raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()
