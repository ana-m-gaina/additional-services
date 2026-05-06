#!/usr/bin/env python3
"""
Add SAP Fiori Elements and Discover section to references.
"""

import re
from pathlib import Path


def final_clean(content: str) -> str:
    """Final cleanup."""
    content = re.sub(r'\*\*Columns\s*\([^)]*\)\*\*\s*\n?', '', content)
    content = re.sub(r'\*\*Columns\*\*\s*\n?', '', content)
    content = re.sub(r'^Columns\s*\([^)]*\)\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\s*\|\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*\|\s*', '', content, flags=re.MULTILINE)
    content = re.sub(r'^_[^_]+_\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\\\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s+$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\n{3,}', '\n\n', content)
    content = re.sub(r'\+:=+:\+', '', content)
    content = re.sub(r'> \*\*([^:]+), Col-\d+-?\d*:\*\*', r'> **\1:**', content)
    return content.strip()


def main():
    processed_dir = Path('sap-fiori-guidelines-skill/processed')
    output_dir = Path('sap-fiori-guidelines-skill/references')

    # Create Fiori Elements reference
    fe_dir = processed_dir / 'discover' / 'frameworks' / 'sap-fiori-elements'
    if fe_dir.exists():
        files = list(fe_dir.rglob('*.md'))
        if files:
            output_file = output_dir / 'fiori-elements.md'
            print(f"Creating {output_file.name} with {len(files)} sections...")

            with open(output_file, 'w', encoding='utf-8') as f:
                f.write("# SAP Fiori Elements\n\n")
                f.write("SAP Fiori Elements provides predefined templates for common app patterns.\n\n")
                f.write("## Contents\n\n")

                for filepath in sorted(files):
                    rel = filepath.relative_to(fe_dir)
                    name = str(rel.parent / rel.stem).replace('/', ' > ').replace('-', ' ').title()
                    if name == '.':
                        name = filepath.stem.replace('-', ' ').title()
                    f.write(f"- [{name}](#{filepath.stem})\n")

                f.write("\n---\n\n")

                for filepath in sorted(files):
                    with open(filepath, 'r', encoding='utf-8') as rf:
                        content = rf.read()

                    content = final_clean(content)
                    if len(content) < 100:
                        continue

                    name = filepath.stem.replace('-', ' ').title()
                    f.write(f"## {name}\n\n")
                    f.write(content)
                    f.write("\n\n---\n\n")

    # Create S/4HANA specific reference
    s4_dir = processed_dir / 'discover' / 'sap-products' / 'sap-s4hana-only'
    if s4_dir.exists():
        files = list(s4_dir.rglob('*.md'))
        if files:
            output_file = output_dir / 'sap-s4hana.md'
            print(f"Creating {output_file.name} with {len(files)} sections...")

            with open(output_file, 'w', encoding='utf-8') as f:
                f.write("# SAP S/4HANA Design Guidelines\n\n")
                f.write("Specific design guidance for SAP S/4HANA applications.\n\n")

                for filepath in sorted(files):
                    with open(filepath, 'r', encoding='utf-8') as rf:
                        content = rf.read()

                    content = final_clean(content)
                    if len(content) < 100:
                        continue

                    name = filepath.stem.replace('-', ' ').title()
                    f.write(f"## {name}\n\n")
                    f.write(content)
                    f.write("\n\n---\n\n")

    # Print summary
    print("\n" + "="*50)
    total = 0
    for f in sorted(output_dir.glob('*.md')):
        size = f.stat().st_size
        total += size
        print(f"{f.name}: {size:,} bytes")
    print(f"\nTotal: {total:,} bytes ({total/1024/1024:.2f} MB)")


if __name__ == '__main__':
    main()
