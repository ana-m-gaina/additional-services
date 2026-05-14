import json
from pathlib import Path

def open_translation(path: str | Path) -> dict:
    """
    Opens the translation file and returns a dict object
    """

    with open(path, "r") as inf:
        return json.load(inf)


def remove_disabled_tools(obj: dict) -> dict:
    """
    Iterates over the tools array.
    If any tools contains a "disabled" property with the value set to true, that tool is removed.
    """
    
    if "tools" not in obj:
        print("No tools in this file.")
        return obj
    
    old_num_tools = len(obj.get("tools", []))
    print(f"Found {old_num_tools} tools.")

    obj["tools"] = [t for t in obj.get("tools", []) if "disabled" not in t or t["disabled"] is False]
    new_num_tools = len(obj["tools"])

    print(f"Removed {old_num_tools - new_num_tools} disabled tool(s) ({new_num_tools} remained)." if new_num_tools != old_num_tools else "No tools were disabled. Tools array kept as-is.")

    return obj


def strip_disabled_properties(obj: dict) -> dict:
    """
    Iterates over the tools array.
    Deletes all "disabled" properties, if any are found.

    Ensure that remove_disabled_tools is called before this function to avoid losing information about disabled tools.
    """

    found_disabled = False

    for t in obj.get("tools", []):
        if "disabled" in t:
            del t["disabled"]
            found_disabled = True

    print("Removed all `disabled` properties from the tools array." if found_disabled else "No `disabled` properties found in the tools array.")

    return obj


if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("You must call this script with exactly one argument (the path to the translation file)")
        sys.exit(1)

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"Specified file doesn't exist ({path})")
        sys.exit(1)

    if not path.is_file():
        print(f"Specified path isn't a file ({path})")
        sys.exit(1)

    obj = strip_disabled_properties(remove_disabled_tools(open_translation(path)))
    with open(path, "w") as out:
        json.dump(obj, out, indent=4)
    
    print("Successfully cleaned the translation file.")
    sys.exit(0)
