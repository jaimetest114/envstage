import json,os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
F=["assets/css/styles.css", "assets/js/config.js", "assets/js/app.js", "tracking/head-scripts.html", "tracking/body-scripts.html", "tracking/pixels.html", "tracking/custom-tracking.js"]
d={f:open(f).read() for f in F}
open('developer-studio/sources.js','w').write('/* Bundled originals for file:// use. */\nwindow.NOVA_SOURCES='+json.dumps(d).replace('</','<\\/')+';\n')
print('sources.js regenerated')
