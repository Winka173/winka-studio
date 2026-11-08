"""Counts clicks (sudden sample jumps) per second in the sound of video or audio files: a clean mix is under 0.2 a second; a
recorder that loses or repeats samples at every frame shows about 30. Also prints the peak level.
usage: python audio_clicks.py <file> [<file> ...]   (ffmpeg on PATH or FFMPEG=path)"""
import os, subprocess, sys
import numpy as np

FF = os.environ.get('FFMPEG', 'ffmpeg')
for path in sys.argv[1:]:
    raw = subprocess.run([FF, '-loglevel', 'error', '-i', path, '-ac', '1', '-ar', '48000', '-f', 's16le', '-'], capture_output=True).stdout
    a = np.frombuffer(raw, dtype=np.int16).astype(float)
    if a.size == 0:
        print(path, 'no sound'); continue
    d2 = np.abs(np.diff(a, 2)); local = np.convolve(d2, np.ones(201) / 201, 'same') + 1
    clicks = np.sum((d2 > 8 * local) & (d2 > 2000)) / (len(a) / 48000)
    peak = 20 * np.log10(max(1, np.abs(a).max()) / 32768)
    print(f'{path}: {clicks:.2f} clicks/s, peak {peak:.1f} dB')
