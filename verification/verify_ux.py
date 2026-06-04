from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(500)

    # 1. Enter project name
    page.get_by_role("textbox").fill("UX Test Project")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Continue to Project Details →").click()
    page.wait_for_timeout(1500) # Wait for animation/transition

    # 2. Enter a message to ensure `messages.length > 0`
    # Mocking a fast response or simply checking that input becomes a message
    page.get_by_placeholder("Describe your requirements in detail...").fill("I need a login page.")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="📤 Send").click()
    page.wait_for_timeout(2000) # wait for message to appear

    # 3. Handle the window.confirm dialog automatically
    def handle_dialog(dialog):
        print(f"Dialog message: {dialog.message}")
        dialog.accept() # Accept the confirmation

    page.on("dialog", handle_dialog)

    # 4. Click the "Change Project" button to trigger the dialog
    page.get_by_role("button", name="Change project and clear conversation").click()
    page.wait_for_timeout(1000)

    # Take screenshot of the result (it should return to the first screen)
    page.screenshot(path="verification/screenshots/verification.png")
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
        finally:
            context.close()
            browser.close()
