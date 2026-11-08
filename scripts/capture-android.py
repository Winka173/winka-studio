from pathlib import Path
import subprocess,time,json
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'.review/product-captures';OUT.mkdir(parents=True,exist_ok=True)
DEVICE='emulator-5556'
def adb(*args):return subprocess.run(['adb','-s',DEVICE,*args],capture_output=True,timeout=90)
apps=[('sticky-wall','com.apps.winka.stickywall',None),('handy-bookmark','',r'C:\Users\Winka\Projects\Handy-Suite\apps\handy_bookmark\build\app\outputs\flutter-apk\app-release.apk'),('machine-brigade','com.winka.machinebrigade',r'C:\Users\Winka\Projects\MachineBrigade\Builds\Android\MachineBrigade-dev.apk')]
for slug,package,apk in apps:
    folder=OUT/slug;folder.mkdir(exist_ok=True)
    result={'product':slug,'device':DEVICE,'screenshotKind':'Android runtime capture','dataReset':False}
    try:
        if not package:
            aapt=next(Path(r'C:\Users\Winka\AppData\Local\Android\Sdk\build-tools').glob('*/aapt.exe'))
            import re
            badging=subprocess.run([str(aapt),'dump','badging',apk],capture_output=True,text=True).stdout
            package=re.search(r"package: name='([^']+)'",badging).group(1)
        installed=adb('shell','pm','path',package).stdout
        if b'package:' not in installed and apk:
            installedResult=adb('install','-r',apk);result['install']=installedResult.stdout.decode(errors='replace')
            if installedResult.returncode:raise RuntimeError(result['install'])
        adb('shell','monkey','-p',package,'-c','android.intent.category.LAUNCHER','1');time.sleep(7)
        shot=adb('exec-out','screencap','-p');(folder/'android-launch.png').write_bytes(shot.stdout)
        ui=adb('shell','uiautomator','dump','/sdcard/winka-capture.xml');xml=adb('exec-out','cat','/sdcard/winka-capture.xml').stdout
        (folder/'ui.xml').write_bytes(xml);result['package']=package
        result['captured']=package.encode() in xml
        if not result['captured']:
            result['error']='Target app is absent from the foreground UI. Screenshot is not approved product media.'
    except Exception as exc:result['error']=str(exc)
    (folder/'android-capture.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    print(slug,result,flush=True)
