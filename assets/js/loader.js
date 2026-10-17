/* Applies Developer Studio saved edits (localStorage key "nova.studio") to the real site. Not shown in the Studio. */
(function(){try{if(window.name==='nova-studio-probe')return;
var D=JSON.parse(localStorage.getItem('nova.studio')||'{}'),F=D.files||{},E=D.enabled||{},seen={};
var run=function(c,n){try{var s=document.createElement('script');s.text=c;document.head.appendChild(s);s.remove()}catch(e){console.error(n+' failed: '+e.message)}};
if(F['assets/js/config.js'])run(F['assets/js/config.js'],'config.js');
if(/^GTM-[A-Z0-9]{4,}$/.test(D.gtm||'')&&D.gtm!=='GTM-XXXXXXX'){window.NOVA_CONFIG=window.NOVA_CONFIG||{};window.NOVA_CONFIG.gtmId=D.gtm}
if(F['assets/css/styles.css']){var st=document.createElement('style');st.textContent=F['assets/css/styles.css'];document.head.appendChild(st)}
var gt={};var clean=function(c){return c.replace(/<script\b[\s\S]*?<\/script>|<noscript\b[\s\S]*?<\/noscript>/gi,function(b){var m=b.match(/googletagmanager\.com\/(?:gtm\.js|ns\.html)\?id=|'(GTM-[A-Z0-9]{4,})'/);var ids=b.match(/GTM-[A-Z0-9]{4,}/g);if(!ids||!/googletagmanager\.com/.test(b))return b;var id=ids[0];if(id==='GTM-XXXXXXX'){console.warn('[NOVA] Ignored placeholder GTM snippet (GTM-XXXXXXX).');return''}var k=(/<noscript/i.test(b)?'ns:':'js:')+id;if(gt[k]){console.warn('[NOVA] Ignored duplicate GTM snippet for '+id+'.');return''}gt[k]=1;return b})};
var inj=function(p,parent,top){var c=F[p];if(!E[p]||!c)return;c=clean(c);if(!c.trim()||seen[c])return;seen[c]=1;var f=document.createRange().createContextualFragment(c);top?parent.insertBefore(f,parent.firstChild):parent.appendChild(f)};
inj('tracking/head-scripts.html',document.head);inj('tracking/pixels.html',document.head);
document.addEventListener('DOMContentLoaded',function(){inj('tracking/body-scripts.html',document.body,1);if(E['tracking/custom-tracking.js']&&F['tracking/custom-tracking.js'])run(F['tracking/custom-tracking.js'],'custom-tracking.js')})
}catch(e){console.error('Studio loader error',e)}})();
