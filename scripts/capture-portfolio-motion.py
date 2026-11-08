"""Record actual product pixels; use isolated game capture and existing Android app data."""
from pathlib import Path
import subprocess,json,time,re,ctypes
import imageio_ffmpeg

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'.review/rework';OUT.mkdir(parents=True,exist_ok=True)
HOME=Path.home();FF=imageio_ffmpeg.get_ffmpeg_exe();DEVICE='127.0.0.1:5556'
report=[]
def adb(*args):return subprocess.run(['adb','-s',DEVICE,*args],capture_output=True,timeout=90)
def android(slug,package,apk):
 folder=OUT/slug;folder.mkdir(exist_ok=True)
 if b'package:' not in adb('shell','pm','path',package).stdout:
  result=adb('install','-r',str(apk))
  if result.returncode:raise RuntimeError('APK install failed')
 adb('shell','monkey','-p',package,'-c','android.intent.category.LAUNCHER','1');time.sleep(4)
 adb('shell','uiautomator','dump','/sdcard/winka-portfolio-ui.xml')
 xml=adb('exec-out','cat','/sdcard/winka-portfolio-ui.xml').stdout
 (folder/'ui.xml').write_bytes(xml)
 if package.encode() not in xml:raise RuntimeError('Target package is not visible')
 (folder/'portrait.png').write_bytes(adb('exec-out','screencap','-p').stdout)
 remote=f'/sdcard/winka-portfolio-{slug}.mp4'
 proc=subprocess.Popen(['adb','-s',DEVICE,'shell','screenrecord','--bit-rate','4000000','--time-limit','9',remote],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 time.sleep(3)
 # A small native scroll demonstrates the actual viewport, without editing app content.
 adb('shell','input','swipe','850','1450','850','850','900');time.sleep(2)
 adb('shell','input','swipe','850','850','850','1450','900')
 proc.wait(timeout=25);adb('pull',remote,str(folder/'recording.mp4'))
 dest=ROOT/'public/products'/slug/'interface-film.mp4'
 subprocess.run([FF,'-y','-i',str(folder/'recording.mp4'),'-an','-vf','scale=-2:960','-c:v','libx264','-preset','fast','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 report.append({'slug':slug,'file':str(dest.relative_to(ROOT)),'kind':'actual Android screenrecord','device':DEVICE,'dataReset':False})

for slug,package,apk in [
 ('sticky-wall','com.apps.winka.stickywall',HOME/'OneDrive/Documents/Sticky-Wall/build/app/outputs/flutter-apk/app-release.apk'),
]:
 try:android(slug,package,apk);print('RECORDED',slug,flush=True)
 except Exception as e:report.append({'slug':slug,'error':str(e)});print('UNAVAILABLE',slug,str(e),flush=True)

# Source review captured the real phone interface transition as a frame sequence.
# Android's emulator recorder produced an invalid-timing file for this app; do not publish it.
bookmark=HOME/'Projects/Handy-Suite/docs/product-review/evidence/after/bookmark'
dest=ROOT/'public/products/handy-bookmark/interface-film.mp4'
subprocess.run([FF,'-y','-framerate','8','-i',str(bookmark/'phone-file-film-%03d.png'),'-an','-vf','scale=-2:960','-c:v','libx264','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
report.append({'slug':'handy-bookmark','file':str(dest.relative_to(ROOT)),'kind':'source product UI frame sequence','source':str(bookmark.relative_to(HOME)),'fps':8,'frames':20})

# Sample the running Unity game's native capture hook at 24 frames per second.
folder=OUT/'aetherward';frames=folder/'frames';frames.mkdir(parents=True,exist_ok=True)
spec=json.loads((HOME/'Projects/Aetherward/Reports/Animation/capture_spec.json').read_text(encoding='utf-8-sig'))
spec['outDir']=str(frames);spec['label']='Website actual gameplay film'
spec['shots']=[{'t':3+i/24,'name':f'frame{i:04d}'} for i in range(192)]
specfile=folder/'spec.json';specfile.write_text(json.dumps(spec),encoding='utf-8')
exe=HOME/'Projects/Aetherward/Builds/WindowsDev/Aetherward.exe'
try:
 startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=4
 proc=subprocess.Popen([str(exe),'-force-d3d11','-screen-fullscreen','0','-screen-width','1280','-screen-height','720','-awCapture',str(specfile),'-logFile',str(folder/'player.log')],cwd=exe.parent,startupinfo=startup)
 proc.wait(timeout=100)
 count=len(list(frames.glob('frame*.png')))
 if count<48:raise RuntimeError(f'Only {count} actual frames')
 dest=ROOT/'public/products/aetherward/gameplay-film.mp4'
 subprocess.run([FF,'-y','-framerate','24','-i',str(frames/'frame%04d.png'),'-an','-c:v','libx264','-preset','fast','-crf','26','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 report.append({'slug':'aetherward','file':str(dest.relative_to(ROOT)),'kind':'native Unity frames, actual running battle','fps':24,'frames':count});print('RECORDED aetherward',count,flush=True)
except Exception as e:
 if 'proc' in locals() and proc.poll() is None:proc.terminate()
 report.append({'slug':'aetherward','error':str(e)})

# Original source VFX footage is kept explicitly identified as a VFX preview.
source=HOME/'OneDrive/Documents/Arcane-Brigade/PreviewExports/FxPreview/comet-runner.mp4'
dest=ROOT/'public/products/arcane-brigade/vfx-film.mp4'
subprocess.run([FF,'-y','-i',str(source),'-t','8','-an','-vf','scale=1280:-2','-c:v','libx264','-preset','fast','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
report.append({'slug':'arcane-brigade','file':str(dest.relative_to(ROOT)),'source':str(source.relative_to(HOME)),'kind':'original in-engine VFX preview, not a trailer'})
(ROOT/'src/content/portfolio-films.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
