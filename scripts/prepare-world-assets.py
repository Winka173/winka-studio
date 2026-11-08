from pathlib import Path
from PIL import Image,ImageDraw
import shutil,json
ROOT=Path(__file__).resolve().parents[1];HOME=Path(r'C:\Users\Winka')
sources={
 'sticky-wall/cork':'OneDrive/Documents/Sticky-Wall/assets/images/wall_cork.jpg',
 'sticky-wall/wood':'OneDrive/Documents/Sticky-Wall/assets/images/wall_wood.jpg',
 'sticky-wall/guitar':'OneDrive/Documents/Sticky-Wall/assets/stickers/art_acoustic_guitar.webp',
 'sticky-wall/leaf':'OneDrive/Documents/Sticky-Wall/assets/stickers/art_autumn_maple_leaf.webp',
 'sticky-wall/bear':'OneDrive/Documents/Sticky-Wall/assets/stickers/art_bear_cub.webp',
 'arcane-brigade/cover':'OneDrive/Documents/Arcane-Brigade/Assets/ArcaneBrigade/Art/Store/FeatureGraphic.png',
 'arcane-brigade/icon':'OneDrive/Documents/Arcane-Brigade/Assets/ArcaneBrigade/Art/Store/AppIcon.png',
 'arcane-brigade/stage':'OneDrive/Documents/Arcane-Brigade/Assets/ArcaneBrigade/Art/Nightmare/NightmareGrandStage_v1.png',
 'asset-forge-studio/tower-front':'Projects/Asset-Forge-Studio/docs/evidence/tower_views_v092/tower-front.png',
 'asset-forge-studio/tower-side':'Projects/Asset-Forge-Studio/docs/evidence/tower_views_v092/tower-side.png',
 'asset-forge-studio/tower-back':'Projects/Asset-Forge-Studio/docs/evidence/tower_views_v092/tower-back.png',
}
manifest=[]
for name,source in sources.items():
 src=HOME/source
 if not src.exists():continue
 im=Image.open(src);im.thumbnail((1800,1800))
 dst=ROOT/'public/products'/f'{name}.webp';dst.parent.mkdir(parents=True,exist_ok=True)
 im.save(dst,'WEBP',quality=90,method=6)
 manifest.append({'file':f'/products/{name}.webp','source':source,'width':im.width,'height':im.height,'kind':'authentic source artwork / texture / render'})
fonts=HOME/'OneDrive/Documents/Sticky-Wall/assets/fonts'
for name in ['Mali-Regular.ttf','OFL-Mali.txt','Sriracha-Regular.ttf','OFL-Sriracha.txt']:
 shutil.copy2(fonts/name,ROOT/'public/fonts'/name)
fonts=HOME/'OneDrive/Documents/Arcane-Brigade/Assets/ArcaneBrigade/Resources/Fonts'
for name in ['Fraunces-Display.ttf','Fraunces-Heading.ttf','Fraunces-OFL.txt','AlegreyaSans-Body.ttf','AlegreyaSans-OFL.txt']:
 shutil.copy2(fonts/name,ROOT/'public/fonts'/name)
shutil.copy2(HOME/'Projects/Handy-Suite/packages/handy_ui/fonts/GeistMono-Regular.ttf',ROOT/'public/fonts/GeistMono.ttf')
(ROOT/'src/content/world-media.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
canvas=Image.new('RGB',(1200,((len(sources)+2)//3)*260),'#e6e1d4');d=ImageDraw.Draw(canvas)
for i,(name,_) in enumerate(sources.items()):
 p=ROOT/'public/products'/f'{name}.webp'
 if not p.exists():continue
 im=Image.open(p).convert('RGBA');im.thumbnail((380,220));x=i%3*400;y=i//3*260
 canvas.paste(im,(x+(400-im.width)//2,y),im);d.text((x+10,y+230),name,fill='#191b1e')
canvas.save(ROOT/'.review/world-assets.jpg')
