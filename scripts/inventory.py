"""Read-only source inventory. Never executes product code or reads secret files."""
from pathlib import Path
import json, subprocess

ROOT = Path(__file__).resolve().parents[1]
sources = {
    'handy-suite': Path(r'C:\Users\Winka\Projects\Handy-Suite'),
    'asset-forge-studio': Path(r'C:\Users\Winka\Projects\Asset-Forge-Studio'),
    'aetherward': Path(r'C:\Users\Winka\Projects\Aetherward'),
    'forgebound': Path(r'C:\Users\Winka\Projects\Forgebound'),
    'autonomous-creative-studio': Path(r'C:\Users\Winka\Projects\mmo'),
    'machine-brigade': Path(r'C:\Users\Winka\Projects\MachineBrigade'),
    'runavelle': Path(r'C:\Users\Winka\Projects\Runavelle'),
    'arcane-brigade': Path(r'C:\Users\Winka\OneDrive\Documents\Arcane-Brigade'),
    'sticky-wall': Path(r'C:\Users\Winka\OneDrive\Documents\Sticky-Wall'),
}
inventory = {}
for slug, source in sources.items():
    listing = subprocess.run(['rg', '--files', '-g', '!node_modules', '-g', '!Library', '-g', '!build', '-g', '!Builds', '-g', '!dist', '-g', '!.venv', '-g', '!.dart_tool', '-g', '!third_party', '-g', '!ArtCache', '-g', '!data', '-g', '!data_crawl', '-g', '!logs', '-g', '!Logs'], cwd=source, capture_output=True, text=True, encoding='utf-8').stdout.splitlines()
    selected = [p for p in listing if Path(p).suffix.lower() in ['.png','.jpg','.webp','.ttf','.woff2'] or any(x in p.lower() for x in ['privacy', 'pubspec.yaml', 'androidmanifest.xml', 'package.json', 'theme', 'privacy', 'handoff'])]
    inventory[slug] = {'source': str(source), 'files': selected}
    print(f'{slug}: {len(listing)} source files; {len(selected)} media/manifest candidates')
(ROOT / '.review').mkdir(exist_ok=True)
(ROOT / '.review' / 'source-inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2), encoding='utf-8')
