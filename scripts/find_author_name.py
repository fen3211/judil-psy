import json
import re

with open('d:/Projects/judil-psy/data/telegram_archive.json', 'r', encoding='utf-8') as f:
    archive = json.load(f)

for p in archive['posts']:
    t = p.get('text', '')
    if any(k in t.lower() for k in ['зовут', 'привет', 'я ', 'диплом', 'сертификат', 'фамили', 'психолог', 'автор']):
        for line in t.splitlines():
            if any(k in line.lower() for k in ['зовут', 'меня', 'я —', 'я -', 'диплом', 'юля', 'юлия', 'даниил', 'джули']):
                print(f"Post {p['post_id']}: {line.strip()[:100]}")

# Also check earliest posts
print("\n--- EARLIEST POSTS ---")
for p in archive['posts'][:10]:
    print(f"Post {p['post_id']} ({p['date']}): {p['text'][:120]}...\n")
