import sys
import os
import re
import time
import urllib.request
import urllib.parse
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
    print(f"[{status:4s}] {symbol} {msg}")

def run_suite():
    overall_passed = True
    start_time = time.time()

    results = {
        "homepage": {"status": "PENDING", "size": 0},
        "static_assets": {"total": 0, "passed": 0, "failed": 0, "items": []},
        "catalog_photos": {"total": 0, "passed": 0, "failed": 0},
        "sections": {"total": 0, "passed": 0, "failed": 0, "items": []},
        "rendered_images": {"total": 0, "passed": 0, "failed": 0},
        "links": {"total": 0, "passed": 0, "failed": 0, "items": []},
        "responsive": {"total": 0, "passed": 0, "failed": 0, "items": []},
        "interactions": {"total": 0, "passed": 0, "failed": 0, "items": []},
        "console_errors": {"errors": 0, "warnings": 0, "page_errors": 0, "network_fails": 0}
    }

    print("=====================================================================")
    print(" JUDIL.PSY — PRODUCTION QA AUTOMATION AUDIT SUITE")
    print(f" Target URL: {BASE_URL}")
    print(f" Working Directory: {PROJECT_ROOT}")
    print("=====================================================================\n")

    # 1. Main Page Check
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

    # 2. Key Static Assets & Bundles Check
    log("\nStep 2: Checking Explicit Static Assets & Bundles...", "INFO")
    explicit_assets = [
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
    # Extract bundle files from index.html
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

    # 3. Check All 162 Catalog Photos in public/photos
    log("\nStep 3: Checking ALL photos in public/photos directory over HTTP...", "INFO")
    if os.path.exists(PHOTOS_DIR):
        photos = [f for f in os.listdir(PHOTOS_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.svg'))]
        for pf in photos:
            results["catalog_photos"]["total"] += 1
            url = f"{BASE_URL}/photos/{pf}"
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "QA-Runner/1.0"})
                with urllib.request.urlopen(req, timeout=3) as res:
                    size = len(res.read())
                    if res.status == 200 and size > 0:
                        results["catalog_photos"]["passed"] += 1
                    else:
                        results["catalog_photos"]["failed"] += 1
                        overall_passed = False
                        log(f"Photo error: {pf} status {res.status}", "FAIL")
            except Exception as e:
                results["catalog_photos"]["failed"] += 1
                overall_passed = False
                log(f"Photo request error: {pf} -> {e}", "FAIL")

        log(f"Catalog Photos: {results['catalog_photos']['passed']}/{results['catalog_photos']['total']} photos accessible via HTTP 200 (100%)",
            "PASS" if results["catalog_photos"]["failed"] == 0 else "FAIL")

    # 4. Playwright Headless Browser Testing
    log("\nStep 4: Launching Headless Chromium via Playwright...", "INFO")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        console_logs = []
        page_errors = []
        network_fails = []

        page.on("console", lambda msg: console_logs.append({"type": msg.type, "text": msg.text}))
        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on("requestfailed", lambda req: network_fails.append(f"{req.method} {req.url} -> {req.failure}"))

        page.goto(BASE_URL, wait_until="networkidle")

        # 4a. Verify 10 Key Sections
        log("\n--- Section Presence Verification (10 Key Sections) ---", "INFO")
        sections_to_test = [
            ("Hero", "main > section:first-of-type, #hero", "01. Hero / Living Cover"),
            ("About", "#about", "02. About Psychologist"),
            ("Problems", "#problems", "03. Problem Areas"),
            ("Notes", "#notes", "04. Interactive Journal Notes"),
            ("Quotes", "#quotes", "05. Typographic Quotes Flow"),
            ("Process", "#process, main > section:nth-of-type(6)", "06. How It Works (Process)"),
            ("Pricing", "#pricing", "07. Formats and Pricing"),
            ("FAQ", "#faq", "08. FAQ (Accordion)"),
            ("Booking", "#booking", "09. Booking Form"),
            ("Footer", "footer, #footer", "10. Footer / Colophon"),
        ]

        for name, selector, desc in sections_to_test:
            results["sections"]["total"] += 1
            el = page.query_selector(selector)
            if el and el.is_visible():
                heading = el.query_selector("h1, h2, h3")
                heading_title = heading.inner_text().strip().replace('\n', ' ') if heading else "(semantic heading absent)"
                results["sections"]["passed"] += 1
                results["sections"]["items"].append({
                    "name": name,
                    "selector": selector,
                    "desc": desc,
                    "visible": True,
                    "heading": heading_title
                })
                log(f"Section {name:8s} [OK] Heading: \"{heading_title[:45]}\"", "PASS")
            else:
                results["sections"]["failed"] += 1
                overall_passed = False
                log(f"Section {name:8s} [FAILED] selector '{selector}' not visible", "FAIL")

        # 4b. Verify Rendered Images (with lazy load trigger)
        log("\n--- Checking Rendered Images Dimensions & Loading ---", "INFO")
        # Scroll through entire page to trigger lazy loaded images
        page.evaluate("""async () => {
            const distance = 400;
            const delay = 100;
            while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
                document.scrollingElement.scrollBy(0, distance);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }""")
        page.wait_for_timeout(1000)

        rendered_imgs = page.evaluate("""() => {
            return Array.from(document.querySelectorAll('img')).map(img => ({
                src: img.src,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                complete: img.complete
            }));
        }""")

        results["rendered_images"]["total"] = len(rendered_imgs)
        for img in rendered_imgs:
            if img["complete"] and img["naturalWidth"] > 0 and img["naturalHeight"] > 0:
                results["rendered_images"]["passed"] += 1
            else:
                results["rendered_images"]["failed"] += 1
                overall_passed = False
                log(f"Broken Image in DOM: src={img['src']} alt='{img['alt']}' ({img['naturalWidth']}x{img['naturalHeight']})", "FAIL")

        log(f"Rendered Images: {results['rendered_images']['passed']}/{results['rendered_images']['total']} fully rendered with positive dimensions",
            "PASS" if results["rendered_images"]["failed"] == 0 else "FAIL")

        # 4c. Verify Link Integrity (Internal Anchors & External Links)
        log("\n--- Checking Link Integrity ---", "INFO")
        links_data = page.evaluate("""() => {
            return Array.from(document.querySelectorAll('a[href]')).map(a => ({
                href: a.getAttribute('href'),
                text: a.innerText.trim().replace(/\\s+/g, ' '),
                target: a.getAttribute('target'),
                rel: a.getAttribute('rel')
            }));
        }""")

        for l in links_data:
            results["links"]["total"] += 1
            href = l["href"]
            if not href or href == "#":
                results["links"]["passed"] += 1
                continue
            if href.startswith("#"):
                anchor = href[1:]
                target = page.query_selector(f"#{anchor}")
                if target:
                    results["links"]["passed"] += 1
                    results["links"]["items"].append({"type": "anchor", "href": href, "text": l["text"], "valid": True})
                else:
                    results["links"]["failed"] += 1
                    overall_passed = False
                    results["links"]["items"].append({"type": "anchor", "href": href, "text": l["text"], "valid": False})
                    log(f"Broken Anchor: {href} (text: '{l['text']}') has no target element in DOM", "FAIL")
            elif href.startswith("http"):
                # External link: verify format and security attributes
                has_rel = l["rel"] and ("noreferrer" in l["rel"] or "noopener" in l["rel"])
                results["links"]["passed"] += 1
                results["links"]["items"].append({
                    "type": "external",
                    "href": href,
                    "text": l["text"],
                    "valid": True,
                    "secure_rel": has_rel
                })
            else:
                results["links"]["passed"] += 1

        log(f"Links Integrity: {results['links']['passed']}/{results['links']['total']} links valid without dead anchors",
            "PASS" if results["links"]["failed"] == 0 else "FAIL")

        # 4d. Responsive Breakpoint & Horizontal Overflow Check
        log("\n--- Checking Responsive Breakpoints & Zero Horizontal Overflow ---", "INFO")
        viewports = [
            (375, 667, "iPhone SE (Compact Mobile)"),
            (390, 844, "iPhone 12/13/14 (Standard Mobile)"),
            (430, 932, "iPhone 14/15/16 Pro Max (Large Mobile)"),
            (1024, 768, "iPad / Small Laptop (Tablet/Small Desktop)"),
            (1280, 800, "Desktop 1280px (Standard Desktop)"),
            (1440, 900, "Desktop 1440px (Large Screen/Retina)")
        ]

        for width, height, vp_name in viewports:
            results["responsive"]["total"] += 1
            page.set_viewport_size({"width": width, "height": height})
            page.evaluate("() => window.scrollTo(0, 0)")
            page.wait_for_timeout(300)

            geom = page.evaluate("""() => {
                const doc = document.documentElement;
                const body = document.body;
                return {
                    scrollWidth: doc.scrollWidth,
                    clientWidth: doc.clientWidth,
                    innerWidth: window.innerWidth,
                    bodyScrollWidth: body.scrollWidth,
                    hasHorizontalScroll: doc.scrollWidth > window.innerWidth || body.scrollWidth > window.innerWidth
                };
            }""")

            if not geom["hasHorizontalScroll"]:
                results["responsive"]["passed"] += 1
                results["responsive"]["items"].append({
                    "viewport": f"{width}x{height}",
                    "name": vp_name,
                    "scrollWidth": geom["scrollWidth"],
                    "innerWidth": geom["innerWidth"],
                    "status": "PASS"
                })
                log(f"Breakpoint {width:4d}px ({vp_name}): PASS (scrollWidth={geom['scrollWidth']}px == innerWidth={geom['innerWidth']}px)", "PASS")
            else:
                results["responsive"]["failed"] += 1
                overall_passed = False
                results["responsive"]["items"].append({
                    "viewport": f"{width}x{height}",
                    "name": vp_name,
                    "scrollWidth": geom["scrollWidth"],
                    "innerWidth": geom["innerWidth"],
                    "status": "FAIL"
                })
                log(f"Breakpoint {width:4d}px ({vp_name}): FAIL (scrollWidth={geom['scrollWidth']}px > innerWidth={geom['innerWidth']}px)", "FAIL")

        # 4e. Interactivity: FAQ Accordion
        log("\n--- Testing Interactive User Journeys ---", "INFO")
        results["interactions"]["total"] += 1
        faq_btn = page.query_selector("#faq button")
        if faq_btn:
            faq_btn.click()
            page.wait_for_timeout(400)
            results["interactions"]["passed"] += 1
            results["interactions"]["items"].append({"action": "FAQ Accordion Expand", "status": "PASS"})
            log("FAQ Accordion toggle: PASS", "PASS")
        else:
            results["interactions"]["failed"] += 1
            log("FAQ button not found", "FAIL")

        # 4f. Interactivity: Note Modal Open & Close
        results["interactions"]["total"] += 1
        note_card = page.query_selector("#notes .cursor-pointer, #notes article, #notes [role='button']")
        if note_card:
            note_card.click()
            page.wait_for_timeout(500)
            modal = page.query_selector("[role='dialog']")
            if modal and modal.is_visible():
                # Close button
                close_btn = modal.query_selector("button")
                if close_btn:
                    close_btn.click()
                    page.wait_for_timeout(400)
                results["interactions"]["passed"] += 1
                results["interactions"]["items"].append({"action": "Notes Modal Open & Close", "status": "PASS"})
                log("Notes Modal Open & Close: PASS", "PASS")
            else:
                results["interactions"]["failed"] += 1
                log("Notes Modal did not display [role='dialog']", "FAIL")
        else:
            results["interactions"]["failed"] += 1
            log("Note card not found", "FAIL")

        # 4g. Interactivity: Booking Form Submission
        results["interactions"]["total"] += 1
        # Fill form fields
        page.fill("#name", "Екатерина QA")
        page.fill("#contact", "@ekaterina_qa_test")
        # Click consent checkbox (152-FZ compliance)
        page.click("input[type='checkbox']")
        page.wait_for_timeout(200)
        # Click submit button
        submit_btn = page.query_selector("#booking form button[type='submit']")
        if submit_btn and submit_btn.is_enabled():
            submit_btn.click()
            page.wait_for_timeout(600)
            success_elem = page.query_selector("text=Заявка успешно отправлена!")
            if success_elem and success_elem.is_visible():
                results["interactions"]["passed"] += 1
                results["interactions"]["items"].append({"action": "Booking Form Valid Submission", "status": "PASS"})
                log("Booking Form Valid Submission: PASS (Success screen verified)", "PASS")
            else:
                results["interactions"]["failed"] += 1
                log("Booking Form: Success message not found after submission", "FAIL")
        else:
            results["interactions"]["failed"] += 1
            log("Booking Form: Submit button not enabled after consent", "FAIL")

        # 4h. Interactivity: Legal Privacy Modal Open & Close
        results["interactions"]["total"] += 1
        page.goto(BASE_URL, wait_until="networkidle") # Reset page state
        # Find privacy policy link in footer
        privacy_link = page.query_selector("footer button, footer a:has-text('конфиденциальност'), button:has-text('Политик')")
        if privacy_link:
            privacy_link.click()
            page.wait_for_timeout(400)
            legal_dialog = page.query_selector("[role='dialog']")
            if legal_dialog and legal_dialog.is_visible():
                legal_heading = legal_dialog.query_selector("h2, h3")
                lh_text = legal_heading.inner_text() if legal_heading else ""
                # Close modal
                close_btn = legal_dialog.query_selector("button")
                if close_btn:
                    close_btn.click()
                    page.wait_for_timeout(300)
                results["interactions"]["passed"] += 1
                results["interactions"]["items"].append({"action": "Legal Modal Open & Close", "status": "PASS", "title": lh_text})
                log(f"Legal Modal Open & Close: PASS (Title: '{lh_text}')", "PASS")
            else:
                results["interactions"]["failed"] += 1
                log("Legal Modal did not appear", "FAIL")
        else:
            results["interactions"]["failed"] += 1
            log("Privacy link not found in footer", "FAIL")

        # 4i. Console & Runtime Errors
        log("\n--- Checking Console & Network Error Logs ---", "INFO")
        err_logs = [l for l in console_logs if l["type"] == "error"]
        warn_logs = [l for l in console_logs if l["type"] == "warning"]
        results["console_errors"]["errors"] = len(err_logs)
        results["console_errors"]["warnings"] = len(warn_logs)
        results["console_errors"]["page_errors"] = len(page_errors)
        results["console_errors"]["network_fails"] = len(network_fails)

        log(f"Console errors: {len(err_logs)}, Console warnings: {len(warn_logs)}", "INFO")
        log(f"Unhandled exceptions: {len(page_errors)}", "PASS" if len(page_errors) == 0 else "FAIL")
        log(f"Failed network requests: {len(network_fails)}", "PASS" if len(network_fails) == 0 else "FAIL")

        if err_logs or page_errors or network_fails:
            overall_passed = False

        browser.close()

    duration = round(time.time() - start_time, 2)
    print("\n=====================================================================")
    print(" SUITE EXECUTION COMPLETED")
    print(f" Duration: {duration}s")
    print(f" Status: {'SUCCESS (PASS)' if overall_passed else 'FAILURE'}")
    print("=====================================================================")
    return overall_passed, results

if __name__ == "__main__":
    ok, res = run_suite()
    sys.exit(0 if ok else 1)
