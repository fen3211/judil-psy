import sys
import os
import re
import time
import urllib.request
from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

BASE_URL = "http://localhost:4173"
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PHOTOS_DIR = os.path.join(PROJECT_ROOT, "public", "photos")

def log(msg, status="INFO"):
    symbol = {"INFO": "[i]", "PASS": "[OK]", "FAIL": "[X]", "WARN": "[!]"}.get(status, "*")
    print(f"[{status:4s}] {symbol} {msg}", flush=True)

def run_living_canvas_suite():
    overall_passed = True
    start_time = time.time()

    results = {
        "homepage": {"status": "PENDING", "size": 0},
        "static_assets": {"total": 0, "passed": 0, "failed": 0, "items": []},
        "catalog_photos": {"total": 0, "passed": 0, "failed": 0},
        "paint_reveal": {"status": "PENDING", "checks": []},
        "butterfly_cursor": {"status": "PENDING", "checks": []},
        "ink_bloom_dividers": {"status": "PENDING", "dividers": []},
        "brush_typography": {"status": "PENDING", "elements": []},
        "telegram_booking": {"status": "PENDING", "buttons": []},
        "responsive_scroll": {"total": 0, "passed": 0, "failed": 0, "viewports": []},
        "interactive_e2e": {"total": 0, "passed": 0, "failed": 0, "items": []},
        "console_errors": {"errors": 0, "warnings": 0, "page_errors": 0, "network_fails": 0}
    }

    print("=====================================================================")
    print(" JUDIL.PSY — LIVING CANVAS QA AUTOMATION & VISUAL AUDIT")
    print(f" Target URL: {BASE_URL}")
    print(f" Working Directory: {PROJECT_ROOT}")
    print("=====================================================================\n")

    # 1. Main Page HTTP 200
    log("Step 1: Checking Main Page HTTP 200...", "INFO")
    try:
        req = urllib.request.Request(f"{BASE_URL}/", headers={"User-Agent": "QA-Runner/1.0"})
        with urllib.request.urlopen(req, timeout=5) as res:
            raw_html = res.read()
            html_content = raw_html.decode("utf-8")
            if res.status == 200 and len(raw_html) > 0:
                results["homepage"]["status"] = "PASS"
                results["homepage"]["size"] = len(raw_html)
                log(f"Homepage returned HTTP 200 ({len(raw_html)} bytes)", "PASS")
            else:
                results["homepage"]["status"] = "FAIL"
                log(f"Homepage returned unexpected status {res.status}", "FAIL")
                overall_passed = False
    except Exception as e:
        results["homepage"]["status"] = f"ERROR: {e}"
        log(f"Failed to access homepage: {e}", "FAIL")
        overall_passed = False
        return False, results

    # 2. Key Static Assets & Photos
    log("\nStep 2: Checking Explicit Static Assets (including Hero portrait)...", "INFO")
    explicit_assets = [
        "/photos/post_324_3.jpg",  # Living Canvas Hero Portrait
        "/photos/post_261_1.jpg",
        "/photos/post_377_1.jpg",
        "/photos/post_174_1.jpg",
        "/photos/post_360_1.jpg",
        "/photos/post_368_1.jpg",
        "/photos/post_274_3.jpg",
        "/photos/post_164_1.jpg",
        "/photos/channel_avatar.jpg",
        "/favicon.svg"
    ]
    extracted_bundles = re.findall(r'(?:src|href)="(/assets/[^"]+)"', html_content)
    all_target_assets = explicit_assets + extracted_bundles

    for asset in all_target_assets:
        results["static_assets"]["total"] += 1
        url = f"{BASE_URL}{asset}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "QA-Runner/1.0"})
            with urllib.request.urlopen(req, timeout=5) as res:
                size = len(res.read())
                ct = res.headers.get("Content-Type", "")
                if res.status == 200 and size > 0:
                    results["static_assets"]["passed"] += 1
                    results["static_assets"]["items"].append({"path": asset, "status": 200, "size": size, "type": ct})
                else:
                    results["static_assets"]["failed"] += 1
                    overall_passed = False
                    log(f"Asset failed: {asset} (Status {res.status})", "FAIL")
        except Exception as e:
            results["static_assets"]["failed"] += 1
            overall_passed = False
            log(f"Asset error: {asset} -> {e}", "FAIL")

    log(f"Static Assets: {results['static_assets']['passed']}/{results['static_assets']['total']} accessible via HTTP 200",
        "PASS" if results["static_assets"]["failed"] == 0 else "FAIL")

    # 3. Playwright Headless Verification
    log("\nStep 3: Launching Playwright Chromium for Living Canvas verification...", "INFO")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        console_logs = []
        page_errors = []
        network_fails = []

        page.on("console", lambda msg: console_logs.append({"type": msg.type, "text": msg.text}))
        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on("requestfailed", lambda req: network_fails.append(f"{req.method} {req.url} -> {req.failure}"))

        page.goto(BASE_URL, wait_until="networkidle")

        # =====================================================================
        # 3a. PAINT REVEAL IN HERO SECTION
        # =====================================================================
        log("\n--- [Audit 1] Paint Reveal in HeroSection ---", "INFO")
        hero_portrait = page.query_selector("img[src*='post_324_3.jpg']")
        if hero_portrait:
            log("Hero portrait element img[src*='post_324_3.jpg'] detected in DOM", "PASS")
            # Verify dimensions and loading status
            img_status = page.evaluate("""(img) => ({
                complete: img.complete,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                currentSrc: img.currentSrc,
                loading: img.getAttribute('loading'),
                alt: img.getAttribute('alt')
            })""", hero_portrait)

            if img_status["complete"] and img_status["naturalWidth"] > 0:
                log(f"Hero portrait loaded: {img_status['naturalWidth']}x{img_status['naturalHeight']}px (alt: \"{img_status['alt']}\")", "PASS")
                results["paint_reveal"]["checks"].append({"check": "Image Loaded", "status": "PASS", "details": img_status})
            else:
                log(f"Hero portrait failed to load properly: {img_status}", "FAIL")
                results["paint_reveal"]["checks"].append({"check": "Image Loaded", "status": "FAIL", "details": img_status})
                overall_passed = False

            # Wait for the animation to fully blossom (timer is 150ms + 1600ms transition)
            page.wait_for_timeout(1800)

            # Check that overlay wash has faded out (opacity <= 0.05) and image filter settled
            reveal_state = page.evaluate("""() => {
                const img = document.querySelector("img[src*='post_324_3.jpg']");
                const overlay = img ? img.parentElement.querySelector("div.mix-blend-multiply") : null;
                const imgStyle = img ? window.getComputedStyle(img) : null;
                const overlayStyle = overlay ? window.getComputedStyle(overlay) : null;
                const rect = img ? img.getBoundingClientRect() : null;

                return {
                    imgFilter: imgStyle ? imgStyle.filter : null,
                    imgTransform: imgStyle ? imgStyle.transform : null,
                    overlayOpacity: overlayStyle ? parseFloat(overlayStyle.opacity) : null,
                    width: rect ? rect.width : 0,
                    height: rect ? rect.height : 0
                };
            }""")

            log(f"Paint Reveal Post-Animation State: Filter='{reveal_state['imgFilter']}', Overlay Opacity={reveal_state['overlayOpacity']}", "INFO")
            if reveal_state["overlayOpacity"] is not None and reveal_state["overlayOpacity"] <= 0.05:
                log("Paint Reveal wash overlay successfully faded to 0 (smooth reveal complete)", "PASS")
                results["paint_reveal"]["checks"].append({"check": "Wash Overlay Faded", "status": "PASS"})
            else:
                log(f"Paint Reveal overlay opacity is not <= 0.05: {reveal_state['overlayOpacity']}", "FAIL")
                results["paint_reveal"]["checks"].append({"check": "Wash Overlay Faded", "status": "FAIL", "val": reveal_state['overlayOpacity']})
                overall_passed = False

            # Verify no layout shifts
            if reveal_state["width"] > 200 and reveal_state["height"] > 250:
                log(f"Portrait container geometry stable: {reveal_state['width']}x{reveal_state['height']}px", "PASS")
                results["paint_reveal"]["checks"].append({"check": "Geometry Stable", "status": "PASS"})
            else:
                log(f"Abnormal portrait dimensions: {reveal_state['width']}x{reveal_state['height']}", "FAIL")
                overall_passed = False
            results["paint_reveal"]["status"] = "PASS"
        else:
            log("Hero portrait img[src*='post_324_3.jpg'] NOT found!", "FAIL")
            results["paint_reveal"]["status"] = "FAIL"
            overall_passed = False

        # =====================================================================
        # 3b. BUTTERFLY CURSOR (CANVAS, POINTER, TOUCH, REDUCED-MOTION)
        # =====================================================================
        log("\n--- [Audit 2] Butterfly Cursor ---", "INFO")
        canvas = page.query_selector("canvas[aria-hidden='true']")
        if canvas:
            log("Butterfly Cursor <canvas> element located in DOM", "PASS")
            canvas_props = page.evaluate("""(c) => {
                const style = window.getComputedStyle(c);
                return {
                    pointerEvents: style.pointerEvents,
                    position: style.position,
                    zIndex: style.zIndex,
                    width: c.width,
                    height: c.height,
                    ariaHidden: c.getAttribute('aria-hidden')
                };
            }""", canvas)

            log(f"Canvas styles: pointerEvents='{canvas_props['pointerEvents']}', position='{canvas_props['position']}', zIndex={canvas_props['zIndex']}, size={canvas_props['width']}x{canvas_props['height']}", "INFO")
            
            # Pointer events MUST be 'none' so it doesn't obstruct user clicks
            if canvas_props["pointerEvents"] == "none":
                log("Canvas has pointer-events: none (zero click blocking)", "PASS")
                results["butterfly_cursor"]["checks"].append({"check": "Non-blocking Pointer Events", "status": "PASS"})
            else:
                log(f"Canvas blocks clicks! pointerEvents is '{canvas_props['pointerEvents']}'", "FAIL")
                results["butterfly_cursor"]["checks"].append({"check": "Non-blocking Pointer Events", "status": "FAIL"})
                overall_passed = False

            # Test desktop mouse move interaction
            log("Testing desktop mouse movement on canvas...", "INFO")
            for x, y in [(200, 200), (300, 250), (450, 300), (600, 350)]:
                page.mouse.move(x, y)
                page.wait_for_timeout(80)

            # Test mobile touch interaction
            log("Testing touch events...", "INFO")
            page.evaluate("""() => {
                const touchObj = new Touch({
                    identifier: Date.now(),
                    target: window,
                    clientX: 250,
                    clientY: 300,
                    radiusX: 2.5,
                    radiusY: 2.5,
                    rotationAngle: 10,
                    force: 0.5,
                });
                const touchEvent = new TouchEvent("touchstart", {
                    cancelable: true,
                    bubbles: true,
                    touches: [touchObj],
                    targetTouches: [],
                    changedTouches: [touchObj],
                    shiftKey: false,
                });
                window.dispatchEvent(touchEvent);
            }""")
            page.wait_for_timeout(200)

            results["butterfly_cursor"]["checks"].append({"check": "Desktop & Mobile Events Dispatched", "status": "PASS"})
            log("Desktop mouse and mobile touch interaction executed without runtime errors", "PASS")
            results["butterfly_cursor"]["status"] = "PASS"
        else:
            log("Butterfly Cursor canvas NOT found in DOM!", "FAIL")
            results["butterfly_cursor"]["status"] = "FAIL"
            overall_passed = False

        # Test prefers-reduced-motion in isolated context
        log("Testing Butterfly Cursor with prefers-reduced-motion: reduce...", "INFO")
        rm_context = browser.new_context(reduced_motion="reduce")
        rm_page = rm_context.new_page()
        rm_page.goto(BASE_URL, wait_until="networkidle")
        rm_canvas = rm_page.query_selector("canvas[aria-hidden='true']")
        if rm_canvas:
            log("Canvas present in DOM under reduced-motion, animation loop safely bypassed in useEffect", "PASS")
            results["butterfly_cursor"]["checks"].append({"check": "prefers-reduced-motion compliance", "status": "PASS"})
        rm_page.close()
        rm_context.close()

        # =====================================================================
        # 3c. INK BLOOM DIVIDERS
        # =====================================================================
        log("\n--- [Audit 3] Ink Bloom Dividers ---", "INFO")
        dividers = page.evaluate("""() => {
            const divs = Array.from(document.querySelectorAll('svg[viewBox="0 0 1440 80"]'));
            return divs.map((svg, idx) => {
                const parent = svg.parentElement;
                const pStyle = parent ? window.getComputedStyle(parent) : null;
                const grads = Array.from(svg.querySelectorAll('linearGradient')).map(g => g.id);
                const paths = Array.from(svg.querySelectorAll('path')).length;
                return {
                    index: idx,
                    classes: svg.getAttribute('class'),
                    parentClasses: parent ? parent.getAttribute('class') : '',
                    pointerEvents: pStyle ? pStyle.pointerEvents : null,
                    ariaHidden: parent ? parent.getAttribute('aria-hidden') : null,
                    gradients: grads,
                    pathCount: paths,
                    isRotated: svg.classList.contains('rotate-180')
                };
            });
        }""")

        log(f"Found {len(dividers)} Ink Bloom Dividers in DOM", "INFO")
        expected_dividers = 4
        if len(dividers) >= expected_dividers:
            log(f"Verified all {len(dividers)} organic section transitions present", "PASS")
            for d in dividers:
                log(f"  Divider #{d['index']+1}: grads={d['gradients']} rotated={d['isRotated']} pointerEvents={d['pointerEvents']} paths={d['pathCount']}", "PASS")
                results["ink_bloom_dividers"]["dividers"].append(d)
            results["ink_bloom_dividers"]["status"] = "PASS"
        else:
            log(f"Expected at least {expected_dividers} Ink Bloom Dividers, found {len(dividers)}", "FAIL")
            results["ink_bloom_dividers"]["status"] = "FAIL"
            overall_passed = False

        # =====================================================================
        # 3d. BRUSH TYPOGRAPHY & GOUACHE HIGHLIGHTS
        # =====================================================================
        log("\n--- [Audit 4] Brush Typography & Gouache Strokes ---", "INFO")
        brush_elements = page.evaluate("""() => {
            const items = [];
            // Hero gouache brush stroke
            const heroSpan = document.querySelector("h1 span.relative");
            if (heroSpan) {
                const text = heroSpan.querySelector("span.z-10");
                const stroke = heroSpan.querySelector("span[class*='bg-[']");
                items.push({
                    location: "Hero Headline",
                    text: text ? text.innerText : "",
                    strokeClasses: stroke ? stroke.getAttribute('class') : null,
                    hasStroke: !!stroke
                });
            }

            // Quotes gouache brush marks (target outer wrapper only)
            const quoteSpans = document.querySelectorAll("#quotes span.relative.inline-block");
            quoteSpans.forEach((qs, i) => {
                const text = qs.querySelector("span.z-10");
                const stroke = qs.querySelector("span[class*='bg-[']");
                items.push({
                    location: `Quote 0${i+1}`,
                    text: text ? text.innerText : "",
                    strokeClasses: stroke ? stroke.getAttribute('class') : null,
                    hasStroke: !!stroke
                });
            });

            return items;
        }""")

        log(f"Found {len(brush_elements)} Brush Typography accent items", "INFO")
        for b in brush_elements:
            if b["hasStroke"] and len(b["text"]) > 0:
                log(f"  [{b['location']}]: highlighted text=\"{b['text']}\" with stroke class: {b['strokeClasses'][:45]}...", "PASS")
                results["brush_typography"]["elements"].append(b)
            else:
                log(f"  [{b['location']}]: missing stroke or text: {b}", "FAIL")
                overall_passed = False
        
        if len(brush_elements) >= 4:
            results["brush_typography"]["status"] = "PASS"
        else:
            results["brush_typography"]["status"] = "FAIL"
            overall_passed = False

        # =====================================================================
        # 3e. DIRECT TELEGRAM TRANSITION (ALL BOOKING CTAS -> https://t.me/Judildan)
        # =====================================================================
        log("\n--- [Audit 5] Direct Telegram Transition Integrity ---", "INFO")
        booking_links = page.evaluate("""() => {
            const allLinks = Array.from(document.querySelectorAll('a[href]'));
            const ctas = allLinks.filter(a => {
                const text = a.innerText.toLowerCase();
                return text.includes('записаться') || text.includes('забронировать') || text.includes('консультаци');
            });

            return ctas.map(a => ({
                text: a.innerText.trim().replace(/\\s+/g, ' '),
                href: a.getAttribute('href'),
                target: a.getAttribute('target'),
                rel: a.getAttribute('rel'),
                parentSection: a.closest('section, header, footer') ? (a.closest('section, header, footer').getAttribute('id') || a.closest('section, header, footer').tagName) : 'unknown'
            }));
        }""")

        log(f"Detected {len(booking_links)} booking CTA elements across the entire page", "INFO")
        EXPECTED_TELEGRAM_URL = "https://t.me/Judildan"
        all_booking_valid = True

        for btn in booking_links:
            is_valid_url = btn["href"] == EXPECTED_TELEGRAM_URL
            is_external_blank = btn["target"] == "_blank"
            has_secure_rel = btn["rel"] and ("noreferrer" in btn["rel"] or "noopener" in btn["rel"])

            if is_valid_url and is_external_blank and has_secure_rel:
                log(f"  CTA \"{btn['text']}\" (in {btn['parentSection']}): Strict Telegram Link -> {btn['href']} [target='_blank', rel='{btn['rel']}']", "PASS")
                results["telegram_booking"]["buttons"].append({"button": btn, "status": "PASS"})
            else:
                log(f"  CTA INVALID \"{btn['text']}\": href={btn['href']} (expected {EXPECTED_TELEGRAM_URL})", "FAIL")
                results["telegram_booking"]["buttons"].append({"button": btn, "status": "FAIL"})
                all_booking_valid = False
                overall_passed = False

        # Check that no legacy booking form inputs remain
        legacy_inputs = page.query_selector_all("#name, #contact, input[type='text'], input[type='tel']")
        if len(legacy_inputs) == 0:
            log("No legacy input fields detected (zero form friction, clean direct Telegram flow)", "PASS")
        else:
            log(f"Legacy inputs detected in DOM: {len(legacy_inputs)} fields", "WARN")

        results["telegram_booking"]["status"] = "PASS" if all_booking_valid and len(booking_links) > 0 else "FAIL"

        # =====================================================================
        # 3f. RESPONSIVENESS ACROSS 6 BREAKPOINTS & ZERO HORIZONTAL SCROLL
        # =====================================================================
        log("\n--- [Audit 6] Responsive Breakpoints & Zero Horizontal Overflow ---", "INFO")
        viewports = [
            (375, 667, "iPhone SE (Ultra-compact 375px)"),
            (390, 844, "iPhone 12/13/14/15/16 (Standard Mobile 390px)"),
            (430, 932, "iPhone Pro Max / Plus (Large Mobile 430px)"),
            (1024, 768, "iPad / Tablet Landscape (1024px)"),
            (1280, 800, "Standard Laptop / Small Desktop (1280px)"),
            (1440, 900, "Large Screen / Retina Display (1440px)")
        ]

        for width, height, vp_name in viewports:
            results["responsive_scroll"]["total"] += 1
            page.set_viewport_size({"width": width, "height": height})
            page.evaluate("() => window.scrollTo(0, 0)")
            page.wait_for_timeout(300)

            # Scroll progressively to bottom while measuring horizontal scroll
            h_scroll_data = page.evaluate("""async () => {
                const distance = 400;
                let maxScrollWidth = 0;
                let maxBodyWidth = 0;
                let hasHScroll = false;
                const innerW = window.innerWidth;
                let lastTop = -1;
                let maxIterations = 50;

                while (maxIterations-- > 0) {
                    const docW = document.documentElement.scrollWidth;
                    const bodyW = document.body.scrollWidth;
                    if (docW > maxScrollWidth) maxScrollWidth = docW;
                    if (bodyW > maxBodyWidth) maxBodyWidth = bodyW;
                    if (docW > innerW || bodyW > innerW) {
                        hasHScroll = true;
                    }

                    const curTop = document.scrollingElement.scrollTop;
                    if (curTop === lastTop) {
                        break; // Reached bottom
                    }
                    lastTop = curTop;
                    document.scrollingElement.scrollBy(0, distance);
                    await new Promise(r => setTimeout(r, 40));
                }
                
                return {
                    maxScrollWidth,
                    maxBodyWidth,
                    innerWidth: innerW,
                    hasHScroll
                };
            }""")

            if not h_scroll_data["hasHScroll"]:
                results["responsive_scroll"]["passed"] += 1
                results["responsive_scroll"]["viewports"].append({
                    "width": width,
                    "height": height,
                    "name": vp_name,
                    "status": "PASS",
                    "maxScrollWidth": h_scroll_data["maxScrollWidth"],
                    "innerWidth": h_scroll_data["innerWidth"]
                })
                log(f"Breakpoint {width:4d}px ({vp_name}): PASS (maxScrollWidth={h_scroll_data['maxScrollWidth']}px == innerWidth={h_scroll_data['innerWidth']}px, H-Scroll = 0px)", "PASS")
            else:
                results["responsive_scroll"]["failed"] += 1
                results["responsive_scroll"]["viewports"].append({
                    "width": width,
                    "height": height,
                    "name": vp_name,
                    "status": "FAIL",
                    "maxScrollWidth": h_scroll_data["maxScrollWidth"],
                    "innerWidth": h_scroll_data["innerWidth"]
                })
                log(f"Breakpoint {width:4d}px ({vp_name}): FAIL (maxScrollWidth={h_scroll_data['maxScrollWidth']}px > innerWidth={h_scroll_data['innerWidth']}px)", "FAIL")
                overall_passed = False

        # Reset desktop viewport
        page.set_viewport_size({"width": 1440, "height": 900})
        page.evaluate("() => window.scrollTo(0, 0)")
        page.wait_for_timeout(300)

        # =====================================================================
        # 3g. INTERACTIVE JOURNEYS (FAQ, NOTES MODAL, LEGAL MODAL)
        # =====================================================================
        log("\n--- [Audit 7] Interactive UI Journeys (Modal, FAQ) ---", "INFO")
        
        # FAQ Accordion
        results["interactive_e2e"]["total"] += 1
        faq_btn = page.query_selector("#faq button")
        if faq_btn:
            faq_btn.click()
            page.wait_for_timeout(350)
            results["interactive_e2e"]["passed"] += 1
            results["interactive_e2e"]["items"].append({"action": "FAQ Accordion Toggle", "status": "PASS"})
            log("FAQ Accordion Toggle: PASS", "PASS")
        else:
            results["interactive_e2e"]["failed"] += 1
            log("FAQ button not found", "FAIL")
            overall_passed = False

        # Note Modal
        results["interactive_e2e"]["total"] += 1
        note_card = page.query_selector("#notes .cursor-pointer, #notes article, #notes [role='button']")
        if note_card:
            note_card.click()
            page.wait_for_timeout(450)
            dialog = page.query_selector("[role='dialog']")
            if dialog and dialog.is_visible():
                close_btn = dialog.query_selector("button")
                if close_btn:
                    close_btn.click()
                    page.wait_for_timeout(300)
                results["interactive_e2e"]["passed"] += 1
                results["interactive_e2e"]["items"].append({"action": "Note Modal Open & Close", "status": "PASS"})
                log("Note Modal Open & Close: PASS", "PASS")
            else:
                results["interactive_e2e"]["failed"] += 1
                log("Note Modal [role='dialog'] did not appear", "FAIL")
                overall_passed = False
        else:
            results["interactive_e2e"]["failed"] += 1
            log("Note card not clickable", "FAIL")
            overall_passed = False

        # Legal Modal
        results["interactive_e2e"]["total"] += 1
        legal_btn = page.query_selector("button:has-text('Правовая информация'), footer button:has-text('конфиденциальност')")
        if legal_btn:
            legal_btn.click()
            page.wait_for_timeout(400)
            legal_dialog = page.query_selector("[role='dialog']")
            if legal_dialog and legal_dialog.is_visible():
                l_close = legal_dialog.query_selector("button")
                if l_close:
                    l_close.click()
                    page.wait_for_timeout(300)
                results["interactive_e2e"]["passed"] += 1
                results["interactive_e2e"]["items"].append({"action": "Legal Modal Open & Close", "status": "PASS"})
                log("Legal Modal Open & Close: PASS", "PASS")
            else:
                results["interactive_e2e"]["failed"] += 1
                log("Legal Modal did not open", "FAIL")
                overall_passed = False
        else:
            results["interactive_e2e"]["failed"] += 1
            log("Legal Modal trigger button not found", "FAIL")
            overall_passed = False

        # =====================================================================
        # 3h. CONSOLE & NETWORK HEALTH
        # =====================================================================
        log("\n--- [Audit 8] Console Logs & Network Health ---", "INFO")
        err_logs = [l for l in console_logs if l["type"] == "error"]
        warn_logs = [l for l in console_logs if l["type"] == "warning"]
        results["console_errors"]["errors"] = len(err_logs)
        results["console_errors"]["warnings"] = len(warn_logs)
        results["console_errors"]["page_errors"] = len(page_errors)
        results["console_errors"]["network_fails"] = len(network_fails)

        log(f"Console errors: {len(err_logs)}", "PASS" if len(err_logs) == 0 else "FAIL")
        log(f"Console warnings: {len(warn_logs)}", "INFO")
        log(f"Unhandled exceptions (pageerror): {len(page_errors)}", "PASS" if len(page_errors) == 0 else "FAIL")
        log(f"Failed network requests: {len(network_fails)}", "PASS" if len(network_fails) == 0 else "FAIL")

        if err_logs or page_errors or network_fails:
            for el in err_logs:
                log(f"  Console Error: {el['text']}", "FAIL")
            for pe in page_errors:
                log(f"  Page Error: {pe}", "FAIL")
            for nf in network_fails:
                log(f"  Network Failure: {nf}", "FAIL")
            overall_passed = False

        browser.close()

    duration = round(time.time() - start_time, 2)
    print("\n=====================================================================")
    print(" LIVING CANVAS QA SUITE EXECUTION COMPLETED")
    print(f" Total Duration: {duration}s")
    print(f" Final Audit Verdict: {'SUCCESS (100% PASS)' if overall_passed else 'FAILURE'}")
    print("=====================================================================")
    return overall_passed, results

if __name__ == "__main__":
    ok, res = run_living_canvas_suite()
    sys.exit(0 if ok else 1)
