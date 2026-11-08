"""Builds a trailer soundtrack from a game's music stems, section by section, so the music rises, breaks and lands instead of
looping flat. Each section names a track, its bars, its tempo and which stems play. Sections are cut on bar lines and joined.
Edit SECTIONS for the product, then: python music_sections.py <stems-root> <out.wav>
Stems are expected as <root>/<track>/<track>_<stem>.ogg (base, rhythm, melody, intensity); they loop if a section is longer."""
import os, subprocess, sys

FF = os.environ.get('FFMPEG', 'ffmpeg')
# (track, bpm, beats per bar, bars, stems, fade in seconds, fade out seconds)
SECTIONS = [
    ('menu_moth', 66, 4, 6, ['base', 'melody'], 2.5, 0.8),                       # the story, quiet
    ('combat_secondact', 130, 4, 12, ['base', 'rhythm', 'melody'], 0, 0),        # the build
    ('combat_secondact', 130, 4, 30, ['base', 'rhythm', 'melody', 'intensity'], 0, 0),  # the full band
    ('combat_secondact', 130, 4, 1, ['intensity'], 0, 1.8),                      # the break before the logo
    ('ending_dawn', 58, 4, 3, ['base', 'melody', 'intensity'], 0.3, 4),         # under the logo
]

root, out = sys.argv[1], sys.argv[2]
parts = []
for i, (track, bpm, per_bar, bars, stems, fin, fout) in enumerate(SECTIONS):
    length = bars * per_bar * 60 / bpm
    cmd = [FF, '-loglevel', 'error', '-y']
    for s in stems: cmd += ['-stream_loop', '-1', '-i', os.path.join(root, track, f'{track}_{s}.ogg')]
    chain = ''.join(f'[{k}:a]' for k in range(len(stems))) + f'amix=inputs={len(stems)}:normalize=0,atrim=0:{length:.4f}'
    if fin: chain += f',afade=t=in:d={fin}'
    if fout: chain += f',afade=t=out:st={length - fout:.4f}:d={fout}'
    part = f'{out}.part{i}.wav'
    subprocess.run(cmd + ['-filter_complex', chain + '[o]', '-map', '[o]', '-ar', '48000', '-ac', '2', part], check=True)
    parts.append(part); print(f'section {i}: {track} {bars} bars = {length:.2f}s')
cmd = [FF, '-loglevel', 'error', '-y'] + sum([['-i', p] for p in parts], [])
chain = ''.join(f'[{k}:a]' for k in range(len(parts))) + f'concat=n={len(parts)}:v=0:a=1,volume=-1dB,alimiter=limit=0.89[o]'
subprocess.run(cmd + ['-filter_complex', chain, '-map', '[o]', out], check=True)
for p in parts: os.remove(p)
print('wrote', out)
