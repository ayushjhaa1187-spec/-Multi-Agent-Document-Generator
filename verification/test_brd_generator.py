import os
import time
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Log console messages
        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

        # State management for mocking
        mock_state = {"stage": "clarify"}

        def handle_route(route):
            print(f"Intercepting /api/chat for stage: {mock_state['stage']}")

            if mock_state['stage'] == "clarify":
                # Mock Clarification Response
                route.fulfill(
                    status=200,
                    body='0:"Hello! To help me generate the BRD, could you clarify the user roles?"\n',
                    headers={'Content-Type': 'text/plain; charset=utf-8', 'X-Vercel-AI-Data-Stream': 'v1'}
                )
            elif mock_state['stage'] == "transition":
                 # Mock Generation Response (contains 'requirement' keyword)
                 route.fulfill(
                    status=200,
                    body='0:"Based on your input, here is a requirement list..."\n',
                    headers={'Content-Type': 'text/plain; charset=utf-8', 'X-Vercel-AI-Data-Stream': 'v1'}
                )
            else:
                route.continue_()

        # Intercept API calls
        page.route("**/api/chat", handle_route)

        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000")

            # --- Test 1: Project Name Validation ---
            print("\n--- Test 1: Project Name Validation ---")

            # Short name (< 3 chars)
            print("Testing short name 'ab'...")
            page.fill("input[placeholder*='Enter your project name']", "ab")
            # Verify button is disabled
            submit_btn = page.locator("button[type='submit']")
            if not submit_btn.is_disabled():
                raise Exception("Submit button should be disabled for short name (< 3 chars)")
            print("Verified: Submit disabled for short name")

            # Valid name (3-100 chars)
            print("Testing valid name 'Test Project'...")
            page.fill("input[placeholder*='Enter your project name']", "Test Project")
            # Verify button is enabled
            if submit_btn.is_disabled():
                 raise Exception("Submit button should be enabled for valid name")
            print("Verified: Submit enabled for valid name")

            # Submit form
            print("Submitting project name...")
            submit_btn.click()

            # Verify chat interface appears
            page.wait_for_selector("text=Current Project", timeout=5000)
            print("Verified: Chat interface loaded")

            # Verify initial stage is Clarification
            clarify_badge = page.locator("span:has-text('1️⃣ Clarification')")
            # Check for active style (yellow background)
            if 'bg-yellow-500/30' not in clarify_badge.get_attribute('class'):
                 raise Exception("Initial stage should be 'Clarification' (active)")
            print("Verified: Initial stage is 'Clarification'")


            # --- Test 2: Chat Interaction ---
            print("\n--- Test 2: Chat Interaction ---")
            print("Sending message 'I want a blog.'...")
            page.fill("input[placeholder*='Describe your requirements']", "I want a blog.")
            page.click("button:has-text('Send')")

            # Wait for response
            page.wait_for_selector("text=Hello! To help me generate", timeout=5000)
            print("Verified: Received clarification response from mock API")


            # --- Test 3: Stage Transition ---
            print("\n--- Test 3: Stage Transition ---")
            # Update mock state to trigger transition
            mock_state["stage"] = "transition"

            print("Sending message to trigger transition...")
            page.fill("input[placeholder*='Describe your requirements']", "Users can post comments.")
            page.click("button:has-text('Send')")

            # Wait for response containing "requirement"
            page.wait_for_selector("text=requirement list", timeout=5000)

            # Verify stage change to Generation
            print("Verifying stage transition to 'Generation'...")
            # Wait for the element with the green background class
            # We escape the slash in the class name: bg-green-500/30 -> bg-green-500\/30
            # Playwright selector needs double backslash for escaping in string
            page.wait_for_selector("span.bg-green-500\\/30:has-text('2️⃣ Generation')", timeout=10000)
            print("Verified: Stage transitioned to 'Generation' (active)")

            print("\nAll tests passed successfully! ✅")

        except Exception as e:
            print(f"\nTest Failed: {e} ❌")
            os.makedirs("verification", exist_ok=True)
            page.screenshot(path="verification/test_failure.png")
            print("Screenshot saved to verification/test_failure.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()
