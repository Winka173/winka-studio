"""Prepare a larger, source-attributed product gallery. Never synthesize app UI."""
from pathlib import Path
from PIL import Image, ImageStat
import json

ROOT=Path(__file__).resolve().parents[1];HOME=Path.home()
media=[]
def add(slug,name,source,device,en,vi,kind='screenshot'):
 source=Path(source)
 if not source.exists():return
 im=Image.open(source).convert('RGB')
 if max(ImageStat.Stat(im.resize((40,40))).stddev)<2:return
 im.thumbnail((1920,1920))
 dest=ROOT/'public/products'/slug/'gallery'/f'{name}.webp';dest.parent.mkdir(parents=True,exist_ok=True)
 im.save(dest,'WEBP',quality=86,method=5)
 media.append(dict(slug=slug,id=name,src=f'/products/{slug}/gallery/{name}.webp',device=device,width=im.width,height=im.height,title={'en':en,'vi':vi},kind=kind,source=str(source.relative_to(HOME)) if source.is_relative_to(HOME) else str(source)))

handy=HOME/'Projects/Handy-Suite/docs/product-review/evidence/after'
bookmark=[('desktop-1-home','desktop','The desktop library','Thư viện trên màn hình lớn'),('desktop-13-reader','desktop','Article reader','Trình đọc bài viết'),('desktop-8-settings','desktop','Library settings','Thiết lập thư viện'),('phone-1-home','mobile','Your reading list','Danh sách đọc'),('phone-2-collection','mobile','Inside a collection','Trong bộ sưu tập'),('phone-3-cards','mobile','Card view','Chế độ thẻ'),('phone-4-detail','mobile','A saved link','Một link đã lưu'),('phone-6-focus','mobile','Focus mode','Chế độ tập trung'),('phone-11-reader','mobile','Read the article','Đọc bài viết'),('phone-9-dark','mobile','After dark','Giao diện tối'),('tablet-1-home','tablet','A little more room','Thêm không gian để đọc')]
for name,device,en,vi in bookmark:add('handy-bookmark',name,handy/'bookmark'/f'{name}.png',device,en,vi)
for folder in sorted(handy.iterdir()):
 if not folder.is_dir() or folder.name=='bookmark':continue
 choices=[p for p in folder.glob('*.png') if 'film' not in p.stem]
 chosen=[p for p in choices if p.stem.startswith('desktop')][:2]+[p for p in choices if p.stem.startswith('phone')][:4]
 for p in chosen:add('handy-'+folder.name,p.stem,p,'desktop' if p.stem.startswith('desktop') else 'mobile',p.stem.replace('-',' ').title(),p.stem.replace('-',' '))

widget=HOME/'Projects/Handy-Suite/review-shots/widget'
for name,device,en,vi in [('widget-native-theme','mobile','Inside a theme','Trong một bộ giao diện'),('widget-web-offline-editor','desktop','Widget editor','Trình chỉnh sửa widget'),('widget-web-offline-typography','desktop','Typography controls','Thiết lập kiểu chữ')]:
 add('handy-widget',name,widget/f'{name}.png',device,en,vi)

sticky=HOME/'OneDrive/Documents/Sticky-Wall/screenshots'
for name,en,vi in [('mode_wall','The wall','Bức tường ghi chú'),('editor','Note editor','Soạn ghi chú'),('drawing','Drawing canvas','Bảng vẽ'),('mode_grid','Grid view','Chế độ lưới'),('mode_list','List view','Chế độ danh sách'),('night','Night board','Bảng ghi chú ban đêm'),('photo_editor','Photo editor','Chỉnh sửa ảnh'),('export','Export a memory','Xuất bảng kỷ niệm')]:
 add('sticky-wall',name,sticky/f'{name}.png','mobile',en,vi)
add('sticky-wall','landscape-wall',ROOT/'.review/product-captures/sticky-wall/android-launch.png','tablet','Landscape Android wall','Bảng Android ngang')

forge=HOME/'Projects/Asset-Forge-Studio/docs/evidence'
for name,device,en,vi in [('workspace_production-export_v093','desktop','Production workbench','Bàn làm việc Production'),('workspace_library-export_v093','desktop','Asset library','Thư viện tài sản'),('ui_refinement_create','desktop','Create workspace','Không gian tạo tài sản'),('ui_refinement_library','desktop','Library workspace','Không gian thư viện'),('tower_views_v092/tower-front','desktop','Inspect the front','Kiểm tra mặt trước'),('tower_views_v092/tower-side','desktop','Inspect the side','Kiểm tra mặt bên'),('tower_views_v092/tower-back','desktop','Inspect the back','Kiểm tra mặt sau'),('studio_mobile','mobile','Responsive web workspace','Workspace web trên màn hình nhỏ'),('castle_full_native_v0917','desktop','Native model inspection','Kiểm tra model trong ứng dụng')]:
 add('asset-forge-studio',Path(name).name,forge/f'{name}.png',device,en,vi)

captures=ROOT/'.review/product-captures'
groups={
 'arcane-brigade':[('Combat-07','The brigade in combat','Tổ đội chiến đấu'),('Combat-17','Through the halls','Qua các đấu trường'),('Boss-20','Boss encounter','Đối đầu boss'),('Boss-10','Another encounter','Một trận đấu khác'),('Shop-kind-eyes','Between battles','Giữa các trận đấu'),('Shop-gentle-handoff','The next choice','Lựa chọn tiếp theo'),('Combat-01','Enter the arena','Bước vào đấu trường'),('Combat-12','Another formation','Một đội hình khác'),('Boss-15','Meet the next boss','Gặp boss tiếp theo')],
 'aetherward':[('preparation','Choose the formation','Sắp xếp đội hình'),('battle','Guard the crystal','Bảo vệ pha lê'),('battle-late','Elemental combat','Chiến đấu nguyên tố')],
 'forgebound':[('01_title','At the forge','Tại lò rèn'),('02_forgemaster_select','Choose a forgemaster','Chọn thợ rèn'),('03_map','Plan the journey','Lên đường'),('04_forge','The Forge Board','Bảng rèn vũ khí'),('06_battle_mid','Put the build to work','Đưa vũ khí vào trận'),('08_workshop','Back in the workshop','Trở về xưởng')],
 'runavelle':[('day','A kingdom by day','Vương quốc ban ngày'),('day_close','Closer to the kingdom','Ghé gần vương quốc'),('day_hud','Daytime gameplay','Gameplay ban ngày'),('night','Hold through the night','Giữ vững qua đêm'),('night_hud','Nighttime gameplay','Gameplay ban đêm')],
 'autonomous-creative-studio':[('runtime-0','Creative workspace','Không gian sáng tạo'),('runtime-1','Create a project','Tạo dự án'),('runtime-2','Model workspace','Không gian model')],
}
for slug,shots in groups.items():
 for name,en,vi in shots:add(slug,name,captures/slug/f'{name}.png','desktop' if slug=='autonomous-creative-studio' else 'gameplay',en,vi)

for name,en,vi in [('android-gles','Deployment screen','Màn hình triển khai'),('android-deploy','Deploy into battle','Triển khai vào trận'),('android-battle','Android gameplay','Gameplay Android')]:
 add('machine-brigade',name,ROOT/'.review/rework/machine-brigade'/f'{name}.png','gameplay',en,vi)

(ROOT/'src/content/portfolio-media.json').write_text(json.dumps(media,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({slug:len([m for m in media if m['slug']==slug]) for slug in dict.fromkeys(m['slug'] for m in media)},indent=2))
