"""Copy and optimize selected authentic media. Original product repos stay read-only."""
from pathlib import Path
from PIL import Image
import json, shutil, urllib.request

root=Path(__file__).resolve().parents[1]
home=Path(r'C:\Users\Winka')
items={
 'handy-bookmark/library': 'Projects/Handy-Suite/docs/product-review/evidence/after/bookmark/desktop-1-home.png',
 'handy-bookmark/phone': 'Projects/Handy-Suite/docs/product-review/evidence/after/bookmark/phone-1-home.png',
 'handy-bookmark/collection': 'Projects/Handy-Suite/docs/product-review/evidence/after/bookmark/phone-2-collection.png',
 'handy-bookmark/focus': 'Projects/Handy-Suite/docs/product-review/evidence/after/bookmark/phone-6-focus.png',
 'handy-bookmark/icon': 'Projects/Handy-Suite/apps/handy_bookmark/assets/icon.png',
 'sticky-wall/wall': 'OneDrive/Documents/Sticky-Wall/screenshots/mode_wall.png',
 'sticky-wall/editor': 'OneDrive/Documents/Sticky-Wall/screenshots/editor.png',
 'sticky-wall/night': 'OneDrive/Documents/Sticky-Wall/screenshots/night.png',
 'sticky-wall/grid': 'OneDrive/Documents/Sticky-Wall/screenshots/mode_grid.png',
 'sticky-wall/icon': 'OneDrive/Documents/Sticky-Wall/store/icon_512.png',
 'sticky-wall/cover': 'OneDrive/Documents/Sticky-Wall/store/feature_graphic_1024x500.png',
 'asset-forge-studio/workspace': 'Projects/Asset-Forge-Studio/docs/evidence/workspace_production-export_v093.png',
 'asset-forge-studio/create': 'Projects/Asset-Forge-Studio/docs/evidence/ui_refinement_create.png',
 'arcane-brigade/combat': 'OneDrive/Documents/Arcane-Brigade/PreviewExports/LocalizationUIFix/07-combat-vi.png',
 'aetherward/concept': 'Projects/Aetherward/Docs/Previews/offline_composite_wave14.png',
 'forgebound/forge': 'Projects/Forgebound/reports/quality/combat_20261023/04_forge.png',
}
manifest=[]
for name,path in items.items():
 source=home/path
 if not source.exists():
  # The after-audit set only includes some screens; the earlier authentic
  # captures remain valid screenshots, never substitute a drawn mockup.
  fallback=home/path.replace('docs/product-review/evidence/after/bookmark','review-shots/save')
  if fallback.exists(): source=fallback
  else: raise FileNotFoundError(source)
 im=Image.open(source).convert('RGBA' if 'icon' in name else 'RGB')
 im.thumbnail((1800,1800))
 dest=root/'public/products'/f'{name}.webp'
 dest.parent.mkdir(parents=True,exist_ok=True)
 im.save(dest,'WEBP',quality=88,method=6)
 manifest.append({'file':f'/products/{name}.webp','source':str(source.relative_to(home)), 'width':im.width,'height':im.height,'bytes':dest.stat().st_size,'kind':'simulation composite' if name=='aetherward/concept' else 'authentic screenshot or product icon'})
 print(name,im.size,dest.stat().st_size)
font_dir=root/'public/fonts'; font_dir.mkdir(parents=True,exist_ok=True)
local_fonts={
 'Manrope.ttf':'Projects/Handy-Suite/apps/handy_widget/fonts/Manrope-Variable.ttf',
 'Manrope-OFL.txt':'Projects/Handy-Suite/apps/handy_widget/fonts/Manrope-OFL.txt',
 'Newsreader.ttf':'Projects/Handy-Suite/apps/handy_bookmark/fonts/Newsreader-Regular.ttf',
 'Newsreader-OFL.txt':'Projects/Handy-Suite/apps/handy_bookmark/fonts/Newsreader-OFL.txt',
 'Bricolage.ttf':'Projects/Handy-Suite/packages/handy_ui/fonts/BricolageGrotesque-Display.ttf',
}
for dest,source in local_fonts.items(): shutil.copy2(home/source,font_dir/dest)
downloads={
 'FunnelDisplay.ttf':'ofl/funneldisplay/FunnelDisplay%5Bwght%5D.ttf',
 'FunnelSans.ttf':'ofl/funnelsans/FunnelSans%5Bwght%5D.ttf',
 'Funnel-OFL.txt':'ofl/funneldisplay/OFL.txt',
 'Archivo.ttf':'ofl/archivo/Archivo%5Bwdth,wght%5D.ttf',
 'Archivo-OFL.txt':'ofl/archivo/OFL.txt',
 'Bricolage-OFL.txt':'ofl/bricolagegrotesque/OFL.txt',
}
for dest,source in downloads.items():
 if not (font_dir/dest).exists(): urllib.request.urlretrieve('https://raw.githubusercontent.com/google/fonts/main/'+source,font_dir/dest)
manifest_path=root/'src/content/media-manifest.json'
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
