from pathlib import Path
from PIL import Image,ImageStat
import json
ROOT=Path(__file__).resolve().parents[1]
captures=ROOT/'.review/product-captures'
selected={
 'aetherward/runtime-battle':captures/'aetherward/battle.png',
 'forgebound/runtime-title':captures/'forgebound/01_title.png',
 'forgebound/runtime-forge':captures/'forgebound/04_forge.png',
 'forgebound/runtime-combat':captures/'forgebound/06_battle_mid.png',
 'runavelle/runtime-day':captures/'runavelle/day.png',
 'runavelle/runtime-night':captures/'runavelle/night.png',
 'arcane-brigade/runtime-combat':captures/'arcane-brigade/Combat-07.png',
 'arcane-brigade/runtime-boss':captures/'arcane-brigade/Boss-20.png',
 'arcane-brigade/runtime-shop':captures/'arcane-brigade/Shop-kind-eyes.png',
 'sticky-wall/runtime-wall':captures/'sticky-wall/android-launch.png',
 'handy-bookmark/runtime-onboarding':captures/'handy-bookmark/android-launch.png',
 'autonomous-creative-studio/runtime-home':captures/'autonomous-creative-studio/runtime-0.png',
 'autonomous-creative-studio/runtime-create':captures/'autonomous-creative-studio/runtime-1.png',
 'asset-forge-studio/runtime-home':captures/'asset-forge-studio/runtime-0.png',
}
manifest=[]
for name,src in selected.items():
 if not src.exists():print('MISSING',name,src.name);continue
 im=Image.open(src).convert('RGB')
 if max(ImageStat.Stat(im.resize((64,64))).stddev)<2:raise ValueError(f'Blank capture: {src}')
 im.thumbnail((1920,1600));dest=ROOT/'public/products'/f'{name}.webp';dest.parent.mkdir(parents=True,exist_ok=True);im.save(dest,'WEBP',quality=90,method=6)
 manifest.append({'file':f'/products/{name}.webp','capturedFrom':str(src.relative_to(ROOT)),'width':im.width,'height':im.height,'kind':'actual runtime screenshot','capturedOn':'2026-11-08'})
(ROOT/'src/content/live-media.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
