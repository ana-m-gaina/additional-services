#!/usr/bin/env python3
"""
Transform SAP Fiori Guidelines MD files from ASCII table format to clean markdown.
More aggressive cleaning to produce skill-ready content.
"""

import re
import os
import sys
from pathlib import Path


def clean_file(content: str) -> str:
    """Apply all transformations to produce clean markdown."""

    # Step 1: Remove internal_only content completely
    content = re.sub(r'\[internal_only\].*?\[/internal_only\]', '', content, flags=re.DOTALL)
    content = re.sub(r'\[internal\\\_only\].*?\[/internal\\\_only\]', '', content, flags=re.DOTALL)

    # Remove external_only tags but keep content
    content = re.sub(r'\[/?external_only\]', '', content)
    content = re.sub(r'\[/?external\\\_only\]', '', content)

    # Step 2: Remove Design System Hero blocks
    content = re.sub(r'\+[-+=]+\+\s*\|\s*Design System Hero.*?\+[-+=]+\+', '', content, flags=re.DOTALL)

    # Step 3: Remove Page Tabs blocks
    content = re.sub(r'\+[-+=]+\+\s*\|\s*Page Tabs.*?\+[-+=]+\+', '', content, flags=re.DOTALL)

    # Step 4: Remove Metadata tables at end
    content = re.sub(r'\+[-+=]+\+\s*\|\s*Metadata\s*\|.*?(?=\n\[image|\Z)', '', content, flags=re.DOTALL)

    # Step 5: Remove image reference definitions at bottom
    content = re.sub(r'^\[image\d+\]:.*$', '', content, flags=re.MULTILINE)

    # Step 6: Clean image references in text - convert to italic captions
    content = re.sub(r'!\[\]\[image\d+\]_([^_]+)_', r'', content)  # Remove inline images with captions
    content = re.sub(r'!\[([^\]]*)\]\[image\d+\]', r'', content)  # Remove other image refs
    content = re.sub(r'_([^_\n]+)_\s*$', '', content, flags=re.MULTILINE)  # Remove trailing captions

    # Step 7: Remove ASCII table structure
    # Remove table border lines (lines of +, -, =, |)
    content = re.sub(r'^\+[-+=|]+\+\s*$', '', content, flags=re.MULTILINE)

    # Remove "Columns" markers and their variants
    content = re.sub(r'^Columns\s*(\([^)]*\))?\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\*\*Columns\*\*\s*', '', content)

    # Step 8: Clean up lines - remove leading/trailing pipes and table column separators
    lines = content.split('\n')
    cleaned_lines = []

    for line in lines:
        # Skip pure separator lines
        if re.match(r'^[\s|+=-]+$', line):
            continue

        # Remove leading/trailing pipes
        line = re.sub(r'^\|\s*', '', line)
        line = re.sub(r'\s*\|+\s*$', '', line)

        # Remove mid-line pipes that are column separators (but keep | in code)
        if '`' not in line and '|' in line:
            # Be careful - only remove if it looks like a table separator
            if re.match(r'^[^|]+\s+\|\s+[^|]+$', line):
                # This looks like a two-column table row
                parts = line.split('|')
                line = parts[0].strip()  # Take first column content

        cleaned_lines.append(line)

    content = '\n'.join(cleaned_lines)

    # Step 9: Remove escaped brackets
    content = content.replace('\\[', '[')
    content = content.replace('\\]', ']')
    content = content.replace('\\_', '_')

    # Step 10: Clean up Info boxes - convert to blockquotes
    content = re.sub(
        r'Info\s*\(([^)]+)\)\s*(.+?)(?=\n\n|\n#|\n---|\Z)',
        lambda m: f'> **{m.group(1).title()}:** {m.group(2).strip()}\n',
        content,
        flags=re.DOTALL
    )

    # Step 11: Remove Related Links sections (usually just implementation links)
    content = re.sub(r'\n## Related Links\n.*', '', content, flags=re.DOTALL)

    # Step 12: Final cleanup
    # Reduce multiple blank lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    # Remove lines that are just whitespace or pipes
    content = re.sub(r'^\s*\|?\s*$', '', content, flags=re.MULTILINE)

    # Clean up any remaining table artifacts
    content = re.sub(r'\n\s*\|\s*\n', '\n', content)

    # Remove empty list items
    content = re.sub(r'^-\s*$', '', content, flags=re.MULTILINE)

    # Final blank line cleanup
    content = re.sub(r'\n{3,}', '\n\n', content)

    return content.strip()


def process_directory(input_dir: Path, output_dir: Path):
    """Process all MD files in directory."""

    # Get list of relevant subdirectories
    relevant_dirs = ['ui-elements', 'foundations', 'page-types', 'discover']

    stats = {'processed': 0, 'total_original': 0, 'total_cleaned': 0}

    for subdir in relevant_dirs:
        subdir_path = input_dir / subdir
        if not subdir_path.exists():
            continue

        for md_file in subdir_path.rglob('*.md'):
            # Skip combined files and index files that are mostly empty
            if '_combined' in md_file.name:
                continue

            rel_path = md_file.relative_to(input_dir)
            output_path = output_dir / rel_path

            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    original = f.read()

                cleaned = clean_file(original)

                # Skip if result is too short (likely just metadata)
                if len(cleaned) < 100:
                    continue

                output_path.parent.mkdir(parents=True, exist_ok=True)

                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(cleaned)

                reduction = (1 - len(cleaned)/len(original))*100 if original else 0
                print(f"Processed: {rel_path} ({reduction:.1f}% reduction, {len(cleaned)} chars)")

                stats['processed'] += 1
                stats['total_original'] += len(original)
                stats['total_cleaned'] += len(cleaned)

            except Exception as e:
                print(f"Error processing {rel_path}: {e}")

    return stats


def main():
    if len(sys.argv) < 3:
        print("Usage: clean_md.py <input_dir> <output_dir>")
        sys.exit(1)

    input_dir = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])

    # Clean output directory first
    if output_dir.exists():
        import shutil
        for item in output_dir.iterdir():
            if item.is_dir() and item.name in ['ui-elements', 'foundations', 'page-types', 'discover']:
                shutil.rmtree(item)

    stats = process_directory(input_dir, output_dir)

    print(f"\n{'='*50}")
    print(f"Processed {stats['processed']} files")
    if stats['total_original'] > 0:
        reduction = (1 - stats['total_cleaned']/stats['total_original'])*100
        print(f"Total: {stats['total_original']:,} -> {stats['total_cleaned']:,} chars ({reduction:.1f}% reduction)")


if __name__ == '__main__':
    main()
