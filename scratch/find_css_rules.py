import re

with open("C:/Users/anasr/.gemini/antigravity/scratch/edusphere/public/style.css", "r", encoding="utf-8") as f:
    lines = f.readlines()

search_terms = [r"\.glass-panel", r"\.card-tilt", r"animation:", r"@keyframes"]
for term in search_terms:
    print(f"--- Search for: {term} ---")
    pattern = re.compile(term)
    count = 0
    for idx, line in enumerate(lines):
        if pattern.search(line):
            print(f"Line {idx+1}: {line.strip()}")
            count += 1
            if count >= 10:
                print("... (truncated)")
                break
