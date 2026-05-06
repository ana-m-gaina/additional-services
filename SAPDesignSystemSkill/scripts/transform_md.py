#!/usr/bin/env python3
"""
Transform SAP Fiori Guidelines MD files from ASCII table format to clean markdown.
Removes visual noise while preserving essential content.
"""

import re
import os
import sys
from pathlib import Path


def clean_ascii_tables(content: str) -> str:
    """Remove ASCII table formatting while preserving content."""
    # Remove table border lines
    content = re.sub(r'^\+[-+=]+\+\s*$', '', content, flags=re.MULTILINE)

    # Remove column separators from content lines, keeping text
    content = re.sub(r'^\|\s*', '', content, flags=re.MULTILINE)
    content = re.sub(r'\s*\|\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\s*\|\s*\|\s*', ' ', content)  # Remove empty columns

    # Clean up Columns markers
    content = re.sub(r'^Columns\s*(\([^)]*\))?\s*$', '', content, flags=re.MULTILINE)

    return content


def remove_internal_only(content: str) -> str:
    """Remove internal_only tagged content."""
    # Remove [internal_only]...[/internal_only] blocks
    content = re.sub(r'\[internal_only\].*?\[/internal_only\]', '', content, flags=re.DOTALL)

    # Remove Columns (internal_only) sections - these are entire table sections
    content = re.sub(r'Columns\s*\(internal_only\).*?(?=\n---|\n##|\Z)', '', content, flags=re.DOTALL)

    return content


def clean_external_only_tags(content: str) -> str:
    """Remove external_only tags but keep content."""
    content = re.sub(r'\[external_only\]', '', content)
    content = re.sub(r'\[/external_only\]', '', content)
    return content


def clean_image_references(content: str) -> str:
    """Clean up image references - keep captions, simplify refs."""
    # Convert image references with captions like: ![Caption][imageN] or ![][imageN]_Caption_
    # Keep just the caption text in italics
    content = re.sub(r'!\[\]\[image\d+\]_([^_]+)_', r'*\1*', content)
    content = re.sub(r'!\[([^\]]+)\]\[image\d+\]', r'*\1*', content)

    # Remove standalone image reference definitions
    content = re.sub(r'^\[image\d+\]:.*$', '', content, flags=re.MULTILINE)

    return content


def clean_metadata_tables(content: str) -> str:
    """Remove metadata tables at end of files."""
    # Remove Metadata table sections
    content = re.sub(r'\+[-+]+\+\s*\|\s*Metadata.*?(?=\n\[image|\Z)', '', content, flags=re.DOTALL)
    return content


def clean_design_system_hero(content: str) -> str:
    """Remove Design System Hero header blocks."""
    content = re.sub(r'\+[-+]+\+\s*\|\s*Design System Hero.*?\+[-+]+\+', '', content, flags=re.DOTALL)
    return content


def clean_page_tabs(content: str) -> str:
    """Remove Page Tabs blocks."""
    content = re.sub(r'\+[-+]+\+\s*\|\s*Page Tabs.*?\+[-+]+\+', '', content, flags=re.DOTALL)
    return content


def clean_info_boxes(content: str) -> str:
    """Convert Info boxes to markdown blockquotes."""
    # Match Info (hint), Info (guideline), etc.
    def replace_info(match):
        info_type = match.group(1) if match.group(1) else 'Note'
        content = match.group(2).strip()
        return f'> **{info_type.title()}:** {content}\n'

    content = re.sub(
        r'\+[-+]+\+\s*\|\s*Info\s*\(([^)]*)\).*?\|\s*(.+?)\s*\+[-+]+\+',
        replace_info,
        content,
        flags=re.DOTALL
    )
    return content


def clean_multiple_blank_lines(content: str) -> str:
    """Reduce multiple blank lines to maximum of two."""
    content = re.sub(r'\n{4,}', '\n\n\n', content)
    return content


def clean_escaped_brackets(content: str) -> str:
    """Remove unnecessary escaping."""
    content = content.replace('\\[', '[')
    content = content.replace('\\]', ']')
    return content


def extract_title_from_hero(content: str) -> str:
    """Extract the title from Design System Hero if present."""
    match = re.search(r'#\s+(.+?)(?:\n|$)', content)
    if match:
        return match.group(1).strip()
    return None


def transform_file(content: str) -> str:
    """Apply all transformations to clean up the markdown."""
    # Order matters for some transformations
    content = remove_internal_only(content)
    content = clean_external_only_tags(content)
    content = clean_design_system_hero(content)
    content = clean_page_tabs(content)
    content = clean_metadata_tables(content)
    content = clean_info_boxes(content)
    content = clean_ascii_tables(content)
    content = clean_image_references(content)
    content = clean_escaped_brackets(content)
    content = clean_multiple_blank_lines(content)

    # Final cleanup
    content = content.strip()

    return content


def process_file(input_path: Path, output_path: Path) -> dict:
    """Process a single file and return stats."""
    with open(input_path, 'r', encoding='utf-8') as f:
        original = f.read()

    transformed = transform_file(original)

    # Create output directory if needed
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(transformed)

    return {
        'input': str(input_path),
        'output': str(output_path),
        'original_size': len(original),
        'transformed_size': len(transformed),
        'reduction': f"{(1 - len(transformed)/len(original))*100:.1f}%"
    }


def main():
    if len(sys.argv) < 3:
        print("Usage: transform_md.py <input_dir> <output_dir>")
        sys.exit(1)

    input_dir = Path(sys.argv[1])
    output_dir = Path(sys.argv[2])

    stats = []
    for md_file in input_dir.rglob('*.md'):
        # Skip already combined files
        if '_combined' in md_file.name:
            continue

        rel_path = md_file.relative_to(input_dir)
        output_path = output_dir / rel_path

        try:
            stat = process_file(md_file, output_path)
            stats.append(stat)
            print(f"Processed: {rel_path} ({stat['reduction']} reduction)")
        except Exception as e:
            print(f"Error processing {rel_path}: {e}")

    print(f"\nProcessed {len(stats)} files")
    total_original = sum(s['original_size'] for s in stats)
    total_transformed = sum(s['transformed_size'] for s in stats)
    print(f"Total reduction: {(1 - total_transformed/total_original)*100:.1f}%")


if __name__ == '__main__':
    main()
