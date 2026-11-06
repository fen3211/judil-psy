import os
from PIL import Image

photos_dir = 'd:/Projects/judil-psy/data/photos'
files = [f for f in os.listdir(photos_dir) if f.endswith(('.jpg', '.png', '.webp'))]

info_list = []
for f in files:
    p = os.path.join(photos_dir, f)
    try:
        with Image.open(p) as img:
            w, h = img.size
            ratio = round(w / h, 2)
            info_list.append({
                "filename": f,
                "width": w,
                "height": h,
                "ratio": ratio,
                "size_kb": round(os.path.getsize(p) / 1024, 1),
                "orientation": "portrait" if h > w else ("landscape" if w > h else "square")
            })
    except Exception as e:
        pass

import json
with open('d:/Projects/judil-psy/research/photos_detailed.json', 'w', encoding='utf-8') as out:
    json.dump(info_list, out, ensure_ascii=False, indent=2)

print(f"Analyzed {len(info_list)} images. Saved to photos_detailed.json.")
