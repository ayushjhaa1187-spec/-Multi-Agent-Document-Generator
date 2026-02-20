import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        # Grant clipboard permissions
        context.grant_permissions(['clipboard-read', 'clipboard-write'])

        page = context.new_page()

        # Log console messages
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

        # Mock the API response
        def handle_route(route):
            print("Intercepting /api/chat")
            route.fulfill(
                status=200,
                body='0:"Hello! This is a mocked response to test the Copy Button."\n',
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

            # Send a message to get a response
            print("Sending message...")
            page.fill("textarea[placeholder*='Describe your requirements']", "I need a simple to-do list app.")
            page.click("button:has-text('Send')")

            # Wait for AI response
            print("Waiting for AI response...")
            page.wait_for_selector("button[aria-label='Copy to clipboard']", timeout=30000)
            print("Copy button found!")

            # Click the copy button
            print("Clicking copy button...")
            page.click("button[aria-label='Copy to clipboard']")

            # Wait for "Copied" state (by aria-label or title)
            # The component changes aria-label to "Copied"
            page.wait_for_selector("button[aria-label='Copied']", timeout=5000)
            print("Copy button clicked and state changed!")

            # Take screenshot
            os.makedirs("verification", exist_ok=True)
            page.screenshot(path="verification/copy_button_test.png")
            print("Screenshot saved to verification/copy_button_test.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
