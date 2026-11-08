# Media kit tools

Reusable pieces for product pictures, trailers and gameplay videos. The full process is in `docs/MEDIA_PRODUCTION_GUIDE.md`.

- `remotion/`: bespoke Remotion compositions (trailer, gameplay, shared look). Copy them into `OpenMontage/remotion-composer/projects/<slug>/` and restyle `Look.tsx` for the product. They are not built by this site (tsconfig and eslint skip this folder).
- `scripts/render_atelier.py`: render a composition through OpenMontage's `video_compose` (atelier mode) and print its review. Run it from `OpenMontage/projects/`.
- `scripts/make_trailer2.py`: example beat plan. It writes the trailer props (PC and phone) so every cut lands on the music.
- `scripts/music_sections.py`: build a soundtrack from music stems, section by section.
- `scripts/audio_clicks.py`: count clicks per second (recorder faults) and the peak level.
- `scripts/contact_sheet.sh`: one image of timestamped frames, to review a whole clip at once.
- `scripts/play_store_images.py`: replace a Google Play listing's feature graphic and screenshots in one committed edit. Ask the account owner first.
