import json

with open('d:/Projects/judil-psy/research/taplink_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def walk(obj, depth=0):
    indent = "  " * depth
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ['title', 'text', 'subtitle', 'url', 'src', 'avatar', 'name', 'content']:
                print(f"{indent}{k}: {repr(v)[:150]}")
            elif isinstance(v, (dict, list)):
                print(f"{indent}{k}: ({type(v).__name__})")
                walk(v, depth + 1)
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            walk(item, depth)

import sys
with open('d:/Projects/judil-psy/research/taplink_dump.txt', 'w', encoding='utf-8') as sys.stdout:
    walk(data)

print('Dumped taplink data to taplink_dump.txt')
