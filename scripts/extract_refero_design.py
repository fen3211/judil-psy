import re

with open('d:/Projects/judil-psy/research/refero_full_rsc.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's search for json blocks or markdown blocks
matches = re.findall(r'(```markdown.*?```|# [^\n]+.*?)(?=(?:# |\Z))', text, re.DOTALL)
print(f"Found {len(matches)} markdown sections.")

with open('d:/Projects/judil-psy/research/refero_extracted_design.txt', 'w', encoding='utf-8') as out:
    for m in matches:
        if any(w in m for w in ['General Intelligence', 'DESIGN', 'Parchment', 'Typography', 'Palette']):
            out.write("----------------------------------------\n")
            out.write(m + "\n")

print("Wrote refero_extracted_design.txt")
