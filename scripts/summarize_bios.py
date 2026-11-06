import json

with open('d:/Projects/judil-psy/research/bio_candidates.json', 'r', encoding='utf-8') as f:
    bios = json.load(f)

with open('d:/Projects/judil-psy/research/bio_summary.txt', 'w', encoding='utf-8') as out:
    for b in bios:
        out.write(f"=== Post {b['post_id']} ({b['url']}) Date: {b['date']} ===\n")
        out.write(f"Photos: {b['photos']}\n")
        out.write(b['text'] + "\n")
        out.write("="*60 + "\n\n")

print("Saved bio_summary.txt")
