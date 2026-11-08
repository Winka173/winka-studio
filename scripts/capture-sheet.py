from pathlib import Path
from PIL import Image,ImageDraw
root=Path('.review/product-captures');paths=[]
for folder in sorted(root.iterdir()):
 if folder.is_dir():paths+=list(folder.glob('*.png'))[:3]
canvas=Image.new('RGB',(1440,((len(paths)+3)//4)*260),'#ddd9cf');d=ImageDraw.Draw(canvas)
for i,p in enumerate(paths):
 try:
  im=Image.open(p).convert('RGB');im.thumbnail((344,220));x=i%4*360;y=i//4*260;canvas.paste(im,(x+(360-im.width)//2,y));d.text((x+5,y+225),f'{p.parent.name}: {p.name[:23]}',fill='#111')
 except Exception as exc:print(exc)
canvas.save('.review/live-captures.jpg')
