import re
import json

with open('d:/Projects/judil-psy/research/refero_raw.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for self.__next_f.push
chunks = re.findall(r'self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)', html)
print(f"Found {len(chunks)} RSC chunks.")

unescaped = []
for c in chunks:
    try:
        # replace escaped quotes and newlines
        clean = c.encode().decode('unicode_escape')
        unescaped.append(clean)
    except Exception:
        unescaped.append(c)

all_text = "\n".join(unescaped)
with open('d:/Projects/judil-psy/research/refero_full_rsc.txt', 'w', encoding='utf-8') as f:
    f.write(all_text)

# Also search for hex colors, font names, design tokens
hex_colors = set(re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}\b', all_text))
print("Found hex colors:", sorted(list(hex_colors)))

# Look for DESIGN.md or markdown sections in the text
if "DESIGN.md" in all_text or "General Intelligence Company" in all_text:
    print("Found reference text mentioning General Intelligence Company!")

# Also let's download the og:image from Refero
import urllib.request, ssl
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}
og_url = "https://images.refero.design/styles/refero.design/image/b9fe3776-1c5c-46b6-bf7c-0642249582d0.jpg"
try:
    req = urllib.request.Request(og_url, headers=headers)
    with urllib.request.urlopen(req, context=ctx) as r:
        with open('d:/Projects/judil-psy/research/refero_og_image.jpg', 'wb') as img_f:
            img_f.write(r.read())
    print("Downloaded refero_og_image.jpg!")
except Exception as e:
    print("Error downloading og image:", e)
