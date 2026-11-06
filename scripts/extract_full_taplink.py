import json

with open('d:/Projects/judil-psy/research/taplink_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('d:/Projects/judil-psy/research/taplink_full_text.txt', 'w', encoding='utf-8') as out:
    def dump_val(key, val):
        out.write(f"\n=== {key} ===\n")
        out.write(json.dumps(val, ensure_ascii=False, indent=2) + "\n")

    for i, section in enumerate(data.get('fields', [])):
        out.write(f"\n################ SECTION {i} ################\n")
        items = section.get('items', [])
        for j, item in enumerate(items):
            opt = item.get('options', {})
            out.write(f"--- ITEM {j} ({type(opt).__name__}) ---\n")
            out.write(json.dumps(item, ensure_ascii=False, indent=2) + "\n")

print("Done writing taplink_full_text.txt")
