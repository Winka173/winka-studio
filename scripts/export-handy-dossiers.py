"""Read-only Handy Suite audit -> one self-contained HTML dossier per app.

Requires Python Markdown and Pillow. Never builds/runs apps or reads runtime data,
credentials, local monetization config, build output, or private device profiles.
"""
from __future__ import annotations

import argparse
import base64
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from zoneinfo import ZoneInfo

import markdown
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--suite', type=Path, default=Path('C:/Users/Winka/Projects/Handy-Suite'))
parser.add_argument('--kits', type=Path, default=Path('C:/Users/Winka/OneDrive/Documents/Handy-Website-Kit'))
parser.add_argument('--output', type=Path, default=ROOT / 'artifacts/handy-project-dossiers')
args = parser.parse_args()
SUITE, KITS, OUT = args.suite.resolve(), args.kits.resolve(), args.output.resolve()
OUT.mkdir(parents=True, exist_ok=True)
CACHE = ROOT / '.review/handy-dossier-cache'
CACHE.mkdir(parents=True, exist_ok=True)
NOW = datetime.now(ZoneInfo('Asia/Saigon')).isoformat(timespec='seconds')
IMAGE_EXTS = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'}
TEXT_EXTS = {'.dart', '.md', '.json', '.yaml', '.yml', '.sql', '.xml', '.kt', '.java', '.swift', '.plist', '.cpp', '.h', '.mm', '.gradle', '.kts', '.ps1', '.py', '.sh', '.txt', '.html', '.js', '.mjs', '.ts', '.arb', '.entitlements'}
EXCLUDE = {'build', '.dart_tool', '.gradle', 'node_modules', '.git', 'Pods', 'ephemeral', 'symlinks', 'logs', '.idea', 'data_crawl'}
SENSITIVE = re.compile(r'(^\.env|local\.properties|key\.properties|monetization\.local|google-services\.json|GoogleService-Info|credential|service.account|\.keystore$|\.jks$)', re.I)
COMMON_DOCS = ['README.md', 'FEATURE_MATRIX.md', 'KNOWN_ISSUES.md', 'docs/DEVELOPMENT.md', 'docs/RELEASE_READINESS.md', 'docs/STORE_SETUP.md', 'docs/UX_REDESIGN.md', 'docs/UI_AUDIT_2026-11-08.md', 'docs/product-review/RELEASE_MATRIX.md', 'docs/product-review/ENTITLEMENTS.md', 'docs/product-review/MIGRATIONS_AND_BACKUP.md', 'docs/product-review/CHANGES_AND_NEXT_STEPS.md']
PURPOSES = {
    'boards': 'Quản lý công việc bằng bảng, cột và thẻ; nhóm, lịch làm việc, nhắc nhở, mẫu và sao lưu.',
    'bookmark': 'Lưu và tổ chức liên kết, đọc lại, tìm kiếm, bộ sưu tập, Focus và sao lưu.',
    'card': 'Thiết kế thẻ theo scene graph, mẫu, hồ sơ dữ liệu và xuất file/project.',
    'dev': 'Công cụ dữ liệu cho lập trình viên, trình kiểm tra dữ liệu và HTTP/API workspace.',
    'docs': 'Tài liệu Markdown, scan/chỉnh trang, PDF và trình đọc ngoại tuyến.',
    'forms': 'Thiết kế biểu mẫu, thu thập dữ liệu offline theo phiên bản, công thức và báo cáo.',
    'habit': 'Theo dõi thói quen, streak, lịch nhắc và thực hiện routine nhiều bước.',
    'keep': 'Quản lý đồ dùng, hóa đơn, cho mượn, bảo hành và các hạn cần nhắc.',
    'media': 'Xử lý ảnh/video, Quick Tools, chụp/ghi màn hình và chú thích.',
    'recall': 'Flashcard, lặp lại ngắt quãng và che vùng ảnh để ôn tập.',
    'spend': 'Sổ thu chi, ngân sách, đối chiếu số dư, forecast và Financial Sandbox.',
    'tools': 'Máy tính, chuyển đổi, QR/VietQR, mật khẩu và bộ công cụ thường ngày.',
    'trip': 'Lịch trình offline, địa điểm, check-in xác nhận, nhật ký, hành lý và chi phí.',
    'widget': 'Gallery theme, Widget Studio, artwork, cấu hình và cầu nối widget native.',
}


def read(path: Path) -> str:
    return path.read_text(encoding='utf-8-sig', errors='replace')


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def git(*cmd: str) -> str:
    return subprocess.run(['git', '-C', str(SUITE), *cmd], capture_output=True, text=True, encoding='utf-8', errors='replace').stdout.strip()


def source_label(path: Path) -> str:
    for root, prefix in [(SUITE, 'Handy-Suite'), (KITS, 'Handy-Website-Kit'), (ROOT, 'winka-studio')]:
        if path.is_relative_to(root):
            return prefix + '/' + path.relative_to(root).as_posix()
    return str(path)


def files_under(root: Path, suffixes: set[str] | None = None):
    if not root.exists():
        return []
    return sorted(p for p in root.rglob('*') if p.is_file() and not EXCLUDE.intersection(p.relative_to(root).parts) and not SENSITIVE.search(p.name) and (suffixes is None or p.suffix.lower() in suffixes))


class SafeDocs(HTMLParser):
    """Render owner Markdown without allowing active HTML or remote media."""
    tags = set('p h1 h2 h3 h4 h5 h6 ul ol li table thead tbody tr th td pre code strong em blockquote hr br a del s details summary span div'.split())

    def __init__(self, origin: Path):
        super().__init__(convert_charrefs=False)
        self.origin, self.output = origin, []

    def handle_starttag(self, tag, attrs):
        if tag == 'img':
            self.output.append('<span class="muted">[Ảnh tham chiếu: ' + html.escape(dict(attrs).get('alt', '')) + ' — xem thư viện ảnh bên dưới]</span>')
        elif tag in self.tags:
            allowed = ''
            if tag == 'a':
                href = dict(attrs).get('href', '')
                if not re.match(r'^(?:https?://|mailto:|#)', href):
                    href = (self.origin.parent / href).resolve().as_uri()
                if re.match(r'^(?:https?://|mailto:|file:|#)', href):
                    allowed = ' href="' + html.escape(href, quote=True) + '" rel="noreferrer"'
            self.output.append('<' + tag + allowed + '>')

    def handle_endtag(self, tag):
        if tag in self.tags and tag not in {'hr', 'br'}:
            self.output.append('</' + tag + '>')

    def handle_data(self, data):
        self.output.append(html.escape(data))

    def handle_entityref(self, name):
        self.output.append('&' + name + ';')

    def handle_charref(self, name):
        self.output.append('&#' + name + ';')


def md(text: str, path: Path) -> str:
    clean = SafeDocs(path)
    clean.feed(markdown.markdown(text, extensions=['tables', 'fenced_code', 'sane_lists']))
    return ''.join(clean.output)


def section(id: str, title: str, body: str) -> str:
    return f'<section id="{id}"><h2>{html.escape(title)}</h2>{body}</section>'


def detail(title: str, body: str, search: str = '', opened: bool = False) -> str:
    return '<details class="entry" ' + ('open ' if opened else '') + 'data-search="' + html.escape(search.casefold(), quote=True) + '"><summary>' + html.escape(title) + '</summary>' + body + '</details>'


def table(headers, rows):
    return '<div class="table-scroll"><table><thead><tr>' + ''.join('<th>' + html.escape(str(h)) + '</th>' for h in headers) + '</tr></thead><tbody>' + ''.join('<tr>' + ''.join('<td>' + html.escape(str(c)) + '</td>' for c in row) + '</tr>' for row in rows) + '</tbody></table></div>'


def source_record(path: Path):
    return {'path': source_label(path), 'absolutePath': str(path), 'bytes': path.stat().st_size, 'sha256': sha(path)}


def dependencies(path: Path):
    return sorted(set(re.findall(r'^  (handy_[a-z_]+):', read(path), re.M))) if path.exists() else []


def chapter_blocks(text: str, name: str, common: bool = False):
    result = []
    headings = list(re.finditer(r'^## ([^\n]+)', text, re.M))
    for i, heading in enumerate(headings):
        title = heading[1].casefold()
        if name.casefold() in title or (common and ('chung' in title or 'verification' in title)):
            result.append(text[heading.start():headings[i + 1].start() if i + 1 < len(headings) else len(text)])
    if name in ['Handy Tools', 'Handy Dev']:
        match = re.search(r'^### ' + re.escape(name) + r'\s*\n(.*?)(?=^#{1,3} |\Z)', text, re.M | re.S)
        if match:
            result.append('### Registry công cụ từ source\n\n' + match[1])
    return '\n\n'.join(result)


CSS = '''
:root{color-scheme:light;--ink:#202630;--muted:#596577;--line:#d9dfe6;--paper:#fff;--bg:#f2f4f7;--accent:#245b91}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.7 system-ui,sans-serif}a{color:var(--accent)}header,main,footer{max-width:1320px;margin:auto;padding:28px}header{padding-top:48px}h1{font-size:clamp(32px,5vw,60px);line-height:1.1;margin:18px 0}h2{font-size:27px;line-height:1.3}h3{line-height:1.4}p{max-width:95ch}section{background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:26px;margin:25px 0;scroll-margin-top:100px}section section{padding:12px}nav{display:flex;gap:15px;flex-wrap:wrap}nav a{padding:6px 0}aside,.notice{padding:18px;border-left:4px solid var(--accent);background:#eaf1fa;margin:20px 0}.complete{background:#d9f5e3;color:#164b2b}.progress{background:#fff0c2;color:#674200}.badge{display:inline-block;padding:6px 14px;border-radius:30px;font-weight:700}.stats{display:flex;flex-wrap:wrap;gap:12px}.stats b{font-size:24px;display:block}.stats div{padding:14px 20px;background:var(--paper);border:1px solid var(--line);border-radius:8px}.toolbar{position:sticky;top:0;z-index:5;background:var(--paper);border-block:1px solid var(--line);padding:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}input,button{font:inherit;min-height:44px;border:1px solid var(--line);border-radius:6px;padding:8px 12px;background:var(--paper);color:var(--ink)}input{flex:1;min-width:180px}button{cursor:pointer}details{border-top:1px solid var(--line);padding:10px 0}summary{cursor:pointer;font-weight:600;overflow-wrap:anywhere;padding:8px 0}pre{white-space:pre-wrap;word-break:break-word;max-height:650px;overflow:auto;background:var(--bg);padding:16px;font-size:13px;line-height:1.6}code{font-size:.9em}table{border-collapse:collapse;width:100%;font-size:14px}td,th{border:1px solid var(--line);padding:9px;text-align:left;vertical-align:top;overflow-wrap:anywhere}.table-scroll{overflow:auto}.muted,figcaption{color:var(--muted);font-size:13px}.gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(235px,1fr));gap:16px}figure{margin:0;border:1px solid var(--line);border-radius:9px;padding:12px;content-visibility:auto;contain-intrinsic-size:auto 380px}figure img{width:100%;height:300px;object-fit:contain;background:var(--bg);cursor:zoom-in}figcaption{overflow-wrap:anywhere;margin-top:10px}video{width:100%;max-height:600px;background:#111}.entry[hidden],figure[hidden]{display:none}.doc h1{font-size:29px}.doc h2{font-size:24px}.doc h3{font-size:20px}dialog{padding:18px;border:0;border-radius:12px;max-width:96vw;max-height:96vh;background:var(--paper);color:var(--ink)}dialog img{max-width:88vw;max-height:78vh;display:block;object-fit:contain}dialog::backdrop{background:#111c}dialog .muted{max-width:85vw;overflow-wrap:anywhere}[id]{scroll-margin-top:100px}
p,li,code,a{overflow-wrap:anywhere}
figure{min-width:0}
@media(prefers-color-scheme:dark){:root{color-scheme:dark;--ink:#e8edf5;--muted:#aeb8c7;--line:#394251;--paper:#202630;--bg:#171c24;--accent:#9fc9ff}aside,.notice{background:#25364d}.complete{background:#193f2a;color:#acf0be}.progress{background:#483b18;color:#ffe08a}}
@media(max-width:600px){header,main,footer{padding:18px}section{padding:16px}.gallery{grid-template-columns:1fr}h2{font-size:24px}.toolbar button{font-size:14px}.stats div{flex:1}}
@media print{.toolbar,button,dialog{display:none}details{display:block}section{break-inside:auto}body{background:white;color:black}pre{max-height:none}.gallery{grid-template-columns:repeat(3,1fr)}}
'''
JS = '''
const status=document.querySelector('#search-status');
const lazy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const img=e.target;img.src=img.dataset.src;lazy.unobserve(img)}}),{rootMargin:'400px'});
document.querySelectorAll('img[data-src]').forEach(img=>lazy.observe(img));
document.querySelector('#search').addEventListener('input',e=>{const q=e.target.value.toLocaleLowerCase('vi').trim();let n=0;document.querySelectorAll('.entry[data-search],figure[data-search]').forEach(el=>{const hay=el.dataset.search+' '+(el.matches('details')?el.textContent.toLocaleLowerCase('vi'):'');el.hidden=q&&!hay.includes(q);if(!el.hidden)n++});status.textContent=q?n+' mục khớp':'Tìm trong tài liệu, source, test và tên ảnh';});
document.querySelector('#open-docs').addEventListener('click',()=>document.querySelectorAll('#documents details:not([hidden])').forEach(d=>d.open=true));
document.querySelector('#close-docs').addEventListener('click',()=>document.querySelectorAll('details').forEach(d=>d.open=false));
const dialog=document.querySelector('dialog');
document.querySelectorAll('figure img').forEach(img=>{img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Phóng to '+img.alt);const show=()=>{dialog.querySelector('img').src=img.dataset.src;dialog.querySelector('p').textContent=img.closest('figure').dataset.search;dialog.showModal()};img.addEventListener('click',show);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show()}})});
dialog.querySelector('button').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelector('#download-data').onclick=()=>{const data=document.querySelector('#dossier-data').textContent;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download=document.body.dataset.app+'-audit.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
'''


def image_uri(path: Path, digest: str):
    cache = CACHE / (digest + '-v1.webp')
    if path.suffix.lower() == '.svg':
        return 'data:image/svg+xml;base64,' + base64.b64encode(path.read_bytes()).decode(), None, None
    if cache.exists():
        try:
            with Image.open(cache) as cached:
                cached.verify()
        except OSError:
            cache.unlink()
    if not cache.exists():
        with Image.open(path) as original:
            im = ImageOps.exif_transpose(original)
            im.thumbnail((1280, 1800))
            if im.mode not in ['RGB', 'RGBA']:
                im = im.convert('RGBA' if 'transparency' in im.info else 'RGB')
            temporary = cache.with_suffix('.tmp')
            im.save(temporary, 'WEBP', quality=78, method=4)
            temporary.replace(cache)
    with Image.open(cache) as im:
        width, height = im.size
    return 'data:image/webp;base64,' + base64.b64encode(cache.read_bytes()).decode(), width, height


def media_matches(path: Path, root: Path, aliases: list[str]):
    rel = path.relative_to(root).as_posix().casefold()
    # A parent app folder takes precedence over a generic screen name such as
    # boards/card-editor.png or recall/cards.png. Never misattribute that to Card.
    for part in Path(rel).parts[:-1]:
        owners = [key for key in PURPOSES if part in {key, 'handy_' + key, 'handy-' + key} or part.startswith(key + '-')]
        if part == 'save':
            owners = ['bookmark']
        if owners:
            return any(owner in aliases for owner in owners)
    return any(re.search(r'(^|[/_.-])' + re.escape(alias) + r'(?=$|[/_.-])', rel) for alias in aliases)


revision, dirty = git('rev-parse', 'HEAD'), git('status', '--porcelain').splitlines()
all_suite_docs = files_under(SUITE / 'docs', {'.md'})
media_roots = [SUITE / 'review-shots', SUITE / 'docs/product-review/evidence', SUITE / 'artwork']
all_suite_media = {root: files_under(root, IMAGE_EXTS) for root in media_roots}
functions_path = SUITE / 'docs/FUNCTIONS.md'
functions = read(functions_path)
manifest = {'generatedAt': NOW, 'sourceRoot': str(SUITE), 'sourceRevision': revision, 'sourceDirtyFileCount': len(dirty), 'reports': [], 'excluded': ['credentials/local config/runtime databases/personal app data', 'build output/generated dependencies', 'unattributed cross-app images (listed in shared media index)', 'binary build/install files (APK/AAB/executables)']}

for app in sorted(p for p in (SUITE / 'apps').iterdir() if p.is_dir() and p.name.startswith('handy_')):
    key = app.name.removeprefix('handy_')
    name = 'Handy ' + key.title()
    complete = key in {'bookmark', 'boards'}
    aliases = [key, app.name, app.name.replace('_', '-')]
    if key == 'bookmark':
        aliases += ['save', 'bookmark-redesign', 'bookmark-final-prepublish']
    kit = KITS / app.name.replace('_', '-')
    print('Auditing ' + name, flush=True)
    app_source = set()
    for sub in ['lib', 'assets', 'test', 'integration_test', 'tool', 'android/app/src', 'ios/Runner', 'ios/HandyWidgetExtension', 'windows/runner', 'web']:
        app_source.update(files_under(app / sub, TEXT_EXTS))
    app_source.update(p for p in app.iterdir() if p.is_file() and p.suffix.lower() in TEXT_EXTS and not SENSITIVE.search(p.name))
    app_source.update(files_under(app / 'android/app', {'.kts', '.gradle'}))
    for p in app_source.copy():
        if p.name.endswith(('.g.dart', '.freezed.dart')) or p.name == 'GeneratedPluginRegistrant.java':
            app_source.remove(p)
    direct = dependencies(app / 'pubspec.yaml')
    version_match = re.search(r'^version:\s*(.+)', read(app / 'pubspec.yaml'), re.M)
    app_version = version_match[1].strip() if version_match else 'Không khai báo'
    all_deps, queue = set(direct), list(direct)
    while queue:
        dep = queue.pop()
        for child in dependencies(SUITE / 'packages' / dep / 'pubspec.yaml'):
            if child not in all_deps:
                all_deps.add(child)
                queue.append(child)
    package_source = set()
    engine_source = set()
    for dep in sorted(all_deps):
        package = SUITE / 'packages' / dep
        for sub in ['lib', 'test']:
            selected = files_under(package / sub, {'.dart', '.json', '.sql', '.txt', '.yaml'})
            package_source.update(selected)
            if dep in {app.name + '_engine', 'handy_inventory' if key == 'keep' else '', 'handy_recall' if key == 'recall' else ''}:
                engine_source.update(selected)
        package_source.update(p for p in package.glob('*.md'))
        if (package / 'pubspec.yaml').exists():
            package_source.add(package / 'pubspec.yaml')
    docs = set(p for p in app_source if p.suffix == '.md')
    for path in all_suite_docs:
        rel = path.relative_to(SUITE / 'docs').as_posix().casefold()
        if any(token in rel for token in [app.name, 'handy-' + key, key + '-redesign', key + '-final-prepublish']) or rel == 'product-review/' + key + '.md':
            docs.add(path)
        elif path.parent.name == 'product-review' and (name.casefold() in read(path).casefold() or app.name in read(path)):
            docs.add(path)
    docs.update(SUITE / p for p in COMMON_DOCS if (SUITE / p).exists())
    docs.update(files_under(kit, {'.md', '.txt'}))
    docs.update(p for p in engine_source if p.suffix == '.md')
    for alias in aliases:
        docs.update(files_under(SUITE / 'review-shots' / alias, {'.md'}))
    docs = sorted(docs)
    # Structured catalogs and QA summaries are useful independently of prose.
    for p in files_under(SUITE / 'docs', {'.json'}):
        rel = p.relative_to(SUITE / 'docs').as_posix().casefold()
        if app.name in rel or 'handy-' + key in rel or p.name == 'verification-summary.json' or (key in {'tools', 'dev'} and p.name == 'tool-registry.json'):
            app_source.add(p)
    sources = sorted(app_source | package_source)
    test_files = [p for p in sources if p.suffix == '.dart' and ('test' in p.parts or 'integration_test' in p.parts or p.name.endswith('_test.dart'))]
    tests, entities, route_strings, permissions = [], [], set(), []
    for p in sources:
        text = read(p)
        if p in test_files:
            for match in re.finditer(r'''\b(test|testWidgets|group)\s*\(\s*r?(['"])(.*?)\2''', text, re.S):
                tests.append({'kind': match[1], 'name': match[3], 'source': source_label(p), 'line': text[:match.start()].count('\n') + 1})
        if p.suffix == '.dart':
            for match in re.finditer(r'\b(class|enum|mixin|extension)\s+(\w+)', text):
                entities.append({'kind': match[1], 'name': match[2], 'source': source_label(p), 'line': text[:match.start()].count('\n') + 1})
            if p in app_source:
                route_strings.update(re.findall(r'''['"](/(?:[a-z][a-z0-9_/-]*)?)['"]''', text))
        if p.name == 'AndroidManifest.xml':
            permissions.extend(re.findall(r'android:name="(android.permission.[^"]+)"', text))
    identity_files = [p for p in sorted(app_source) if p.name in {'identity.dart', 'app.dart', 'pubspec.yaml', 'AndroidManifest.xml', 'Info.plist'}]
    app_ids = set()
    for p in files_under(app / 'android/app', {'.kts', '.gradle'}):
        app_ids.update(re.findall(r'applicationId\s*(?:=)?\s*["\']([^"\']+)', read(p)))
        app_source.add(p)
    media_paths = set(files_under(app / 'assets', IMAGE_EXTS))
    for root, paths in all_suite_media.items():
        media_paths.update(p for p in paths if media_matches(p, root, aliases))
    media_paths.update(files_under(kit, IMAGE_EXTS))
    media_paths.update(files_under(SUITE / 'artwork' / app.name, IMAGE_EXTS))
    # Preserve current published media too, when it is absent from the suite captures.
    media_paths.update(files_under(ROOT / 'public/products' / app.name.replace('_', '-'), IMAGE_EXTS))
    attachments = set(files_under(kit, {'.pdf', '.zip', '.ttf', '.otf'}))
    attachments.update(files_under(app / 'fonts', {'.ttf', '.otf'}))
    attachments.update(files_under(app / 'assets', {'.pdf', '.zip', '.ttf', '.otf'}))
    for root in media_roots:
        attachments.update(p for p in files_under(root, {'.pdf', '.zip'}) if media_matches(p, root, aliases))
    attachment_records = [source_record(p) for p in sorted(attachments)]
    groups = defaultdict(list)
    for path in sorted(media_paths):
        groups[sha(path)].append(path)
    image_groups, figures = [], []
    with ThreadPoolExecutor(max_workers=6) as pool:
        previews = list(pool.map(lambda item: image_uri(item[1][0], item[0]), groups.items()))
    for index, ((digest, paths), (uri, width, height)) in enumerate(zip(groups.items(), previews)):
        original = paths[0]
        labels = [source_label(p) for p in paths]
        label = labels[0]
        image_groups.append({'sha256': digest, 'sources': [source_record(p) for p in paths], 'previewWidth': width, 'previewHeight': height, 'animation': original.suffix.lower() == '.gif'})
        figures.append('<figure data-search="' + html.escape(' | '.join(labels).casefold(), quote=True) + '"><img data-src="' + uri + '" alt="' + html.escape(original.stem, quote=True) + '" loading="lazy"><figcaption><b>' + html.escape(original.stem) + '</b><br>' + html.escape(label) + ('<br>GIF: ảnh xem trước là frame đầu.' if original.suffix.lower() == '.gif' else '') + detail(str(len(paths)) + ' đường dẫn nguồn / SHA-256', '<pre>' + html.escape(digest + '\n' + '\n'.join(str(p) for p in paths)) + '</pre>') + '</figcaption></figure>')
    videos = set(files_under(SUITE / 'device-tours' / ('save' if key == 'bookmark' else key), {'.mp4'}))
    # Use the web kit's optimized encodes when available; no duplicate source/encode pair.
    web_clips = files_under(ROOT / 'public/products' / app.name.replace('_', '-') / 'kit', {'.mp4'})
    videos.update(web_clips or files_under(kit, {'.mp4'}))
    video_records, video_html = [], []
    for path in sorted(videos):
        video_records.append(source_record(path))
        uri = 'data:video/mp4;base64,' + base64.b64encode(path.read_bytes()).decode()
        video_html.append(detail(source_label(path), '<video controls preload="none" playsinline src="' + uri + '"></video><p class="muted">Bản ghi/render nguồn; ngày và phạm vi theo tài liệu gốc. Không tự phát.</p>', source_label(path)))
    records = [source_record(p) for p in sorted(set(sources) | set(docs) | {functions_path})]
    owned_tests = [p for p in test_files if p.is_relative_to(app) or p in engine_source]
    data = {'name': name, 'app': app.name, 'generatedAt': NOW, 'completion': 'complete' if complete else 'in-development', 'completionAuthority': 'Owner confirmation: Bookmark and Boards complete; all other Handy apps remain in development.', 'releaseStatus': 'Not inferred from completion; website store controls remain Coming soon.', 'sourceRevision': revision, 'sourceDirtyFileCount': len(dirty), 'sourceRoot': str(SUITE), 'kitRoot': str(kit) if kit.exists() else None, 'dependencies': {'direct': direct, 'transitive': sorted(all_deps)}, 'applicationIds': sorted(app_ids), 'androidPermissions': sorted(set(permissions)), 'routeStrings': sorted(route_strings), 'counts': {'documents': len(docs), 'sourceFiles': len(sources), 'appFiles': len(app_source), 'testFilesIncludingShared': len(test_files), 'appAndEngineTestFiles': len(owned_tests), 'testDeclarationsIncludingGroups': len(tests), 'imageSourceFiles': len(media_paths), 'uniqueImages': len(groups), 'videos': len(videos)}, 'documents': [source_label(p) for p in docs], 'files': records, 'entities': entities, 'tests': tests, 'images': image_groups, 'videos': video_records, 'verification': 'Static source/document/media audit only. Existing tests/evidence are indexed; no Flutter tests or device checks run by this exporter.'}
    status = 'ĐÃ HOÀN THIỆN' if complete else 'ĐANG PHÁT TRIỂN'
    hero = f'<span class="badge {"complete" if complete else "progress"}">{status}</span><h1>{name}</h1><p>{html.escape(PURPOSES[key])}</p><p class="muted">Tổng hợp ngày {html.escape(NOW)} · nguồn working tree {revision[:12]} · {len(dirty)} file nguồn đang thay đổi.</p>'
    hero += '<aside><strong>Trạng thái do chủ dự án xác nhận:</strong> Bookmark và Boards đã hoàn thiện. Tài liệu gốc cũ có thể còn ghi IN_PROGRESS; chúng được giữ như bằng chứng lịch sử. Hoàn thiện không đồng nghĩa phát hành công khai. Trạng thái store trên website vẫn là Coming soon.</aside>'
    hero += '<div class="stats">' + ''.join(f'<div><b>{value:,}</b>{title}</div>' for title, value in [('tài liệu', len(docs)), ('file source', len(sources)), ('ảnh độc lập', len(groups)), ('file ảnh nguồn', len(media_paths)), ('clip', len(videos)), ('file test app/engine', len(owned_tests))]) + '</div>'
    nav = '<nav>' + ''.join(f'<a href="#{id}">{title}</a>' for id, title in [('features', 'Chức năng'), ('technical', 'Kỹ thuật'), ('documents', 'Toàn văn tài liệu'), ('images', 'Hình ảnh'), ('videos', 'Video'), ('tests', 'QA / test'), ('source', 'Source'), ('provenance', 'Nguồn dữ liệu')]) + '</nav>'
    feature_text = chapter_blocks(functions, name, common=True)
    kit_feature = ''.join(detail('Website kit / ' + lang + ' — toàn bộ chức năng', '<div class="doc">' + md(read(path), path) + '</div>', name + ' features ' + lang, opened=True) for lang in ['vi', 'en'] if (path := kit / 'copy' / lang / 'features.md').exists())
    body = section('features', 'Toàn bộ chức năng theo tài liệu nguồn', '<p class="muted">Nguồn: docs/FUNCTIONS.md. Mô tả gốc giữ nguyên để không mất chi tiết; các tính năng/giới hạn lịch sử phải đối chiếu tài liệu phiên bản mới bên dưới.</p><div class="doc">' + md(feature_text, functions_path) + '</div>' + kit_feature)
    body += section('technical', 'Cấu trúc, dữ liệu và nền tảng', table(['Mục', 'Giá trị'], [('App', app.name), ('Source', str(app)), ('Android ID từ Gradle', ', '.join(sorted(app_ids)) or 'Không tìm thấy applicationId trong cấu hình đã quét'), ('Dependency trực tiếp', ', '.join(direct)), ('Dependency nội bộ toàn bộ', ', '.join(sorted(all_deps))), ('Android permissions khai báo', ', '.join(sorted(set(permissions))) or 'Không tìm thấy trong app manifest; không kết luận manifest hợp nhất không có quyền'), ('Chuỗi route trong code', ', '.join(sorted(route_strings)) or 'Điều hướng qua widget/state; xem source')]) + ''.join(detail(source_label(p), '<pre>' + html.escape(read(p)) + '</pre>', source_label(p)) for p in identity_files))
    body += section('documents', 'Tài liệu đầy đủ: tính năng, Free/Pro, schema, import/export, pháp lý và giới hạn', '<p>Mỗi mục giữ toàn văn file gốc. Các tài liệu cấp Suite áp dụng chung, không mặc nhiên chứng nhận riêng app này. Mở từng mục hoặc dùng nút mở tài liệu.</p>' + ''.join(detail(source_label(p), '<div class="doc">' + md(read(p), p) + '</div>', source_label(p)) for p in docs))
    body += section('images', 'Toàn bộ ảnh tìm được có quy thuộc app', '<p>Ảnh được nhúng vào chính file HTML, chuyển WebP để giảm dung lượng (tối đa 1280 × 1800, giữ tỷ lệ); SVG giữ nguyên. Ảnh trùng byte gộp thành một ô và giữ mọi đường dẫn nguồn. Bao gồm ảnh trước/sau, fixture/render, artwork và lịch sử; không xem mọi ảnh là giao diện bản store hiện tại. Click hoặc Enter để phóng to.</p><div class="gallery">' + ''.join(figures) + '</div>')
    body += section('videos', 'Clip và device tour', ''.join(video_html) or '<p>Không tìm thấy MP4 quy thuộc app trong phạm vi đã quét. Ảnh/GIF ở phần thư viện vẫn được giữ.</p>')
    body += section('tests', 'Bằng chứng QA và các test hiện có', '<div class="notice">Đây là rà soát tĩnh. Lần tổng hợp này không chạy lại Flutter, test, build Android/iOS hoặc kiểm thử thiết bị. Tên test và file tồn tại không phải kết quả PASS mới. Các báo cáo gốc ghi ngày, phạm vi và các phần chưa xác minh.</div>' + table(['Loại', 'Tên test / nhóm', 'Source', 'Dòng'], [(t['kind'], t['name'], t['source'], t['line']) for t in tests]))
    body += section('source', 'Phụ lục source đầy đủ và các model/entity', '<p>Source app và các package nội bộ được phụ thuộc trực tiếp/gián tiếp. Nội dung .dart gồm cả test để tra cứu logic, model, persistence, import/export và adapter. Không đóng gói dependency bên thứ ba hay file build sinh tự động.</p>' + detail('Danh mục class / enum / mixin / extension', table(['Loại', 'Tên', 'Source', 'Dòng'], [(e['kind'], e['name'], e['source'], e['line']) for e in entities])) + ''.join(detail(source_label(p), '<pre><code>' + html.escape(read(p)) + '</code></pre>', source_label(p)) for p in sources))
    body += section('provenance', 'Phạm vi, độ toàn vẹn và cách tái tạo', '<p>Ưu tiên nội dung đang có trên working tree (bao gồm thay đổi chưa commit), không giả định HEAD là toàn bộ dữ liệu. SHA-256 dưới đây ghi nhận từng file đã đọc. Tài liệu và asset nguồn không bị sửa.</p><p>Không đưa vào dữ liệu người dùng, database runtime, credentials, config monetization.local, key signing, generated/build hoặc dependency bên thứ ba. Binary APK/AAB/ZIP/font/PDF không nhúng; báo cáo tập trung vào chức năng, tài liệu, source và hình ảnh. Các ảnh không quy thuộc rõ ràng cho một app được liệt kê riêng ở manifest tổng để tránh gán nhầm.</p><p>Chạy lại: <code>python scripts/export-handy-dossiers.py</code>. Cần Pillow và Markdown.</p>' + table(['File', 'Bytes', 'SHA-256'], [(r['path'], r['bytes'], r['sha256']) for r in records]))
    data['attachments'] = attachment_records
    data['sourceVersion'] = app_version
    body += section('version', 'Phiên bản source đang rà', '<p><strong>' + html.escape(app_version) + '</strong> — lấy từ pubspec.yaml của app. Đây là phiên bản source tại thời điểm tổng hợp, không mặc nhiên là phiên bản đang phát hành trên store. Website kit và báo cáo QA cũ có thể ghi build khác.</p>')
    body += section('attachments', 'File gốc bổ sung: PDF, ZIP và font', '<p>Các binary này không nhúng vào HTML. Đường dẫn đầy đủ, kích thước và SHA-256 giúp tìm lại file gốc; nội dung hình ảnh và source tương ứng đã có trong các phần trên.</p>' + table(['File', 'Bytes', 'SHA-256'], [(r['absolutePath'], r['bytes'], r['sha256']) for r in attachment_records]))
    payload = json.dumps(data, ensure_ascii=False).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    document = '<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>' + name + ' — Tổng hợp toàn bộ project</title><style>' + CSS + '</style></head><body data-app="' + app.name + '"><header>' + hero + nav + '</header><div class="toolbar"><label for="search">Tìm dữ liệu</label><input id="search" type="search" placeholder="Chức năng, file, test, tên ảnh…"><button id="open-docs">Mở tài liệu</button><button id="close-docs">Thu gọn</button><button id="download-data">Xuất dữ liệu JSON</button><span id="search-status" class="muted">Tìm trong tài liệu, source, test và tên ảnh</span></div><main>' + body + '</main><footer>Handy Suite · Báo cáo nội bộ · ' + html.escape(NOW) + '</footer><dialog aria-label="Xem ảnh lớn"><button>Đóng ảnh</button><img alt="Ảnh đang phóng to"><p class="muted"></p></dialog><script id="dossier-data" type="application/json">' + payload + '</script><script>' + JS + '</script></body></html>'
    target = OUT / (app.name.upper() + '.html')
    target.write_text(document, encoding='utf-8')
    manifest['reports'].append({'app': app.name, 'name': name, 'completion': data['completion'], 'file': target.name, 'bytes': target.stat().st_size, 'sha256': sha(target), **data['counts']})
    print(f'  {len(docs)} docs, {len(sources)} source files, {len(groups)} unique images / {len(media_paths)} sources, {len(videos)} videos -> {target.stat().st_size / 1e6:.1f} MB', flush=True)

# Images shared across apps or named only by an audit flow stay discoverable.
assigned = set()
for report in manifest['reports']:
    # Metadata is embedded in each report; avoid reading the huge HTML back.
    key = report['app'].removeprefix('handy_')
    names = [key, report['app'], report['app'].replace('_', '-')]
    if key == 'bookmark':
        names.append('save')
    for root, paths in all_suite_media.items():
        assigned.update(p for p in paths if media_matches(p, root, names))
manifest['unattributedSharedImages'] = [source_record(p) for paths in all_suite_media.values() for p in paths if p not in assigned]
(OUT / 'MANIFEST.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
links = ''.join('<tr><td><a href="' + r['file'] + '">' + r['name'] + '</a></td><td>' + ('ĐÃ HOÀN THIỆN' if r['completion'] == 'complete' else 'Đang phát triển') + '</td><td>' + str(r['documents']) + '</td><td>' + str(r['uniqueImages']) + '</td><td>' + str(r['videos']) + '</td><td>' + f'{r["bytes"] / 1e6:.1f} MB' + '</td></tr>' for r in manifest['reports'])
shared_figures = []
for item in manifest['unattributedSharedImages']:
    uri, _, _ = image_uri(Path(item['absolutePath']), item['sha256'])
    shared_figures.append('<figure><img src="' + uri + '" alt="' + html.escape(Path(item['path']).stem, quote=True) + '" loading="lazy"><figcaption>' + html.escape(item['path']) + '</figcaption></figure>')
(OUT / 'INDEX.html').write_text('<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>14 Handy project dossiers</title><style>' + CSS + '</style><header><h1>14 project Handy</h1><p>Mỗi app có một file HTML tự chứa: toàn văn chức năng/tài liệu, source, ảnh nhúng và video. Có thể sao chép riêng từng file. Bookmark và Boards đã hoàn thiện theo xác nhận của chủ dự án; 12 app còn lại đang phát triển. Thời điểm: ' + html.escape(NOW) + '.</p></header><main><section><div class="table-scroll"><table><thead><tr><th>Project</th><th>Trạng thái</th><th>Tài liệu</th><th>Ảnh độc lập</th><th>Clip</th><th>Dung lượng</th></tr></thead><tbody>' + links + '</tbody></table></div><p><a href="MANIFEST.json">Manifest / SHA-256 / ảnh dùng chung chưa quy thuộc</a></p></section><section><h2>Ảnh review chung nhiều app</h2><p>Các contact sheet/so sánh luồng chung được giữ tại đây, không gán nhầm cho một app riêng.</p><div class="gallery">' + ''.join(shared_figures) + '</div></section></main></html>', encoding='utf-8')
print('DONE: ' + str(OUT), flush=True)
