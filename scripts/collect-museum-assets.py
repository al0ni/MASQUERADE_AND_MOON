import json, pathlib, time, zipfile
from io import BytesIO
import requests
from PIL import Image, ImageOps

folder = pathlib.Path('museum-assets')
folder.mkdir(exist_ok=True)
session = requests.Session()
session.headers.update({'User-Agent': 'MasqueradeMoonEducationalProject/1.0'})
hosts = ['https://collectionapi.metmuseum.org/public/collection/v1', 'https://collectionapi.metmuseum.org/public/collection/v1.1']
terms = ['mask', 'costume', 'dress', 'fan', 'gown', 'fashion']
candidates = []
diagnostics = []
for term in terms:
    for host in hosts:
        try:
            r = session.get(host + '/search', params={'q':term, 'hasImages':'true'}, timeout=16)
            diagnostics.append({'term':term, 'status':r.status_code, 'cors':r.headers.get('access-control-allow-origin'), 'url':r.url})
            r.raise_for_status()
            items = (r.json().get('objectIDs') or [])[:30]
            candidates.extend((host, obj, term) for obj in items)
            print('SEARCH', term, len(items), flush=True)
            break
        except Exception as error:
            print('SEARCH ERROR', term, str(error)[:130], flush=True)
    if len(candidates)>120: break

selected=[]
seen=set()
for host, obj, term in candidates:
    if len(selected)>=8: break
    if obj in seen or sum(i['term']==term for i in selected)>=3: continue
    seen.add(obj)
    try:
        r=session.get(host+'/objects/'+str(obj), timeout=15)
        if not r.ok: continue
        item=r.json()
        image=item.get('primaryImageSmall') or item.get('primaryImage')
        if not image or not image.startswith('https://images.metmuseum.org'): continue
        if not item.get('isPublicDomain'): continue
        title=item.get('title') or ''
        kind=item.get('objectName') or ''
        if not any(t in (title+' '+kind).lower() for t in ('mask','costume','dress','fan','gown','robe','headdress','tunic','fashion')): continue
        photo=session.get(image,timeout=18)
        if not photo.ok or not photo.headers.get('content-type','').startswith('image/') or len(photo.content)<7000: continue
        with Image.open(BytesIO(photo.content)) as raw:
            picture=ImageOps.exif_transpose(raw).convert('RGB')
            if min(picture.size)<170: continue
            picture.thumbnail((850,850),Image.Resampling.LANCZOS)
            filename='met-'+str(obj)+'.webp'
            picture.save(folder/filename,'WEBP',quality=83,method=6)
        selected.append({'id':obj,'title':title,'date':item.get('objectDate') or '', 'creator':item.get('artistDisplayName') or item.get('culture') or '', 'image':'images/museum/'+filename,'url':item.get('objectURL') or 'https://www.metmuseum.org/art/collection/search/'+str(obj),'term':term})
        print('SAVED',obj,title,picture.size,flush=True)
        time.sleep(.15)
    except Exception as error:
        print('ITEM ERROR',obj,str(error)[:130],flush=True)

(folder/'museum-catalog.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2))
(folder/'diagnostic.json').write_text(json.dumps(diagnostics,ensure_ascii=False,indent=2))
with zipfile.ZipFile('museum-assets.zip','w',zipfile.ZIP_DEFLATED) as archive:
    for file in folder.iterdir(): archive.write(file,file.name)
print('FINAL COUNT',len(selected),flush=True)
if len(selected)<6: raise SystemExit(1)
