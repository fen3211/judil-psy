import json
import os
import re
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

with open('d:/Projects/judil-psy/data/telegram_archive.json', 'r', encoding='utf-8') as f:
    archive = json.load(f)

c_info = archive.get('channel_info', {})
print("Channel Title:", c_info.get('title'))
print("Channel Description:", c_info.get('description'))
print("Channel Subs:", c_info.get('subscribers'))
print("Total posts:", archive.get('total_posts'))

posts = archive.get('posts', [])

bio_candidates = []
quote_candidates = []
photos_list = []

for p in posts:
    text = p.get('text', '')
    p_id = p.get('post_id')
    p_url = p.get('url')
    photos = p.get('photos', [])
    date = p.get('date')

    for ph in photos:
        photos_list.append({
            "post_id": p_id,
            "filename": ph.get('filename'),
            "local_path": ph.get('local_path'),
            "url": p_url,
            "has_text": bool(text.strip())
        })

    # Search for bio/intro keywords
    if any(k in text.lower() for k in ['меня зовут', 'психолог', 'обо мне', 'давайте познакомимся', 'образование', 'диплом', 'юля', 'юлия', 'даниил', 'джули']):
        bio_candidates.append({
            "post_id": p_id,
            "url": p_url,
            "date": date,
            "text": text,
            "photos": [ph.get('filename') for ph in photos]
        })

    paragraphs = [para.strip() for para in text.split('\n\n') if len(para.strip()) > 30]
    for para in paragraphs:
        if any(w in para.lower() for w in ['трепет', 'чувств', 'тревог', 'опор', 'собой', 'жить', 'разреш', 'уязвимост', 'границ', 'стыд', 'вины', 'тело', 'мысли', 'страх']):
            quote_candidates.append({
                "post_id": p_id,
                "url": p_url,
                "quote": para,
                "full_post_photos": [ph.get('filename') for ph in photos]
            })

print(f"\nFound {len(bio_candidates)} bio/intro candidate posts.")
print(f"Found {len(quote_candidates)} therapeutic quote candidates.")
print(f"Total downloaded photos: {len(photos_list)}")

with open('d:/Projects/judil-psy/research/bio_candidates.json', 'w', encoding='utf-8') as f:
    json.dump(bio_candidates, f, ensure_ascii=False, indent=2)

with open('d:/Projects/judil-psy/research/quote_candidates.json', 'w', encoding='utf-8') as f:
    json.dump(quote_candidates, f, ensure_ascii=False, indent=2)

with open('d:/Projects/judil-psy/research/photos_inventory.json', 'w', encoding='utf-8') as f:
    json.dump(photos_list, f, ensure_ascii=False, indent=2)

print("Saved bio_candidates.json, quote_candidates.json, and photos_inventory.json")
