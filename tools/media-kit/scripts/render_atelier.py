"""Renders one Arcane Brigade composition through OpenMontage's video_compose (atelier mode) and prints the review.
usage: render_atelier.py <project-id> <composition-id> <props.json> <output.mp4> [scale] [crf]"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from tools.tool_registry import registry

project, comp, props, out = sys.argv[1:5]
scale = float(sys.argv[5]) if len(sys.argv) > 5 else None
crf = int(sys.argv[6]) if len(sys.argv) > 6 else 18
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bespoke = {
    "entry": os.path.join(root, "remotion-composer", "projects", "arcane-brigade", "index.tsx"),
    "composition_id": comp,
    "props_path": os.path.abspath(props),
    "public_dir": os.path.join(root, "remotion-composer", "projects", "arcane-brigade", "public"),
    "crf": crf,
    "art_direction": "Storybook at night: the game's own footage under a warm lamp grade and vignette; Young Serif titles in lamp gold "
                     "with a gilded rule, Fraunces names on a crimson ribbon, embers drifting; cuts land on the beat with a gold flash; "
                     "music is the game's own Second Act stems re-arranged to build, break and land on the logo.",
}
if scale: bespoke["scale"] = scale
registry.discover()
tool = registry.get("video_compose")
edit = {"composition_mode": "atelier", "render_runtime": "remotion", "bespoke": bespoke}
result = tool.execute({"operation": "render", "edit_decisions": edit, "output_path": os.path.abspath(out)})
print("success:", result.success)
if not result.success: print("error:", result.error)
data = result.data or {}
review = data.get("final_review") or data.get("review") or {}
print(json.dumps({k: review.get(k) for k in ("status", "issues_found", "recommended_action")}, indent=1, default=str)[:3000])
