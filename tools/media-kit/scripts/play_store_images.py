"""Replaces a Play listing's graphics (feature graphic, phone and tablet screenshots) for each language folder, in ONE edit that is
committed only when every upload succeeded (a failure changes nothing). The icon is left alone unless an icon.png is present.
Ask the account owner before running it: it writes to the live store listing.

Folder layout (the same as fastlane's):  <root>/<lang>/images/featureGraphic.png
                                          <root>/<lang>/images/phoneScreenshots/1.png, 2.png, ...
                                          <root>/<lang>/images/sevenInchScreenshots/..., tenInchScreenshots/...
usage: python play_store_images.py <package> <root>
Key: PLAY_KEY or ~/.secrets/play-publisher.json (never print, copy or commit it)."""
import os, sys
from pathlib import Path
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

package, root = sys.argv[1], Path(sys.argv[2])
key = os.environ.get('PLAY_KEY') or str(Path.home() / '.secrets' / 'play-publisher.json')
creds = service_account.Credentials.from_service_account_file(key, scopes=['https://www.googleapis.com/auth/androidpublisher'])
edits = build('androidpublisher', 'v3', credentials=creds, cache_discovery=False).edits()
eid = edits.insert(packageName=package, body={}).execute()['id']
try:
    for lang_dir in sorted(p for p in root.iterdir() if (p / 'images').is_dir()):
        lang, images = lang_dir.name, lang_dir / 'images'
        for kind in ['icon', 'featureGraphic']:
            f = images / f'{kind}.png'
            if f.exists():
                edits.images().deleteall(packageName=package, editId=eid, language=lang, imageType=kind).execute()
                edits.images().upload(packageName=package, editId=eid, language=lang, imageType=kind, media_body=MediaFileUpload(str(f), mimetype='image/png')).execute()
                print(lang, kind)
        for kind in ['phoneScreenshots', 'sevenInchScreenshots', 'tenInchScreenshots']:
            folder = images / kind
            if not folder.is_dir(): continue
            files = sorted(folder.glob('*.png'), key=lambda p: int(p.stem) if p.stem.isdigit() else p.stem)
            edits.images().deleteall(packageName=package, editId=eid, language=lang, imageType=kind).execute()
            for f in files:
                edits.images().upload(packageName=package, editId=eid, language=lang, imageType=kind, media_body=MediaFileUpload(str(f), mimetype='image/png')).execute()
            print(lang, kind, len(files))
    edits.commit(packageName=package, editId=eid).execute()
    print('committed')
except HttpError as e:
    print('FAILED, nothing changed:', e)  # "service currently unavailable" is usually transient: run it again
    try: edits.delete(packageName=package, editId=eid).execute()
    except Exception: pass
    sys.exit(1)
