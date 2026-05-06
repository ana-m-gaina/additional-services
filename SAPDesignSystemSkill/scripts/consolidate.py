#!/usr/bin/env python3
"""
Final cleanup and consolidation of SAP Fiori Guidelines for skill.
Creates consolidated reference files organized by domain.
"""

import re
import os
from pathlib import Path
from collections import defaultdict


def final_clean(content: str) -> str:
    """Final aggressive cleanup of markdown content."""

    # Remove all Columns markers
    content = re.sub(r'^Columns\s*(\([^)]*\))?\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\*\*Columns\*\*', '', content)

    # Remove trailing pipes from lines
    content = re.sub(r'\s*\|\s*$', '', content, flags=re.MULTILINE)

    # Remove leading pipes
    content = re.sub(r'^\s*\|\s*', '', content, flags=re.MULTILINE)

    # Remove lines that are just underscores or pipes with captions
    content = re.sub(r'^_[^_]+_\s*$', '', content, flags=re.MULTILINE)

    # Remove orphaned backslashes
    content = re.sub(r'\\\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\\$', '', content, flags=re.MULTILINE)

    # Clean up empty list items that got truncated
    content = re.sub(r'^(\s*-\s*),\s*$', '', content, flags=re.MULTILINE)

    # Remove lines that are just whitespace
    content = re.sub(r'^\s+$', '', content, flags=re.MULTILINE)

    # Reduce multiple newlines
    content = re.sub(r'\n{3,}', '\n\n', content)

    return content.strip()


def extract_key_content(filepath: Path) -> dict:
    """Extract title and cleaned content from a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = final_clean(content)

    # Try to extract title from first heading
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if not title_match:
        title_match = re.search(r'^##\s+(.+)$', content, re.MULTILINE)

    title = title_match.group(1) if title_match else filepath.stem.replace('-', ' ').title()

    return {
        'title': title,
        'content': content,
        'path': str(filepath)
    }


def consolidate_ui_elements(processed_dir: Path, output_dir: Path):
    """Consolidate UI elements into categorized reference files."""

    ui_dir = processed_dir / 'ui-elements'
    if not ui_dir.exists():
        return

    # Categorize UI elements
    categories = {
        'actions': ['button', 'link', 'menu-button', 'action-sheet', 'action-list-item'],
        'inputs': ['input', 'text-area', 'step-input', 'date-picker', 'time-picker', 'combo-box',
                   'select', 'multi-input', 'multiinput', 'search-field', 'checkbox', 'radio-button',
                   'switch', 'slider', 'range-slider', 'rating-indicator', 'token', 'color-picker'],
        'containers': ['panel', 'card', 'dialog', 'popover', 'toolbar', 'form', 'dynamic-side-content',
                       'flexible-column-layout', 'page', 'shell-bar', 'bar'],
        'display': ['text', 'title', 'label', 'avatar', 'icon', 'badge', 'object-status',
                    'object-display-elements', 'progress-indicator', 'busy-indicator', 'illustrated-message'],
        'lists-tables': ['list', 'table', 'tree', 'timeline', 'feed-list', 'notification'],
        'navigation': ['breadcrumb', 'tab-bar', 'icontabbar', 'wizard', 'carousel', 'segmented-button'],
        'charts': ['chart', 'micro-chart', 'radial-micro-chart', 'bullet-micro-chart', 'comparison-micro-chart'],
        'messages': ['message-strip', 'message-box', 'message-popover', 'message-toast', 'toast'],
        'ai': ['ai-prompt-input', 'ai-notice', 'ai-progress-indicator', 'ai-writing-assistant',
               'ai-text-highlight', 'local-ai-notice'],
        'pickers': ['calendar', 'date-range-selection', 'calendar-date-interval'],
        'upload': ['upload-set', 'file-uploader', 'upload-collection'],
    }

    # Collect files by category
    categorized = defaultdict(list)
    uncategorized = []

    for element_dir in ui_dir.iterdir():
        if not element_dir.is_dir():
            continue

        element_name = element_dir.name.replace('-web-component', '')

        # Find the usage.md file (main content)
        usage_file = element_dir / 'usage.md'
        if not usage_file.exists():
            continue

        # Determine category
        found_category = None
        for cat, elements in categories.items():
            if any(el in element_name for el in elements):
                found_category = cat
                break

        if found_category:
            categorized[found_category].append(usage_file)
        else:
            uncategorized.append(usage_file)

    # Write consolidated files
    output_dir.mkdir(parents=True, exist_ok=True)

    for category, files in categorized.items():
        if not files:
            continue

        output_file = output_dir / f'ui-{category}.md'
        print(f"Creating {output_file.name} with {len(files)} components...")

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"# SAP Fiori UI Elements: {category.replace('-', ' ').title()}\n\n")
            f.write("This reference covers the following UI components:\n\n")

            # Write TOC
            for filepath in sorted(files):
                name = filepath.parent.name.replace('-', ' ').title()
                anchor = filepath.parent.name
                f.write(f"- [{name}](#{anchor})\n")

            f.write("\n---\n\n")

            # Write content
            for filepath in sorted(files):
                data = extract_key_content(filepath)
                element_name = filepath.parent.name
                f.write(f"## {element_name}\n\n")
                # Skip first heading if it matches
                content = re.sub(r'^##?\s+Intro\s*\n', '', data['content'])
                f.write(content)
                f.write("\n\n---\n\n")

    # Handle uncategorized
    if uncategorized:
        output_file = output_dir / 'ui-other.md'
        print(f"Creating {output_file.name} with {len(uncategorized)} components...")

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# SAP Fiori UI Elements: Other Components\n\n")
            for filepath in sorted(uncategorized):
                data = extract_key_content(filepath)
                f.write(f"## {filepath.parent.name}\n\n")
                f.write(data['content'])
                f.write("\n\n---\n\n")


def consolidate_foundations(processed_dir: Path, output_dir: Path):
    """Consolidate foundations into reference files."""

    foundations_dir = processed_dir / 'foundations'
    if not foundations_dir.exists():
        return

    output_dir.mkdir(parents=True, exist_ok=True)

    # Process each subdirectory
    for subdir in foundations_dir.iterdir():
        if not subdir.is_dir():
            continue

        files = list(subdir.rglob('*.md'))
        if not files:
            continue

        output_file = output_dir / f'foundations-{subdir.name}.md'
        print(f"Creating {output_file.name} with {len(files)} sections...")

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"# SAP Fiori Foundations: {subdir.name.replace('-', ' ').title()}\n\n")

            for filepath in sorted(files):
                data = extract_key_content(filepath)
                # Use relative path for section header
                rel_path = filepath.relative_to(subdir)
                section_name = str(rel_path.parent / rel_path.stem).replace('/', ' > ').replace('-', ' ').title()
                if section_name == '.':
                    section_name = filepath.stem.replace('-', ' ').title()

                f.write(f"## {section_name}\n\n")
                f.write(data['content'])
                f.write("\n\n---\n\n")


def consolidate_page_types(processed_dir: Path, output_dir: Path):
    """Consolidate page types into reference file."""

    page_types_dir = processed_dir / 'page-types'
    if not page_types_dir.exists():
        return

    output_dir.mkdir(parents=True, exist_ok=True)
    files = list(page_types_dir.rglob('*.md'))

    if not files:
        return

    output_file = output_dir / 'page-types.md'
    print(f"Creating {output_file.name} with {len(files)} sections...")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# SAP Fiori Page Types and Floorplans\n\n")

        for filepath in sorted(files):
            data = extract_key_content(filepath)
            rel_path = filepath.relative_to(page_types_dir)
            section_name = str(rel_path.parent / rel_path.stem).replace('/', ' > ').replace('-', ' ').title()

            f.write(f"## {section_name}\n\n")
            f.write(data['content'])
            f.write("\n\n---\n\n")


def main():
    processed_dir = Path('sap-fiori-guidelines-skill/processed')
    output_dir = Path('sap-fiori-guidelines-skill/references')

    # Clean output
    if output_dir.exists():
        import shutil
        shutil.rmtree(output_dir)

    output_dir.mkdir(parents=True, exist_ok=True)

    print("Consolidating UI Elements...")
    consolidate_ui_elements(processed_dir, output_dir)

    print("\nConsolidating Foundations...")
    consolidate_foundations(processed_dir, output_dir)

    print("\nConsolidating Page Types...")
    consolidate_page_types(processed_dir, output_dir)

    # Print summary
    print("\n" + "="*50)
    total_size = 0
    for f in output_dir.glob('*.md'):
        size = f.stat().st_size
        total_size += size
        print(f"{f.name}: {size:,} bytes")
    print(f"\nTotal: {total_size:,} bytes ({total_size/1024:.1f} KB)")


if __name__ == '__main__':
    main()
