from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # We need the dev server running, but since we are just checking if the memoization broke the UI,
        # we can start the dev server, wait a bit, then take a screenshot.

        # Actually, let's start the dev server in the background first.
        # But this script runs synchronously. We should start the server before running this.

        try:
            page.goto("http://localhost:3000")

            # Wait for the main input to be visible
            page.wait_for_selector('input[placeholder="Enter your project name (e.g., E-Commerce Platform)..."]', timeout=10000)

            # Fill the input
            page.fill('input[placeholder="Enter your project name (e.g., E-Commerce Platform)..."]', "Test Project")

            # Click the submit button
            page.click('button[type="submit"]')

            # Wait for the chat interface to load
            page.wait_for_selector('text="Current Project"', timeout=10000)

            # Take a screenshot
            page.screenshot(path="verification.png")
            print("Screenshot saved to verification.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify()
