from playwright.sync_api import sync_playwright

def verify_chat_input(page):
    page.goto("http://localhost:3000")

    # Wait for the project name form to appear and fill it
    project_input = page.locator("input[placeholder*='project name']")
    project_input.fill("Test Project")
    page.locator("button[type='submit']").click()

    # Wait for the chat input to appear
    chat_input = page.locator("textarea[placeholder*='Describe your requirements']")
    chat_input.wait_for()

    # Take a screenshot to verify the multi-line textarea and character counter
    page.screenshot(path="verification/chat_input_empty.png")

    # Fill in some text to see the counter update
    chat_input.fill("This is a test requirement.\nIt has multiple lines.")
    page.screenshot(path="verification/chat_input_filled.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_chat_input(page)
            print("Screenshots taken successfully.")
        finally:
            browser.close()
