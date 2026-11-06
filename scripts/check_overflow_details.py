import sys
if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/', wait_until='networkidle')

    for w in [375, 390, 430, 1024, 1280, 1440]:
        page.set_viewport_size({"width": w, "height": 800})
        page.wait_for_timeout(300)
        
        res = page.evaluate('''(w) => {
            const doc = document.documentElement;
            const body = document.body;
            const scrollW = doc.scrollWidth;
            const clientW = doc.clientWidth;
            const innerW = window.innerWidth;
            const hasHScroll = scrollW > innerW || body.scrollWidth > innerW;
            
            // Check real scrollbar existence
            const overflowX = window.getComputedStyle(doc).overflowX;
            const bodyOverflowX = window.getComputedStyle(body).overflowX;
            
            // Elements with rect.right > innerW + 1 or rect.left < -1
            const elements = Array.from(document.querySelectorAll('*'));
            const offenders = [];
            for (const el of elements) {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) {
                    if (r.right > innerW + 1) {
                        offenders.push({
                            type: 'RIGHT_OVERFLOW',
                            tag: el.tagName.toLowerCase(),
                            id: el.id,
                            cls: (el.className || '').toString().slice(0, 40),
                            diff: Math.round(r.right - innerW),
                            right: Math.round(r.right),
                            parent: el.parentElement ? el.parentElement.tagName.toLowerCase() : null,
                            parentOverflow: el.parentElement ? window.getComputedStyle(el.parentElement).overflow : null
                        });
                    }
                    if (r.left < -1) {
                        offenders.push({
                            type: 'LEFT_UNDERFLOW',
                            tag: el.tagName.toLowerCase(),
                            id: el.id,
                            cls: (el.className || '').toString().slice(0, 40),
                            left: Math.round(r.left)
                        });
                    }
                }
            }
            return {
                w,
                innerW,
                clientW,
                scrollW,
                bodyScrollW: body.scrollWidth,
                hasHScroll,
                overflowX,
                bodyOverflowX,
                offendersCount: offenders.length,
                offenders: offenders.slice(0, 10)
            };
        }''', w)
        
        print(f"Viewport {w}px: scrollW={res['scrollW']}, clientW={res['clientW']}, innerW={res['innerW']}, hasHScroll={res['hasHScroll']}")
        if res['offenders']:
            print(f"  Total offenders: {res['offendersCount']}")
            for o in res['offenders']:
                print(f"    {o['type']}: <{o['tag']} id='{o['id']}' class='{o['cls']}'> (diff={o.get('diff')}, left={o.get('left')}, parent={o.get('parent')}, parentOverflow={o.get('parentOverflow')})")
        else:
            print("  No offenders at all!")
            
    browser.close()
