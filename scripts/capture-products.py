"""Capture existing product builds. Save website evidence outside source repos."""
from pathlib import Path
import subprocess, json, time, os
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'.review/product-captures'; OUT.mkdir(parents=True,exist_ok=True)
HOME=Path(r'C:\Users\Winka')
def native(slug, relative, args, limit=100):
    folder=OUT/slug;folder.mkdir(exist_ok=True)
    exe=HOME/relative
    cmd=[str(exe),'-force-d3d11','-screen-fullscreen','0','-screen-width','1920','-screen-height','1080','-logFile',str(folder/'player.log')]+args
    info={'product':slug,'binary':str(exe),'command':cmd,'started':time.time()}
    try:
        # Render the interactive player without stealing foreground focus.
        # A hidden DX12 swapchain yielded blank captures on this machine.
        startup=subprocess.STARTUPINFO();startup.dwFlags|=subprocess.STARTF_USESHOWWINDOW;startup.wShowWindow=4
        proc=subprocess.Popen(cmd,cwd=exe.parent,startupinfo=startup)
        print('RUN',slug,proc.pid,flush=True)
        try: info['exit']=proc.wait(timeout=limit)
        except subprocess.TimeoutExpired:
            proc.terminate();proc.wait(timeout=10);info['limitReached']=True
        info['screenshots']=[str(p.relative_to(ROOT)) for p in folder.glob('*.png')]
    except Exception as exc: info['error']=str(exc)
    (folder/'capture-run.json').write_text(json.dumps(info,indent=2),encoding='utf-8')
    print('DONE',slug,len(info.get('screenshots',[])),flush=True)

spec=json.loads((HOME/'Projects/Aetherward/Reports/Animation/capture_spec.json').read_text(encoding='utf-8-sig'))
spec['outDir']=str(OUT/'aetherward');spec['label']='Winka Studio website capture';spec['shots']=[{'t':-1,'name':'preparation'},{'t':6,'name':'battle'},{'t':12,'name':'battle-late'}]
specpath=OUT/'aetherward-spec.json';specpath.write_text(json.dumps(spec),encoding='utf-8')
native('aetherward','Projects/Aetherward/Builds/WindowsDev/Aetherward.exe',['-awCapture',str(specpath)],80)
native('forgebound','Projects/Forgebound/Builds/Windows/Forgebound.exe',['-fbCapture',str(OUT/'forgebound'),'-fbSeed','7','-fbTag','website'],100)
native('runavelle','Projects/Runavelle/Builds/Windows/Runavelle.exe',['-runavelleCapture',str(OUT/'runavelle'),'-captureNights','2','-captureTag','website'],100)
native('arcane-brigade','OneDrive/Documents/Arcane-Brigade/Builds/FullRun/ArcaneBrigade.exe',['-arcane-art-master','-capturePath',str(OUT/'arcane-brigade'),'-art-available'],100)
