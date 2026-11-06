import json

with open('d:/Projects/judil-psy/data/telegram_archive.json', 'r', encoding='utf-8') as f:
    arc = json.load(f)

with open('d:/Projects/judil-psy/research/post_302.txt', 'w', encoding='utf-8') as out:
    for p in arc['posts']:
        if p['post_id'] == 302:
            out.write("POST 302 TEXT:\n")
            out.write(p['text'] + "\n")
            out.write("POST 302 PHOTOS:\n" + json.dumps(p.get('photos'), ensure_ascii=False, indent=2))

print("Wrote post_302.txt")
