"""Writes the 2-minute trailer's props (PC and phone) from a beat plan: every shot is a whole number of bars or beats of the
music section it sits in, so cuts land on the beat across the tempo changes (lullaby 66 bpm, Second Act 130 bpm, First Light)."""
import json, sys

A = 60 / 66 * 4          # lullaby bar
B = 60 / 130 * 4         # Second Act bar
END = 3 * 60 / 58 * 4    # First Light, three bars, under the logo

def plan(folder):
    f = lambda n: folder + '/' + n + '.mp4'
    shots, cards, t = [], [], 0.0
    def shot(src, start, secs, **k):
        nonlocal t
        shots.append(dict(src=src if src == 'black' else f(src), start=start, seconds=round(secs, 4), **k)); t0 = t; t += secs; return t0
    def card(kind, at, secs, text, **k): cards.append(dict(kind=kind, at=round(at, 3), seconds=round(secs, 3), text=text, **k))

    # A: the story, in the lullaby (6 bars)
    a = shot('black', 0, A);                                          card('story', a + .3, A - .4, 'Someone came looking for you.')
    a = shot('clip-hub-waiting-room', 0, 2 * A, push=.09, sfx=.3);    card('story', a + .4, 2 * A - .6, 'Eight times. Each time, a lamp was lit.')
    a = shot('clip-02-fight-wave-14', 1.0, A, speed=.8, sfx=.35);     card('story', a + .3, A - .4, 'Now the dark is putting them out.')
    a = shot('clip-hero-comet-runner', 3.0, A, speed=.8, sfx=.35);    card('story', a + .3, A - .4, 'You can no longer remember their voice.')
    a = shot('black', 0, A);                                          card('title', a + .2, A - .2, 'Keep the last lamp burning until dawn.', size=70)
    # B1: the build (12 bars): the two lead heroes and the shop
    a = shot('clip-hero-lantern-knight', 0.0, 4 * B, flash=True);     card('name', a + .4, 4 * B - .6, 'The Lantern Knight', sub='THE GUIDING LAMP')
    a = shot('clip-01-buy-and-star-up', 3.4, 4 * B, push=.03);        card('title', a + .2, 4 * B - .4, 'Recruit odd little friends', sub='Merge them into stars', top=True, size=82)
    a = shot('clip-hero-comet-runner', 1.0, 4 * B, flash=True);       card('name', a + .4, 4 * B - .6, 'The Comet Courier', sub="THE COMET'S WAKE")
    # B2: the full band (30 bars)
    a = shot('clip-visitor', 0.6, 2 * B, flash=True)
    shot('clip-dream-market', 0.5, 2 * B, flash=True)
    shot('clip-secret-room', 0.5, B, flash=True);                     card('title', a + .2, 5 * B - .3, 'Visitors, deals and secret rooms', top=True, size=80)
    a = shot('clip-02-fight-wave-14', 4.0, 2 * B, flash=True);        card('title', a + .2, 2 * B - .3, 'Bonds, duets and combos', top=True, size=80)
    for src, start, name, skill in [('clip-hero-tide-singer', 1.0, 'The Tide Singer', 'THE THREE-INGREDIENT TIDE'), ('clip-hero-velvet-regent', 1.5, 'Velvet Regent', 'THE THREE COMMANDS'),
                                    ('clip-hero-tin-virtuoso', 2.5, 'Tin Virtuoso', 'THE BRIGADE SCORE'), ('clip-hero-lone-jelly', 3.0, 'The Lone Jelly', 'THE MEMORY BODY')]:
        a = shot(src, start, 2 * B, flash=True);                      card('name', a + .2, 2 * B - .3, name, sub=skill)
    a = shot('clip-04-boss-night-4', 0.0, 2 * B, flash=True, sfx=.6); card('title', a + .9, 2 * B + B - 1.0, 'A boss every fourth night', top=True, size=80)
    shot('clip-04-boss-night-4', 7.5, B, sfx=.6)
    shot('clip-05-boss-night-8', 0.0, 2 * B, flash=True, sfx=.6)
    shot('clip-05-boss-night-8', 4.0, B, sfx=.6)
    a = None
    for place in ['glasshouse', 'theatre', 'lamp-hall', 'archive-vault', 'post-office', 'waiting-room']:
        p = shot('clip-place-' + place, 1.0, B / 2, flash=True); a = a if a is not None else p
    card('title', a + .1, 3 * B - .2, 'Six dream places', top=True, size=80)
    shot('clip-hero-comet-runner', 9.6, 2 * B, flash=True, sfx=.6)
    shot('clip-hero-lantern-knight', 10.0, 2 * B, flash=True, sfx=.6)
    shot('clip-hero-comet-runner', 11.0, B, speed=.7, sfx=.6)
    shot('clip-hero-lantern-knight', 12.5, B, flash=True, sfx=.6)
    # the break, then the logo on First Light
    a = shot('black', 0, B);                                          card('title', a + .05, B - .05, 'Twenty nights. Reach the dawn.', size=84)
    return shots, cards, t

for folder, out, w in [('fx', 'trailer2_pc.json', 1920), ('fxm', 'trailer2_phone.json', 2400)]:
    shots, cards, length = plan(folder)
    props = dict(music='music/trailer2.wav', shots=shots, cards=cards, endSeconds=round(END, 3), width=w, height=1080,
                 endLines=['Now on Google Play, the App Store and Steam', 'No ads · Nothing that makes a run stronger is sold'])
    json.dump(props, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(out, 'shots', round(length, 2), 'total', round(length + END, 2))
