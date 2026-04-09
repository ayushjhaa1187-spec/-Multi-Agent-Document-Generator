from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Enter project name
        page.locator('input[placeholder="Enter your project name (e.g., E-Commerce Platform)..."]').fill("Test Project")
        page.locator('button:has-text("Continue to Project Details")').click()

        # Wait for chat interface
        page.wait_for_selector('textarea[aria-label="Chat message"]')

        textarea = page.locator('textarea[aria-label="Chat message"]')

        # Take initial screenshot
        textarea.screenshot(path="verification/textarea_initial.png")

        # Type multi-line text
        textarea.fill("Line 1\nLine 2\nLine 3\nLine 4\nLine 5")

        # Take screenshot after resize
        page.screenshot(path="verification/textarea_resized.png")

        browser.close()

if __name__ == "__main__":
    verify()
