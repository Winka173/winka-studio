"""Import owner-supplied kits without changing the source kits or personal app data."""
from pathlib import Path
from PIL import Image
import json, re, shutil, hashlib, subprocess, argparse
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
DOCS = Path('C:/Users/Winka/OneDrive/Documents')
KITS = {
 'handy-bookmark': DOCS/'Handy-Website-Kit/handy-bookmark',
 'handy-boards': DOCS/'Handy-Website-Kit/handy-boards',
 'sticky-wall': DOCS/'Sticky-Wall/docs/website',
 'arcane-brigade': DOCS/'Arcane-Brigade-Website-Kit',
}
OUT = ROOT/'public/products'
DATA = ROOT/'src/content'
FF = imageio_ffmpeg.get_ffmpeg_exe()
media, films, provenance, kits = [], [], [], {}
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--only', nargs='+', choices=list(KITS), help='Import selected kits, preserving every other kit')
args = parser.parse_args()
selected = set(args.only or KITS)
if args.only:
 kits = json.loads((DATA/'website-kits.json').read_text(encoding='utf-8'))
 media = [m for m in json.loads((DATA/'kit-media.json').read_text(encoding='utf-8')) if m['slug'] not in selected]
 films = [m for m in json.loads((DATA/'kit-films.json').read_text(encoding='utf-8')) if m['slug'] not in selected]
 provenance = [m for m in json.loads((ROOT/'docs/website-kits/import-manifest.json').read_text(encoding='utf-8')) if not any(m['file'].startswith(f'public/products/{slug}/') for slug in selected)]

def read(root, name): return (root/name).read_text(encoding='utf-8-sig').strip()
def between(text, start, end=None):
 part=text.split(start,1)[1] if start in text else ''
 return part.split(end,1)[0].strip() if end else part.strip()
def section(text, names):
 for name in names:
  match=re.search(r'^## '+re.escape(name)+r'\s*\n(.*?)(?=^## |\Z)',text,re.M|re.S)
  if match:return match[1].strip()
 return ''
def clean(text):
 text=re.sub(r'<!--.*?-->','',text,flags=re.S)
 # Paragraphs that are directions to the website builder are not product copy.
 paragraphs=[]
 for p in re.split(r'\n\s*\n',text):
  if p.startswith(('**Visual:**','**Image:**','**Hình:**','**Heading:**','Each block has','Short footer line','Dòng chân trang','Suggested footer line:','No reviews, user counts','Chưa có đánh giá')):continue
  if re.match(r'\s*(Ảnh|Hình|Image|Images|Screenshot|Screenshots|Clip|Clips|Picture|Pictures|Use the |Do not show|Source of truth|Source:|Checked |Đã đối chiếu|Số liệu|Tên ảnh|Mọi thứ dưới|Phần \*|\*\[)',p): continue
  if re.search(r'`(?:highlights/|screenshots/|02_Screenshots/|03_Clips/)',p) and not p.startswith('|'): continue
  p=re.sub(r'\*\[[\s\S]*?\]\*','',p)
  p=re.sub(r'\n(?:Ảnh|Hình|Image|Images|Pictures?|Screenshots?|Clips?):.*','',p,flags=re.S)
  p=re.sub(r'(?m)^---\s*$','',p)
  if p.strip():paragraphs.append(p.strip())
 return '\n\n'.join(paragraphs).strip()
def faq(text):
 result=[]
 for m in re.finditer(r'^\*\*(.+?\?)\*\*\s*(.*?)(?=^\*\*.+?\?\*\*|^---|^## |\Z)',text,re.M|re.S):
  answer=clean(m[2]).strip()
  if answer:result.append({'question':m[1],'answer':answer})
 return result
def image(slug,root,p,rel=None,maxsize=1920):
 rel=Path(rel or p.relative_to(root)).with_suffix('.webp')
 target=OUT/slug/'kit'/rel; target.parent.mkdir(parents=True,exist_ok=True)
 with Image.open(p) as original:
  im=original.convert('RGBA' if original.mode=='RGBA' else 'RGB')
  im.thumbnail((maxsize,maxsize*2),Image.Resampling.LANCZOS)
  if not target.exists() or target.stat().st_mtime < p.stat().st_mtime:
   im.save(target,'WEBP',quality=85,method=6)
  width,height=im.size
 src='/'+target.relative_to(ROOT/'public').as_posix()
 provenance.append({'file':target.relative_to(ROOT).as_posix(),'source':str(p),'kind':'optimized-image','width':width,'height':height})
 return src,width,height
def screenshot(slug,root,p,locale,device,en,vi,pro=False,theme='light'):
 src,w,h=image(slug,root,p,maxsize=1800)
 media.append(dict(slug=slug,id=p.stem,src=src,device=device,width=w,height=h,title={'en':en,'vi':vi},kind='kit-source-render' if slug in ['handy-bookmark','handy-boards'] else 'kit-game-capture' if slug=='arcane-brigade' else 'kit-device-capture',source=str(p),locale=locale,pro=pro,theme=theme))
def movie(slug,root,p):
 target=OUT/slug/'kit'/p.relative_to(root);target.parent.mkdir(parents=True,exist_ok=True)
 if not target.exists() or target.stat().st_mtime < p.stat().st_mtime:
  # Quiet, local H.264 delivery copy. Scale to a practical viewport; no retiming.
  with open(ROOT/'.review/kit-encode.log','a',encoding='utf-8') as log:
   subprocess.run([FF,'-y','-i',str(p),'-an','-vf','scale=\'min(1280,iw)\':-2','-c:v','libx264','-preset','veryfast','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart',str(target)],check=True,stdout=log,stderr=log)
 poster=target.with_name(target.stem+'-poster.webp')
 if not poster.exists():
  subprocess.run([FF,'-y','-ss','0.5','-i',str(target),'-frames:v','1','-q:v','80',str(poster)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 src='/'+target.relative_to(ROOT/'public').as_posix();post='/'+poster.relative_to(ROOT/'public').as_posix()
 films.append({'slug':slug,'file':target.relative_to(ROOT).as_posix(),'source':str(p),'kind':'owner-kit-frame-render' if slug in ['handy-bookmark','handy-boards'] else 'owner-kit-native-capture','poster':post})
 provenance.append({'file':target.relative_to(ROOT).as_posix(),'source':str(p),'kind':'muted-web-video'})
 return {'id':p.stem,'src':src,'poster':post,'source':str(p)}
def captions_table(text):
 result={}
 for line in text.splitlines():
  cells=[c.strip() for c in line.strip().strip('|').split('|')]
  if len(cells)>=4 and '`' in cells[0]:
   filename=re.search(r'`([^`]+)`',cells[0])
   if filename: result[filename[1]]=(cells[-2],cells[-1])
 return result
def pages_legal(slug,r):
 if slug in ['handy-bookmark','handy-boards']:
  legal={}
  for kind in ['privacy','terms']:
   raw=read(r,f'legal/{kind}.md');preamble=raw.split('## English')[0].strip().removesuffix('---').strip()
   for lang,mark in [('en','## English'),('vi','## Tiếng Việt')]:
    body=between(raw,mark,'## Tiếng Việt' if lang=='en' else None).removesuffix('---').strip()
    legal.setdefault(lang,{})[kind]=preamble+'\n\n'+body
  return legal
 if slug=='sticky-wall':return {lang:{k:read(r,f'legal/{k}.{lang}.md') for k in ['privacy','terms']} for lang in ['en','vi']}
 result={}
 for k,name in [('privacy','privacy-policy'),('terms','terms-of-service')]:
  raw=read(r,f'05_Legal/{name}.md');parts=re.split(r'\n---\s*\n',raw,maxsplit=1)
  result.setdefault('en',{})[k]=parts[0].strip();result.setdefault('vi',{})[k]=parts[1].strip()
 return result

for slug,r in KITS.items():
 if slug not in selected:continue
 print(f'Importing {slug}',flush=True)
 assets={};clips=[];pages={};faqs={};pricing={};legal=pages_legal(slug,r)
 # Preserve the complete textual kit as editorial evidence, including known caveats.
 archive=ROOT/'docs/website-kits'/slug
 for p in r.rglob('*'):
  if p.is_file() and p.suffix.lower() in ['.md','.json','.csv','.txt']:
   target=archive/p.relative_to(r);target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,target)
 if slug=='handy-boards':
  captions=json.loads(read(r,'data/captions.json'))
  priority=['01-home','02-board','08-templates','05-card','20-my-work']
  files=sorted((r/'screenshots').rglob('*.png'),key=lambda p:(next((i for i,k in enumerate(priority) if p.stem.endswith(k)),99),p.as_posix()))
  for p in files:
   c=captions[p.relative_to(r).as_posix()]
   screenshot(slug,r,p,c['lang'],c['form'],c['alt_en'],c['alt_vi'],c['pro'],c['theme'])
   media[-1]['newInNextUpdate']=c.get('new_in_next_update',False)
  for p in (r/'highlights').iterdir():
   if p.suffix.lower() in ['.png','.jpg']:assets[p.relative_to(r).as_posix()]=image(slug,r,p)[0]
  highlights={}
  for lang in ['en','vi']:
   full=read(r,f'copy/{lang}/features.md')
   feature_body=full[full.index('## 1.'):].split('## Newer than the store' if lang=='en' else '## Mới hơn bản trên Play')[0]
   feature_body=re.sub(r'(?m)^Screens?:.*$','',feature_body)
   feature_body=re.sub(r'\([^()\n]*`[^()\n]*(?:\.png|…-)[^()\n]*\)','',feature_body)
   feature_body=clean(feature_body)+'\n\n## '+('Next-update preview\n\nThe new timeline, multi-category selection and suggested template fields are not in Google Play 1.0.0 (3) yet. The screenshots show the next update.' if lang=='en' else 'Bản cập nhật tới\n\nDòng thời gian mới, chọn nhiều nhóm và trường gợi ý của mẫu chưa có trong Google Play 1.0.0 (3). Các ảnh mô tả bản cập nhật kế tiếp.')
   pages[lang]={'features':feature_body,'press':clean(read(r,f'copy/{lang}/press.md')),'comparison':clean(read(r,'copy/why-handy-boards.md')),'credits':('Handy Boards by Winka Studio.\n\nScreens and films are rendered from the real Flutter UI using demonstration data; they are not device recordings. Plus Jakarta Sans is bundled under the SIL Open Font License.' if lang=='en' else 'Handy Boards của Winka Studio.\n\nẢnh và clip được kết xuất từ giao diện Flutter thật với dữ liệu minh họa; không phải bản quay thiết bị. Plus Jakarta Sans được đóng gói theo SIL Open Font License.')}
   faqs[lang]=faq(read(r,f'copy/{lang}/faq.md'))
   pricing[lang]=between(read(r,'copy/pro-vs-free.md'),'## English','## Tiếng Việt') if lang=='en' else between(read(r,'copy/pro-vs-free.md'),'## Tiếng Việt')
   changes=read(r,'copy/changelog.md')
   pages[lang]['changelog']=between(changes,'## English','## Tiếng Việt') if lang=='en' else between(changes,'## Tiếng Việt')
   highlights[lang]=[]
   for m in re.finditer(r'^## ([1-6])\. ([^\n]+)\n(.*?)(?=^## |\Z)',read(r,f'copy/{lang}/highlights.md'),re.M|re.S):
    matches=re.findall(r'`(highlights/[^`]+)`',m[3]);picture=next((v for v in matches if 'desktop' in v),matches[0])
    clip=re.search(r'`clips/([^`]+)\.mp4`',m[3])
    body=clean(re.split(r'(?m)^(?:Image|Ảnh|Hình):',m[3])[0])
    highlights[lang].append({'title':m[2].strip(),'body':body,'image':assets[picture],'clipId':clip[1] if clip else None,'newInNextUpdate':m[1] in ['2','3','4']})
  assets['icon']=image(slug,r,r/'brand/icon/icon-rounded-1024.png')[0]
  for lang in ['en','vi']:assets['og-'+lang]=image(slug,r,r/f'brand/social/og-1200x630-{lang}.png')[0]
  kits.setdefault(slug,{})['highlights']=highlights
 elif slug=='handy-bookmark':
  captions=json.loads(read(r,'data/captions.json'))
  # Favor the landing-page strip first; all remaining screens stay explorable.
  priority=['13-share-sheet','01-home','03-collection-cards','18-search-results','20-focus','22-reader','17-picture']
  files=sorted((r/'screenshots').rglob('*.png'),key=lambda p:(next((i for i,k in enumerate(priority) if p.stem.endswith(k)),99),p.as_posix()))
  for p in files:
   c=captions[p.relative_to(r).as_posix()]
   screenshot(slug,r,p,c['lang'],c['form'],c['alt_en'],c['alt_vi'],c['pro'],c['theme'])
  for p in (r/'highlights').iterdir():
   if p.suffix.lower() in ['.png','.jpg']:assets[p.relative_to(r).as_posix()]=image(slug,r,p)[0]
  for lang in ['en','vi']:
   full=read(r,f'copy/{lang}/features.md');pages[lang]={'features':clean(full[full.index('## 1.'):]),'press':clean(read(r,f'copy/{lang}/press.md')),'credits':read(r,'data/photos/CREDITS.md'),'comparison':clean(read(r,'copy/why-handy-bookmark.md'))}
   faqs[lang]=faq(read(r,f'copy/{lang}/faq.md'))
   prices=read(r,'copy/pro-vs-free.md');pricing[lang]=between(prices,'## English table','## Bảng tiếng Việt') if lang=='en' else between(prices,'## Bảng tiếng Việt')
  # Changelog is kept complete, with EN/VI blocks selected without internal notes.
  changes=read(r,'copy/changelog.md')
  for lang in ['en','vi']:
   entries=[]
   for m in re.finditer(r'^## (.+)\n(.*?)(?=^## |\Z)',changes,re.M|re.S):
    body=between(m[2],'**EN**','**VI**') if lang=='en' else between(m[2],'**VI**')
    body=body.split('> Left out')[0].strip();entries.append('## '+m[1]+'\n\n'+body)
   pages[lang]['changelog']='\n\n'.join(entries)
  assets['icon']=image(slug,r,r/'brand/icon/icon-rounded-1024.png')[0]
  for lang in ['en','vi']:assets['og-'+lang]=image(slug,r,r/f'brand/social/og-1200x630-{lang}.png')[0]
 elif slug=='sticky-wall':
  caps=captions_table(read(r,'screenshots/INDEX.md'))
  for p in sorted((r/'screenshots').rglob('*.webp')):
   if p.stem=='21_pro':continue # Kit explicitly forbids exposing the test price.
   form,lang=p.relative_to(r/'screenshots').parts[:2];en,vi=caps.get(p.stem,(p.stem,p.stem))
   screenshot(slug,r,p,lang,'mobile' if form=='phone' else 'desktop',en,vi)
  for lang in ['en','vi']:
   full=read(r,f'content/landing.{lang}.md');faqs[lang]=faq(section(full,['FAQ','Câu hỏi thường gặp']))
   start='## Three things to know' if lang=='en' else '## Ba điểm nổi bật'
   # All product feature sections, excluding SEO, footer and builder directions.
   headings=list(re.finditer(r'^## (.+)',full,re.M))
   featureparts=[]
   for i,h in enumerate(headings):
    title=h[1].removeprefix('Section: ');body=full[h.end():headings[i+1].start() if i+1<len(headings) else len(full)]
    if title.startswith(('SEO','Hero','Phần đầu','FAQ','Câu hỏi','Final','Footer','Lời kêu gọi','Chân trang','Sticky Wall Pro')):continue
    featureparts.append('## '+title+'\n'+clean(body))
   pages[lang]={'features':'\n\n'.join(featureparts),'credits':read(r,'CREDITS.md')}
   pro=next((full[h.end():headings[i+1].start() if i+1<len(headings) else len(full)] for i,h in enumerate(headings) if h[1].removeprefix('Section: ').startswith('Sticky Wall Pro')),'')
   pricing[lang]=clean(pro)
   for item in faqs[lang]:
    if 'iPhone' in item['question']:item['answer']='An iPhone version is planned; it is not on the App Store.' if lang=='en' else 'Bản iPhone đang được lên kế hoạch, chưa có trên App Store.'
   if not any('iPhone' in item['question'] for item in faqs[lang]):faqs[lang].append({'question':'Is there an iPhone version?' if lang=='en' else 'Có bản cho iPhone không?','answer':'An iPhone version is planned; it is not on the App Store.' if lang=='en' else 'Bản iPhone đang được lên kế hoạch, chưa có trên App Store.'})
  for p in (r/'media/walls').glob('*.jpg'):assets[p.relative_to(r).as_posix()]=image(slug,r,p,maxsize=1000)[0]
  assets['icon']=image(slug,r,r/'brand/logo/app-icon-1024.png')[0]
  for lang in ['en','vi']:assets['og-'+lang]=image(slug,r,r/('brand/og-image-1200x630-vi.jpg' if lang=='vi' else 'brand/og-image-1200x630.jpg'))[0]
 else:
  for form in ['pc','mobile','vietnamese']:
   caps=captions_table(read(r,f'02_Screenshots/{form}/_captions.md'))
   for p in sorted((r/f'02_Screenshots/{form}').glob('*.jpg')):
    en,vi=caps.get(p.name,(p.stem,p.stem));screenshot(slug,r,p,'vi' if form=='vietnamese' else 'shared','mobile' if form=='mobile' else 'desktop',en,vi)
  for lang in ['en','vi']:
   full=read(r,f'04_Copy/website-copy.{lang}.md')
   pages[lang]={'features':clean(section(full,['Feature blocks','Các khối tính năng'])),'press':clean(section(full,['Press kit facts','Thông tin báo chí'])),'credits':'Game by Winka Studio.\n\nFonts: Noto, Be Vietnam Pro, Alegreya Sans, Caveat, Coiny, Fraunces, Lilita One, Young Serif (SIL Open Font License).\n\nSome sound effects use CC0 recordings by [Kenney](https://kenney.nl/).'}
   faqs[lang]=faq(section(full,['FAQ','Hỏi đáp']));pricing[lang]=clean(section(full,['Price and business model (state it plainly)','Price and monetisation','Price and monetization','Giá và cách kiếm tiền']))
   if not pages[lang]['press']:pages[lang]['press']='| | |\n|---|---|\n| '+('Trò chơi' if lang=='vi' else 'Title')+' | Arcane Brigade |\n| Studio | Winka Studio |\n| '+('Thể loại' if lang=='vi' else 'Genre')+' | Auto-battler / roguelite / storybook |\n| '+('Nền tảng' if lang=='vi' else 'Platforms')+' | Google Play, App Store, Steam |\n| '+('Giá' if lang=='vi' else 'Price')+' | '+('Miễn phí; Deluxe tùy chọn, mua một lần' if lang=='vi' else 'Free; optional one-time Deluxe')+' |\n| Contact | apps.winka.studio@gmail.com |'
  for p in (r/'01_Brand').glob('*.png'):assets[p.relative_to(r).as_posix()]=image(slug,r,p)[0]
  assets['icon']=assets['01_Brand/app-icon-1024.png']
  assets['og-en']=assets['og-vi']=assets['01_Brand/feature-graphic-1024x500.png']
  # The 24 heroes in the game today (the kit leaves out heroes held for later updates and acts); supporting art stays in the source kit.
  for p in (r/'07_Art/heroes').glob('*.png'):assets[p.relative_to(r).as_posix()]=image(slug,r,p,maxsize=650)[0]
  facts=json.loads(read(r,'06_Data/facts.json'))
  font_root=DOCS/'Arcane-Brigade/Assets/ArcaneBrigade/Resources/Fonts'
  for name in ['BeVietnamPro-Medium.ttf','BeVietnamPro-SemiBold.ttf','BeVietnamPro-OFL.txt']:
   destination=ROOT/'public/fonts/website-kits/arcane-brigade'/name;destination.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(font_root/name,destination)
  kits.setdefault(slug,{})['facts']={k:facts[k] for k in ['Heroes','Friends','Weapons','Relics','Enemies','Bosses','Duets']}
  # Explicit-play trailer retains the supplied soundtrack; ambient clips remain muted.
  sound=r/'03_Clips/trailer-web-720p.mp4';dest=OUT/slug/'kit/03_Clips/trailer-with-sound.mp4';dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(sound,dest)
  provenance.append({'file':dest.relative_to(ROOT).as_posix(),'source':str(sound),'kind':'explicit-play-trailer-with-audio'})
 for p in sorted(r.rglob('*.mp4')):
  # One trailer is enough as an ambient film (the muted loop); the explicit-play copy above keeps its sound. The PC, phone and
  # web encodes of the same cut are kit downloads, not separate films.
  if slug=='arcane-brigade' and p.stem in ('trailer-pc','trailer-phone','trailer-web-720p'):continue
  clips.append(movie(slug,r,p))
 # Bundle the supplied fonts and licenses; no external font requests.
 fonts=r/'brand/fonts'
 if fonts.exists():
  for p in fonts.rglob('*'):
   if p.is_file():
    dest=ROOT/'public/fonts/website-kits'/slug/p.relative_to(fonts);dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,dest)
 kits.setdefault(slug,{}).update({'source':str(r),'assets':assets,'clips':clips,'pages':pages,'faq':faqs,'pricing':pricing,'legal':legal})
 print(f'  {len([m for m in media if m["slug"]==slug])} screens, {len(clips)} films, FAQ '+str({k:len(v) for k,v in faqs.items()}),flush=True)

# Archive the exact source documents; rendered legal text can be checked against these.
DATA.mkdir(exist_ok=True)
(DATA/'website-kits.json').write_text(json.dumps(kits,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(DATA/'kit-media.json').write_text(json.dumps(media,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(DATA/'kit-films.json').write_text(json.dumps(films,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(ROOT/'docs/website-kits/import-manifest.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Done: {len(media)} screens, {len(films)} films.',flush=True)
