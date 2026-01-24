from playwright.sync_api import Page, expect, sync_playwright

def test_2026_fixtures(page: Page):
    # 1. Go to homepage
    page.goto("http://localhost:8080/")

    # 2. Check for 2026 link
    # The homepage lists competitions. I expect "2026" to be visible.
    link_2026 = page.get_by_role("link", name="2026")
    expect(link_2026).to_be_visible()

    # 3. Click it
    link_2026.click()

    # 4. Verify we are on the 2026 page
    # The URL should contain /2026/
    expect(page).to_have_url("http://localhost:8080/2026/")

    # 5. Verify some fixtures are present
    expect(page.get_by_text("France v Ireland")).to_be_visible()
    expect(page.get_by_text("Italy v Scotland")).to_be_visible()
    expect(page.get_by_text("England v Wales")).to_be_visible()

    # 6. Take screenshot
    page.screenshot(path="verification/verification.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_2026_fixtures(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"Verification script failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
