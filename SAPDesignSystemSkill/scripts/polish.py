#!/usr/bin/env python3
"""
Final polish pass on consolidated reference files.
Removes remaining artifacts and ensures clean markdown.
"""

import re
from pathlib import Path


def polish_content(content: str) -> str:
    """Final polish to remove remaining artifacts."""

    # Remove **Columns** markers and their variations
    content = re.sub(r'\*\*Columns\s*\([^)]*\)\*\*\s*\n?', '', content)
    content = re.sub(r'\*\*Columns\*\*\s*\n?', '', content)
    content = re.sub(r'^Columns\s*\([^)]*\)\s*$', '', content, flags=re.MULTILINE)

    # Remove lines with just #### and pipes (table headers gone wrong)
    content = re.sub(r'^####[^#\n]*\|\s*####[^\n]*$', '', content, flags=re.MULTILINE)

    # Remove orphan pipes
    content = re.sub(r'\s*\|\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*\|\s*', '', content, flags=re.MULTILINE)

    # Remove Carousel markers
    content = re.sub(r'Carousel\s*\*\*\([^)]*\)\*\*\s*', '', content)
    content = re.sub(r'\+:=+:\+', '', content)

    # Remove Resources sections (implementation links)
    content = re.sub(r'^## Resources\n.*?(?=\n## |\n---|\Z)', '', content, flags=re.MULTILINE | re.DOTALL)

    # Clean up info box artifacts
    content = re.sub(r'> \*\*([^:]+), Col-\d+-?\d*:\*\*', r'> **\1:**', content)

    # Remove empty heading levels
    content = re.sub(r'^### Size [SML] \([^)]+\)\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^### Size [SML]\s*$', '', content, flags=re.MULTILINE)

    # Clean trailing underscores (image captions)
    content = re.sub(r'^_[^_\n]+_\s*$', '', content, flags=re.MULTILINE)

    # Remove internal_only/external_only markers that slipped through
    content = re.sub(r'\(internal_only\)', '', content)
    content = re.sub(r'\(external_only\)', '', content)

    # Clean multiple blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    # Clean multiple dashes
    content = re.sub(r'\n---\n\n---', '\n---', content)

    return content.strip()


def main():
    refs_dir = Path('sap-fiori-guidelines-skill/references')

    for md_file in refs_dir.glob('*.md'):
        print(f"Polishing {md_file.name}...")

        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        polished = polish_content(content)

        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(polished)

        reduction = (1 - len(polished)/len(content))*100 if content else 0
        print(f"  {len(content):,} -> {len(polished):,} bytes ({reduction:.1f}% reduction)")


if __name__ == '__main__':
    main()
