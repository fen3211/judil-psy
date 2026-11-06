import sys
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/', wait_until='networkidle')
    
    # Scroll through the entire page slowly to trigger lazy loading
    page.evaluate('''async () => {
        const distance = 400;
        const delay = 100;
        while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
            document.scrollingElement.scrollBy(0, distance);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }''')
    page.wait_for_timeout(1000)
    
    imgs = page.evaluate('''() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete
        }));
    }''')
    
    print(f"Total imgs: {len(imgs)}")
    all_ok = True
    for img in imgs:
        nw = img['naturalWidth']
        nh = img['naturalHeight']
        comp = img['complete']
        src = img['src']
        print(f"  {nw}x{nh} (complete={comp}) -> {src}")
        if nw == 0 or not comp:
            all_ok = False
            
    print(f"All images loaded properly: {all_ok}")
    browser.close()
