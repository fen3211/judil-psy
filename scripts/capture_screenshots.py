import sys
from playwright.sync_api import sync_playwright

def capture(stage="before"):
    out_dir = f"d:/Projects/judil-psy/screenshots/{stage}"
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # Desktop
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("http://localhost:4173/", wait_until="networkidle")
        page.wait_for_timeout(1000)
        page.screenshot(path=f"{out_dir}/desktop_viewport.png", full_page=False)
        page.screenshot(path=f"{out_dir}/desktop_full.png", full_page=True)
        print(f"Desktop screenshots captured for {stage}")
        page.close()
        
        # Mobile (iPhone 14 / 390px)
        mobile_page = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True)
        mobile_page.goto("http://localhost:4173/", wait_until="networkidle")
        mobile_page.wait_for_timeout(1000)
        mobile_page.screenshot(path=f"{out_dir}/mobile_viewport.png", full_page=False)
        mobile_page.screenshot(path=f"{out_dir}/mobile_full.png", full_page=True)
        print(f"Mobile screenshots captured for {stage}")
        mobile_page.close()
        
        browser.close()

if __name__ == "__main__":
    stage = sys.argv[1] if len(sys.argv) > 1 else "before"
    capture(stage)
