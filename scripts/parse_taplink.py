import json

with open('d:/Projects/judil-psy/research/taplink_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

lines = []
for section in data.get('fields', []):
    for item in section.get('items', []):
        opt = item.get('options', {})
        lines.append(f"ITEM TYPE: {opt.get('type')}")
        if 'title' in opt: lines.append(f"  title: {opt.get('title')}")
        if 'subtitle' in opt: lines.append(f"  subtitle: {opt.get('subtitle')}")
        if 'text' in opt: lines.append(f"  text: {opt.get('text')}")
        if 'items' in opt:
            for sub in opt.get('items', []):
                lines.append(f"    subitem: {json.dumps(sub, ensure_ascii=False)}")
        if 'url' in opt: lines.append(f"  url: {opt.get('url')}")
        if 'image' in opt: lines.append(f"  image: {opt.get('image')}")
        if 'avatar' in opt: lines.append(f"  avatar: {opt.get('avatar')}")
        if 'links' in opt: lines.append(f"  links: {opt.get('links')}")
        lines.append('-'*40)

with open('d:/Projects/judil-psy/research/taplink_summary.txt', 'w', encoding='utf-8') as out:
    out.write('\n'.join(lines))
print('Written taplink_summary.txt')
