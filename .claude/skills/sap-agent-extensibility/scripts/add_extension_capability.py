#!/usr/bin/env python3
"""Add extension capabilities to A2A agent card JSON files.

Locates agent cards at their conventional paths within a repo root
and adds an extension capability entry to capabilities.extensions.
"""

import argparse
import json
import sys
from pathlib import Path

EXTENSION_URI_PREFIX = "urn:sap:extension-capability:v1:"
CAPABILITY_ID = "default"
EXTENSION_URI = f"{EXTENSION_URI_PREFIX}{CAPABILITY_ID}"
EXTENSION_DESCRIPTION = "Allows adding tools and additional instruction for the agent."

CARD_PATHS = [
    ".well-known/agent.json",
    "app/ord/agent.json",
]


def build_extension_entry(instruction: bool, tools: bool, prehook: bool, posthook: bool) -> dict:
    supported_hooks = []
    if prehook:
        supported_hooks.append({
            "type": "BEFORE",
            "id": "agent_pre_hook",
            "displayName": "Before Hook",
            "description": "Executed before the main agent logic runs.",
        })
    if posthook:
        supported_hooks.append({
            "type": "AFTER",
            "id": "agent_post_hook",
            "displayName": "After Hook",
            "description": "Executed after the main agent logic runs.",
        })

    return {
        "uri": EXTENSION_URI,
        "description": EXTENSION_DESCRIPTION,
        "required": False,
        "params": {
            "capabilityId": CAPABILITY_ID,
            "displayName": "Default",
            "instructionSupported": instruction,
            "tools": {"additions": {"enabled": tools}},
            "supportedHooks": supported_hooks,
        },
    }


def remove_extension_capabilities(card_data: dict) -> dict:
    capabilities = card_data.get("capabilities", {})
    extensions = capabilities.get("extensions", [])
    extensions[:] = [
        ext for ext in extensions
        if not ext.get("uri", "").startswith(EXTENSION_URI_PREFIX)
    ]
    return card_data


def update_card(card_data: dict, extension_entry: dict) -> dict:
    capabilities = card_data.setdefault("capabilities", {})
    extensions = capabilities.setdefault("extensions", [])

    # Remove any existing extension capability entries (idempotent)
    extensions[:] = [
        ext for ext in extensions
        if not ext.get("uri", "").startswith(EXTENSION_URI_PREFIX)
    ]

    extensions.append(extension_entry)
    return card_data


def main():
    parser = argparse.ArgumentParser(
        description="Add extension capabilities to A2A agent card JSON files."
    )
    parser.add_argument(
        "repo_root",
        type=Path,
        help="Path to the repository root containing agent card files.",
    )
    parser.add_argument("--instruction", action="store_true", help="Enable instruction support.")
    parser.add_argument("--tools", action="store_true", help="Enable tool additions.")
    parser.add_argument("--prehook", action="store_true", help="Add a BEFORE hook.")
    parser.add_argument("--posthook", action="store_true", help="Add an AFTER hook.")
    parser.add_argument("--remove", action="store_true", help="Remove all extension capability entries.")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print modified JSON to stdout without writing files.",
    )

    args = parser.parse_args()

    if not args.remove and not any([args.instruction, args.tools, args.prehook, args.posthook]):
        parser.error("At least one of --instruction, --tools, --prehook, --posthook, or --remove is required.")

    repo_root = args.repo_root.resolve()
    if not repo_root.is_dir():
        print(f"Error: {repo_root} is not a directory.", file=sys.stderr)
        sys.exit(1)

    if not args.remove:
        extension_entry = build_extension_entry(
            instruction=args.instruction,
            tools=args.tools,
            prehook=args.prehook,
            posthook=args.posthook,
        )

    found_any = False
    for rel_path in CARD_PATHS:
        card_file = repo_root / rel_path
        if not card_file.exists():
            print(f"Warning: {card_file} not found, skipping.", file=sys.stderr)
            continue

        found_any = True
        with card_file.open("r", encoding="utf-8") as f:
            card_data = json.load(f)

        if args.remove:
            updated = remove_extension_capabilities(card_data)
        else:
            updated = update_card(card_data, extension_entry)

        output = json.dumps(updated, indent=2, ensure_ascii=False) + "\n"

        if args.dry_run:
            print(f"--- {card_file} ---")
            print(output)
        else:
            with card_file.open("w", encoding="utf-8") as f:
                f.write(output)
            action = "Removed extensions from" if args.remove else "Updated"
            print(f"{action}: {card_file}")

    if not found_any:
        print("Error: No agent card files found at expected paths.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
