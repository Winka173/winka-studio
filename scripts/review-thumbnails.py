"""Turn browser evidence into the review board's actual first-screen previews."""
from pathlib import Path
from PIL import Image
import shutil
root=Path(__file__).resolve().parents[1]
dest=root/'public/review-previews';dest.mkdir(parents=True,exist_ok=True)
for direction in ['addy','taste','uipro','gstack']:
    shot=root/'.review/screenshots'/f'{direction}-1440.png'
    if not shot.exists(): raise FileNotFoundError(shot)
    image=Image.open(shot).convert('RGB').crop((0,0,1440,900))
    image.resize((1152,720),Image.Resampling.LANCZOS).save(dest/f'{direction}.webp','WEBP',quality=88,method=6)
    # Public assets are copied verbatim by Next. Refresh a running static review
    # after replacing screenshots without changing any compiled source.
    exported=root/'out/review-previews'
    if (root/'out').exists():
        exported.mkdir(exist_ok=True)
        shutil.copy2(dest/f'{direction}.webp',exported/f'{direction}.webp')
print('Four actual browser screenshot previews prepared.')
