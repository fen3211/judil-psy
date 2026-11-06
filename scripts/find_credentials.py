import json

with open('d:/Projects/judil-psy/data/telegram_archive.json', 'r', encoding='utf-8') as f:
    archive = json.load(f)

with open('d:/Projects/judil-psy/research/credentials_search.txt', 'w', encoding='utf-8') as out:
    for p in archive['posts']:
        text = p.get('text', '')
        if any(w in text.lower() for w in ['диплом', 'акпп', 'надпо', 'ассоциаци', 'обучени', 'квалификац', 'клиент', 'консультаци', 'запис', 'стоимост', 'сесси']):
            out.write(f"=== Post {p['post_id']} ({p['url']}) Date: {p['date']} ===\n")
            out.write(f"Photos: {p['photos']}\n")
            out.write(text + "\n")
            out.write("="*60 + "\n\n")

print("Saved credentials_search.txt")
