"""Assemble real captures into labeled review boards, without inventing app UI."""
from pathlib import Path
from PIL import Image, ImageDraw
import json

root=Path(__file__).resolve().parents[1]
out=root/'.review'
names={
 'handy-bookmark':'Handy Bookmark', 'sticky-wall':'Sticky Wall',
 'asset-forge-studio':'Asset Forge Studio', 'arcane-brigade':'Arcane Brigade',
 'autonomous-creative-studio':'Autonomous Creative Studio',
 'aetherward':'Aetherward','forgebound':'Forgebound','runavelle':'Runavelle',
 'machine-brigade':'Machine Brigade',
}
media=json.loads((root/'src/content/live-media.json').read_text(encoding='utf-8'))
canvas=Image.new('RGB',(1440,960),'#e6e2d8')
d=ImageDraw.Draw(canvas)
for i,(slug,name) in enumerate(names.items()):
 x=i%3*480;y=i//3*320
 items=[m for m in media if '/'+slug+'/' in m['file']]
 d.text((x+16,y+16),name,fill='#192923')
 if items:
  im=Image.open(root/'public'/items[0]['file'].lstrip('/')).convert('RGB')
  im.thumbnail((448,252))
  canvas.paste(im,(x+16+(448-im.width)//2,y+46+(252-im.height)//2))
 else:
  d.text((x+24,y+120),'Capture unavailable: Unity Vulkan crash on emulator.',fill='#583723')
  d.text((x+24,y+144),'No launcher image is presented as gameplay.',fill='#583723')
canvas.save(out/'product-runtime-contact.jpg',quality=92)

site_names=['home-vi','bookmark','sticky','forge','arcane-vi','acs','aether','forgebound','runavelle']
canvas=Image.new('RGB',(1440,1125),'#e6e2d8');d=ImageDraw.Draw(canvas)
for i,name in enumerate(site_names):
 p=out/'world-screenshots'/f'{name}-1440.png'
 if not p.exists():continue
 x=i%3*480;y=i//3*375
 im=Image.open(p).crop((0,0,1440,1020)).convert('RGB').resize((480,340))
 d.text((x+12,y+10),name,fill='#192923');canvas.paste(im,(x,y+35))
canvas.save(out/'site-worlds-contact.jpg',quality=92)
