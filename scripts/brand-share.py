from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parents[1]
im=Image.new('RGB',(1200,630),'#eeeee7')
d=ImageDraw.Draw(im)
font=ImageFont.truetype(str(root/'public/fonts/Bricolage.ttf'),94)
small=ImageFont.truetype(str(root/'public/fonts/Manrope.ttf'),25)
d.text((70,65),'winka studio',font=font,fill='#253129')
d.text((74,181),'Independent apps & games',font=small,fill='#607057')
for file,box in [('handy-bookmark/library.webp',(74,280,625,595)),('arcane-brigade/combat.webp',(650,280,1126,548))]:
    screenshot=Image.open(root/'public/products'/file).convert('RGB')
    screenshot.thumbnail((box[2]-box[0],box[3]-box[1]))
    im.paste(screenshot,(box[0],box[1]))
im.save(root/'public/brand/share.png',optimize=True)
