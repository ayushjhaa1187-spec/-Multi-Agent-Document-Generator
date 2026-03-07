from playwright.sync_api import Page, expect, sync_playwright
import time

def test_textarea(page: Page):
    page.goto("http://localhost:3000")

    # Wait for the project name input
    project_input = page.locator('input[placeholder="Enter your project name (e.g., E-Commerce Platform)..."]')
    project_input.fill("Test Project for UX")

    # Submit project name
    page.locator('button', has_text="Continue to Project Details").click()

    # Wait for the chat to be ready and the textarea to appear
    textarea = page.locator('textarea[aria-label="Chat input"]')
    expect(textarea).to_be_visible(timeout=10000)

    # Fill with single line text
    textarea.fill("This is a single line of text.")
    time.sleep(1) # wait for resize

    # Fill with multiline text
    textarea.fill("This is a multiline text.\nLine 2.\nLine 3.\nLine 4.")
    time.sleep(1) # wait for resize

    # Take screenshot of multiline
    page.screenshot(path="verification/textarea_multiline.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_textarea(page)
        finally:
            browser.close()
