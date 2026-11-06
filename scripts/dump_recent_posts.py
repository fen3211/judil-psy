import json

with open('d:/Projects/judil-psy/data/telegram_archive.json', 'r', encoding='utf-8') as f:
    archive = json.load(f)

with open('d:/Projects/judil-psy/research/recent_posts.txt', 'w', encoding='utf-8') as out:
    for p in archive['posts']:
        if p['post_id'] >= 335:
            out.write(f"=== Post {p['post_id']} ({p['url']}) Date: {p['date']} ===\n")
            out.write(f"Photos: {[ph['filename'] for ph in p.get('photos', [])]}\n")
            out.write(p['text'] + "\n")
            out.write("="*60 + "\n\n")

print("Saved recent_posts.txt")
