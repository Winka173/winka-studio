"""Edit a 24-second studio reel from existing owner-supplied product footage.

Requires imageio-ffmpeg and Pillow. No source-product repository is modified.
Run from the website root: python -X utf8 scripts/generate-studio-reel.py
"""
import hashlib
import json
import subprocess
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parent.parent
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
PUBLIC = ROOT / 'public'
OUT = PUBLIC / 'studio'
TEMP = ROOT / '.review' / 'reel-edit'
OUT.mkdir(exist_ok=True)
TEMP.mkdir(parents=True, exist_ok=True)
kits = json.loads((ROOT / 'src/content/website-kits.json').read_text(encoding='utf8'))


def clip(slug, name, form=None):
    return PUBLIC / next(c['src'].lstrip('/') for c in kits[slug]['clips']
                         if c['id'] == name and (not form or '/' + form + '/' in c['src']))


def run(args):
    subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)


scenes = [
    ('Handy Bookmark', '01 / SAVE A LITTLE CURIOSITY', clip('handy-bookmark', 'file-vi'), '#ddd9c6', True),
    ('Sticky Wall', '02 / PIN A LITTLE EVERYDAY LIFE', clip('sticky-wall', 'tick_and_thread'), '#b68b60', True),
    ('Asset Forge Studio', '03 / GIVE AN IDEA ANOTHER DIMENSION', PUBLIC / 'products/asset-forge-studio/workspace.webp', '#172a29', False),
    ('Arcane Brigade', '04 / LEAD THE BRIGADE THROUGH THE NIGHT', clip('arcane-brigade', 'clip-02-fight-wave-14', 'pc'), '#2b1725', True),
]
for i, (title, subtitle, source, color, is_video) in enumerate(scenes):
    # Contain the entire source frame, with readable title plates outside the UI.
    inputs = ['-i', str(source)] if is_video else ['-loop', '1', '-i', str(source)]
    filters = (
        f'scale=1160:558:force_original_aspect_ratio=decrease:force_divisible_by=2,'
        f'pad=1280:720:(ow-iw)/2:(oh-ih)/2+18:color={color},setsar=1,fps=30,'
        'drawbox=x=0:y=0:w=iw:h=78:color=0x111914:t=fill,'
        'drawbox=x=0:y=664:w=iw:h=56:color=0x111914:t=fill,'
        f"drawtext=fontfile=public/fonts/Archivo.ttf:text='{title}':x=45:y=22:fontsize=29:fontcolor=0xf2f0e6,"
        f"drawtext=fontfile=public/fonts/GeistMono.ttf:text='{subtitle}':x=45:y=684:fontsize=15:fontcolor=0xcce5ba,"
        "drawtext=fontfile=public/fonts/GeistMono.ttf:text='W / STUDIO':x=w-tw-45:y=29:fontsize=16:fontcolor=0xcce5ba,"
        'fade=t=in:st=0:d=0.22,fade=t=out:st=5.78:d=0.22'
    )
    run([*inputs, '-t', '6', '-vf', filters, '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-pix_fmt', 'yuv420p', '-threads', '4', str(TEMP / f'{i}.mp4')])
    print('Edited', title, flush=True)

concat = TEMP / 'concat.txt'
concat.write_text('\n'.join("file '" + (TEMP / f'{i}.mp4').as_posix() + "'" for i in range(4)), encoding='utf8')
sound = PUBLIC / 'products/arcane-brigade/kit/03_Clips/trailer-with-sound.mp4'
run(['-f', 'concat', '-safe', '0', '-i', str(concat), '-i', str(sound), '-map', '0:v:0', '-map', '1:a:0', '-t', '24', '-af', 'afade=t=in:d=0.7,afade=t=out:st=22.5:d=1.5,volume=0.65', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', str(OUT / 'showreel.mp4')])
run(['-ss', '1', '-i', str(OUT / 'showreel.mp4'), '-frames:v', '1', '-c:v', 'libwebp', '-quality', '85', str(OUT / 'showreel-poster.webp')])
manifest = {
    'durationSeconds': 24, 'dimensions': [1280, 720], 'autoplay': False,
    'edit': 'Four 6-second chapters; whole source frames contained; title plates outside UI; fades between chapters.',
    'sources': [{'product': s[0], 'path': '/' + s[2].relative_to(PUBLIC).as_posix(), 'sha256': hashlib.sha256(s[2].read_bytes()).hexdigest()} for s in scenes],
    'audio': '/' + sound.relative_to(PUBLIC).as_posix(),
    'credits': ['/vi/apps/handy-bookmark/credits/', '/vi/apps/sticky-wall/credits/'],
    'sha256': hashlib.sha256((OUT / 'showreel.mp4').read_bytes()).hexdigest(),
}
(OUT / 'showreel-provenance.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf8')
print('Created 24-second reel:', (OUT / 'showreel.mp4').stat().st_size, 'bytes', flush=True)
