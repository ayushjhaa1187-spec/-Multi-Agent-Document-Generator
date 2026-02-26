import time
from playwright.sync_api import sync_playwright

def verify_textarea_change():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Navigate to the home page
            print("Navigating to http://localhost:3000")
            page.goto("http://localhost:3000")

            # Wait for the project name input to appear
            print("Waiting for project name input")
            page.wait_for_selector('input[placeholder*="Enter your project name"]', state="visible", timeout=10000)

            # Fill in a project name to proceed to the chat interface
            print("Filling project name")
            page.fill('input[placeholder*="Enter your project name"]', "Test Project")

            # Click the continue button
            print("Clicking continue button")
            page.click('button:has-text("Continue to Project Details")')

            # Wait for the chat interface to load
            print("Waiting for chat interface")
            # We look for the textarea we just added
            page.wait_for_selector('textarea[placeholder*="Describe your requirements"]', state="visible", timeout=10000)

            # Verify the element is a textarea
            is_textarea = page.eval_on_selector('textarea[placeholder*="Describe your requirements"]', 'el => el.tagName === "TEXTAREA"')
            print(f"Is element a textarea? {is_textarea}")

            if not is_textarea:
                raise Exception("Chat input is not a textarea!")

            # Fill some text to show multi-line capability
            print("Filling textarea with multi-line text")
            page.fill('textarea[placeholder*="Describe your requirements"]', "First line of requirements.\nSecond line of requirements.")

            # Take a screenshot
            print("Taking screenshot")
            page.screenshot(path="verification/textarea_verification.png")
            print("Screenshot saved to verification/textarea_verification.png")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="verification/error_screenshot.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    verify_textarea_change()
