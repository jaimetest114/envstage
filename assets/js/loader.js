/* Applies Developer Studio saved edits (localStorage key "nova.studio") to the real site. Not shown in the Studio. */
(function(){
/*RULES-ENGINE-START*/
function novaRun(rules){
var dl=window.dataLayer=window.dataLayer||[],L=location,done=window.__novaRuleDone=window.__novaRuleDone||{};
var q=function(s){try{return document.querySelector(s)}catch(e){return null}};
var vars=function(){var s=new URLSearchParams(L.search),h=q('h1');return{title:document.title,slug:s.get('slug')||s.get('id')||'',path:L.pathname,url:L.href,host:L.hostname,query:L.search,h1:h?h.textContent.trim():'',referrer:document.referrer}};
var fill=function(t){var v=vars();return String(t).replace(/\{\{\s*css:([^}]+?)\s*\}\}/g,function(_,s){var e=q(s);return e?e.textContent.trim().slice(0,200):''}).replace(/\{\{\s*(\w+)\s*\}\}/g,function(_,k){return v[k]!=null?v[k]:''})};
var ok=function(r){var m=r.match||'any',w=r.when||'';if(m==='any'||!w)return true;try{if(m==='contains')return L.href.indexOf(w)>-1;if(m==='equals')return L.pathname===w||L.href===w;if(m==='regex')return new RegExp(w).test(L.href)}catch(e){}return false};
var push=function(r){var o={event:r.event};(r.params||[]).forEach(function(p){if(p.k)o[p.k]=fill(p.v)});dl.push(o);if(window.console)console.log('[NOVA rule] pushed',o)};
var n=0;(rules||[]).forEach(function(r){if(!r.on||!/^[A-Za-z_]\w*$/.test(r.event||'')||!ok(r))return;n++;
if(r.trigger==='click'){if(!r.selector)return;var k='c'+r.id;if(done[k])return;done[k]=1;document.addEventListener('click',function(e){var t=e.target&&e.target.closest&&e.target.closest(r.selector);if(t)push(r)},true)}
else{var k2='l'+r.id+'|'+L.href;if(done[k2])return;done[k2]=1;push(r)}});return n}
/*RULES-ENGINE-END*/
try{if(window.name==='nova-studio-probe')return;
/* Consent Mode defaults MUST be in dataLayer before any GTM snippet runs */
var dl=window.dataLayer=window.dataLayer||[];function g(){dl.push(arguments)}
if(!window.__NOVA_CONSENT){window.__NOVA_CONSENT=1;var gm=function(c){var x=function(v){return v?'granted':'denied'};return{analytics_storage:x(c.analytics),ad_storage:x(c.marketing),ad_user_data:x(c.marketing),ad_personalization:x(c.marketing),personalization_storage:x(c.personalization),functionality_storage:'granted',security_storage:'granted'}};
 var d0=gm({});d0.wait_for_update=500;g('consent','default',d0);var sc=null;try{sc=JSON.parse(localStorage.getItem('nova.consent'))}catch(e){}if(sc)g('consent','update',gm(sc))}
var D=JSON.parse(localStorage.getItem('nova.studio')||'{}'),F=D.files||{},E=D.enabled||{},seen={};
var run=function(c,n){try{var s=document.createElement('script');s.text=c;document.head.appendChild(s);s.remove()}catch(e){console.error(n+' failed: '+e.message)}};
if(F['assets/js/config.js'])run(F['assets/js/config.js'],'config.js');
if(/^GTM-[A-Z0-9]{4,}$/.test(D.gtm||'')&&D.gtm!=='GTM-XXXXXXX'){window.NOVA_CONFIG=window.NOVA_CONFIG||{};window.NOVA_CONFIG.gtmId=D.gtm}
if(F['assets/css/styles.css']){var st=document.createElement('style');st.textContent=F['assets/css/styles.css'];document.head.appendChild(st)}
var gt={};var clean=function(c){return c.replace(/<script\b[\s\S]*?<\/script>|<noscript\b[\s\S]*?<\/noscript>/gi,function(b){var m=b.match(/googletagmanager\.com\/(?:gtm\.js|ns\.html)\?id=|'(GTM-[A-Z0-9]{4,})'/);var ids=b.match(/GTM-[A-Z0-9]{4,}/g);if(!ids||!/googletagmanager\.com/.test(b))return b;var id=ids[0];if(id==='GTM-XXXXXXX'){console.warn('[NOVA] Ignored placeholder GTM snippet (GTM-XXXXXXX).');return''}var k=(/<noscript/i.test(b)?'ns:':'js:')+id;if(gt[k]){console.warn('[NOVA] Ignored duplicate GTM snippet for '+id+'.');return''}gt[k]=1;return b})};
var inj=function(p,parent,top){var c=F[p];if(!E[p]||!c)return;c=clean(c);if(!c.trim()||seen[c])return;seen[c]=1;var f=document.createRange().createContextualFragment(c);top?parent.insertBefore(f,parent.firstChild):parent.appendChild(f)};
inj('tracking/head-scripts.html',document.head);inj('tracking/pixels.html',document.head);
document.addEventListener('DOMContentLoaded',function(){inj('tracking/body-scripts.html',document.body,1);if(E['tracking/custom-tracking.js']&&F['tracking/custom-tracking.js'])run(F['tracking/custom-tracking.js'],'custom-tracking.js');if(D.rules&&D.rules.length){try{novaRun(D.rules)}catch(e){console.error('Event rules failed: '+e.message)}}})
}catch(e){console.error('Studio loader error',e)}})();
