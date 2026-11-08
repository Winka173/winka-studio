from pathlib import Path
from PIL import Image, ImageDraw

base = Path(r'C:\Users\Winka')
paths = [base/'Projects/Handy-Suite/review-shots/save/desktop-1-home.png', base/'Projects/Handy-Suite/review-shots/save/phone-1-home.png', base/'OneDrive/Documents/Sticky-Wall/screenshots/mode_wall.png', base/'OneDrive/Documents/Sticky-Wall/store/feature_graphic_1024x500.png', base/'Projects/Asset-Forge-Studio/docs/evidence/ui_refinement_create.png', base/'Projects/Asset-Forge-Studio/docs/evidence/workspace_production-export_v093.png']
arc = base/'OneDrive/Documents/Arcane-Brigade/PreviewExports'
paths += list(arc.glob('UIUXAuditAfter/*combat*baseline.png'))[:2]
paths += list(arc.glob('HeroIdentity/*.png'))[:2]
paths += list(arc.glob('MapPacing/*.png'))[:2]
paths += [base/'Projects/Aetherward/Docs/Previews/offline_composite_wave14.png', base/'Projects/Runavelle/Docs/Enhancement/previews/actual_zoom_game.png']
canvas = Image.new('RGB', (1200, ((len(paths)+2)//3)*280), '#e7e5e0')
draw=ImageDraw.Draw(canvas)
for i,p in enumerate(paths):
    try:
        im=Image.open(p).convert('RGB'); im.thumbnail((386,240))
        x,y=(i%3)*400,(i//3)*280
        canvas.paste(im,(x+(400-im.width)//2,y))
        draw.text((x+8,y+244),f'{i}: {p.name[:44]}',fill='#111111')
        print(i, str(p), Image.open(p).size)
    except Exception as exc: print(exc)
canvas.save('.review/contact.jpg')
