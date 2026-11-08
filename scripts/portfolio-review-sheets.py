from pathlib import Path
from PIL import Image,ImageDraw
import json
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'.review';SHOTS=OUT/'portfolio-qa'

def sheet(names,output,mobile=False):
 width=390 if mobile else 500;height=1900 if mobile else 680;cols=len(names) if mobile else 3
 canvas=Image.new('RGB',(cols*width,((len(names)+cols-1)//cols)*(height+30)),'#dedbd2');draw=ImageDraw.Draw(canvas)
 for i,name in enumerate(names):
  src=SHOTS/f'{name}-{390 if mobile else 1440}.png'
  if not src.exists():continue
  im=Image.open(src).convert('RGB');im=im.crop((0,0,390 if mobile else 1440,1900 if mobile else 1958))
  im=im.resize((width,height));x=i%cols*width;y=i//cols*(height+30)
  draw.text((x+10,y+8),name,fill='#202323');canvas.paste(im,(x,y+30))
 canvas.save(OUT/output,quality=92)

sheet(['home-vi','bookmark-vi','sticky-vi','forge-vi','arcane-vi'],'portfolio-desktop-board.jpg')
sheet(['home-vi','bookmark-vi','sticky-vi','forge-vi','arcane-vi'],'portfolio-mobile-board.jpg',True)
sheet(['aether','forgebound','runavelle','machine','acs','handy-widget'],'portfolio-development-board.jpg')

items=json.loads((ROOT/'src/content/portfolio-media.json').read_text(encoding='utf-8'))
canvas=Image.new('RGB',(1500,1000),'#dedbd2');draw=ImageDraw.Draw(canvas)
slugs=['handy-bookmark','sticky-wall','asset-forge-studio','arcane-brigade','aetherward','forgebound','runavelle','machine-brigade','autonomous-creative-studio']
for i,slug in enumerate(slugs):
 choices=[m for m in items if m['slug']==slug];item=next((m for m in choices if m['device'] in ['desktop','gameplay']),choices[0]);im=Image.open(ROOT/'public'/item['src'].lstrip('/')).convert('RGB');im.thumbnail((470,280));x=i%3*500;y=i//3*333;draw.text((x+14,y+12),slug,fill='#202323');canvas.paste(im,(x+15+(470-im.width)//2,y+42))
canvas.save(OUT/'portfolio-product-captures.jpg',quality=92)
