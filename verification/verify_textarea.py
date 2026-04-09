import asyncio
from playwright.async_api import async_playwright
import time

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Navigate to dev server
        await page.goto('http://localhost:3000')

        # Enter project name
        await page.fill('input[placeholder="Enter your project name (e.g., E-Commerce Platform)..."]', 'Test Project')
        await page.click('button:text("Continue to Project Details →")')

        # Wait for chat UI to load
        await page.wait_for_selector('textarea[aria-label="Chat input"]')

        # Test auto-resizing
        textarea = page.locator('textarea[aria-label="Chat input"]')

        # Take screenshot before text
        await page.screenshot(path='verification/textarea_empty.png')

        # Type multi-line text
        await textarea.fill('First line\nSecond line\nThird line')

        # Take screenshot after text
        await page.screenshot(path='verification/textarea_filled.png')

        await browser.close()
        print("Playwright test completed. Screenshots saved in verification/")

if __name__ == '__main__':
    asyncio.run(verify())
