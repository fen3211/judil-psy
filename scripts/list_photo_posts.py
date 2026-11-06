import json

with open('d:/Projects/judil-psy/data/telegram_archive.json', 'r', encoding='utf-8') as f:
    arc = json.load(f)

with open('d:/Projects/judil-psy/research/photo_posts_catalog.txt', 'w', encoding='utf-8') as out:
    for p in arc['posts']:
        ph = p.get('photos', [])
        t = p.get('text', '').replace('\n', ' ')
        if ph:
            out.write(f"Post {p['post_id']} ({len(ph)} photos):\n")
            out.write(f"  Photos: {[item['filename'] for item in ph]}\n")
            out.write(f"  Text: {t[:120]}\n\n")

print("Wrote photo_posts_catalog.txt")
