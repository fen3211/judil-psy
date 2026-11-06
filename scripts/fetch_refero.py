import urllib.request
import ssl
import json
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

url = "https://styles.refero.design/style/34baa524-5d5b-4165-bbab-d01f05e6d6b9"
req = urllib.request.Request(url, headers=HEADERS)

try:
    with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
        html = r.read().decode('utf-8', errors='ignore')

    with open('d:/Projects/judil-psy/research/refero_raw.html', 'w', encoding='utf-8') as f:
        f.write(html)

    # Next data
    m = re.search(r'<script[^>]*id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
    if m:
        data = json.loads(m.group(1))
        with open('d:/Projects/judil-psy/research/refero_data.json', 'w', encoding='utf-8') as jf:
            json.dump(data, jf, ensure_ascii=False, indent=2)
        print("Successfully extracted refero __NEXT_DATA__!")
    else:
        print("No __NEXT_DATA__ script found.")
except Exception as e:
    print(f"Error fetching Refero: {e}")
