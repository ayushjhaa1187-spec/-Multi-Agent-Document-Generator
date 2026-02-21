from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Check Project Name Input Accessibility
        print("Checking Project Name Input Accessibility...")
        project_name_input = page.locator("#project-name-input")
        expect(project_name_input).to_be_visible()

        # Check Label association
        label = page.locator("label[for='project-name-input']")
        expect(label).to_be_visible()
        print("Project Name Input Accessibility Verified.")

        # Take screenshot of initial state
        page.screenshot(path="verification/initial_state.png")

        # Submit Project Name to reach Chat Interface
        print("Submitting Project Name...")
        project_name_input.fill("Test Project")
        page.click("button[type='submit']")

        # Check Chat Input Accessibility
        print("Checking Chat Input Accessibility...")
        # Wait for chat interface to appear
        chat_input = page.locator("input[aria-label='Chat message input']")
        expect(chat_input).to_be_visible()
        print("Chat Input Accessibility Verified.")

        # Take screenshot of chat interface
        page.screenshot(path="verification/chat_interface.png")

        browser.close()

if __name__ == "__main__":
    run()
