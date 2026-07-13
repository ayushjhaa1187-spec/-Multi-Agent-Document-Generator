from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(500)

    # Wait for the project name input to be visible and interact with it
    project_input = page.get_by_label("📋 Project Name")
    project_input.wait_for(state="visible")
    project_input.fill("A11y Test Project")
    page.wait_for_timeout(500)

    # Take screenshot of the initial state
    page.screenshot(path="verification/screenshots/verification.png")

    # Submit the form
    page.get_by_role("button", name="Continue to Project Details →").click()
    page.wait_for_timeout(1000)

    # Wait for chat input
    chat_input = page.get_by_label("Chat message")
    chat_input.wait_for(state="visible")
    chat_input.fill("We need to ensure it is accessible.")
    page.wait_for_timeout(500)

    # Submit chat
    page.get_by_role("button", name="📤 Send").click()
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/screenshots/error.png")
        finally:
            context.close()
            browser.close()
