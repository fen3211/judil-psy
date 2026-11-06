import urllib.request
import json
import sys

BASE = 'http://localhost:4173'

errors = []
successes = []

def test_url(path, desc):
    url = f"{BASE}{path}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as res:
            status = res.status
            size = len(res.read())
            if status == 200 and size > 0:
                successes.append(f"PASS: {desc} -> {path} ({size} bytes)")
                return True
            else:
                errors.append(f"FAIL: {desc} -> status {status}, size {size}")
                return False
    except Exception as e:
        errors.append(f"ERROR: {desc} ({url}) -> {e}")
        return False

# 1. Main HTML
test_url('/', 'Homepage HTML')

# 2. Photos used in UI
photo_files = [
    '/photos/post_261_1.jpg',
    '/photos/post_377_1.jpg',
    '/photos/post_174_1.jpg',
    '/photos/post_360_1.jpg',
    '/photos/post_368_1.jpg',
    '/photos/post_274_3.jpg',
    '/photos/post_164_1.jpg',
    '/photos/channel_avatar.jpg',
    '/favicon.svg'
]

for p in photo_files:
    test_url(p, f"Image {p}")

# 3. Read index.html to find asset paths
with urllib.request.urlopen(f"{BASE}/") as res:
    html = res.read().decode('utf-8')

import re
assets = re.findall(r'(?:src|href)="([^"]+\.(?:js|css))"', html)
for a in assets:
    test_url(a, f"Asset {a}")

print("\n--- RESULTS ---")
print(f"Total passes: {len(successes)}")
print(f"Total failures: {len(errors)}")

for s in successes:
    print("  [OK]", s)

if errors:
    print("\nFAILURES:")
    for e in errors:
        print("  [ERR]", e)
    sys.exit(1)
else:
    print("\nALL VERIFICATIONS PASSED 100%!")
