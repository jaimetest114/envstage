# NOVA Living — Commerce & Content Analytics Lab
Frontend-only demo: content site + simulated ecommerce + GTM/GA4 testing + Developer Studio. Vanilla HTML/CSS/JS, no framework.
**Authentication, reservations, checkout and payment are simulated. Nothing is sent to any server and no real account or payment exists.**

## Run
```bash
cd nova-living && python3 -m http.server 8000   # then open http://localhost:8000/
```
Use http://, not file:// (the Studio fetches source files).

## Structure
`*.html` (15 pages: thin shells with `data-page`) · `assets/css/styles.css` · `assets/js/config.js` (GTM ID) · `assets/js/app.js` (**all** logic: catalog, analytics, consent, cart, checkout, auth, page renderers) · `tracking/*` (editable templates used by the Studio) · `developer-studio/index.html` · docs.
*Deviation from the PRD:* the PRD suggests 9 separate JS files; they are consolidated into `app.js` (analytics lives in the clearly marked `ANALYTICS` section; all `dataLayer` pushes go through `track()`/`ecom()`).

## GTM / GA4
1. Edit `assets/js/config.js`: `gtmId:'GTM-XXXXXXX'` → your container ID. The placeholder is **never loaded**.
2. Page-view strategy: the site pushes **one explicit `page_view`** per load. In GTM, set your GA4 Configuration/Google tag to *not* send an automatic page view and add a GA4 Event tag (`page_view`) on a Custom Event trigger `page_view`; otherwise you will double count.
3. Consent Mode v2: `consent default` (all optional = denied, `wait_for_update:500`) is pushed **before** GTM loads; stored choices are replayed as `consent update`. Advanced mode (tags load, cookieless pings) vs basic mode (block tags until consent) is chosen by your GTM tag consent settings. The banner does not guarantee legal compliance.
4. Direct GA4 (gtag.js) is not implemented; if you add it, do not also fire GA4 from GTM.
5. Preview: open http://localhost:8000/ in a normal tab → GTM *Preview* / Tag Assistant → connect to that URL. Inspect: `dataLayer` in the browser console.

## Journeys to try
Register (`signup.html`) · reserve (`reserve.html?id=smart-lamp-001`) · add to cart → `cart.html` (codes `NOVA10` = 10% off, `WELCOME5` = $5 off when subtotal ≥ $25; one code at a time, repeats rejected) → `checkout.html`. At step 3 choose **“Demo card — declines”** to test failure, then switch to approve and retry. Shipping: standard $5 (free when net ≥ $75) or express $12; tax 8%. Reset state: clear `nova.*` keys (DevTools → Application → Local Storage) — consent is `nova.consent`; or use “Cookie settings” in the footer.

## Code Editor / Developer Studio (`developer-studio/index.html`, or "</> Code Editor" in the site header)
A code-only editor (no preview, no console). Opened from a site page, it shows **that page's HTML** (the rendered markup, first entry in the file list), plus shared code: `styles.css`, `config.js`, `app.js` and the four `tracking/*` files.
- **Save changes** appears only when something has changed. Saved edits are stored in this browser (`localStorage` key `nova.studio`) and are **applied to the real site pages** on the next load (`assets/js/loader.js` + `app.js` read them). Open the site to see the result.
- **Reset to original** (confirmation required) deletes all saved edits and restores the original page HTML, CSS, JS, tracking scripts and GTM ID.
- **Export / Import** a JSON backup. JavaScript with a syntax error cannot be saved.
- **Tracking & Pixels** (collapsible): GTM ID, enable toggles per script (head / body / pixels / custom JS), presets, identical-snippet de-duplication. Enabled scripts run on the real site and can send data to third parties — use trusted code only.
- **Editor features (built in, no libraries, works offline and on file://):** VS Code-style dark theme; syntax highlighting for HTML (with embedded JS/CSS), CSS and JavaScript; line numbers and current-line highlight; file tabs with unsaved dot; find / replace (Ctrl/Cmd+F, Enter / Shift+Enter, Replace all); auto-indent, auto-closing brackets and quotes; Tab / Shift+Tab indent; Ctrl/Cmd+/ toggle comment; Ctrl/Cmd+Shift+D duplicate line; Ctrl/Cmd+S save; native undo/redo; status bar with line/column and A−/A+ font size.
- **Limits:** not Monaco/VS Code itself (no autocomplete, multi-cursor, minimap, folding or word-wrap; highlighting is regex-based, so unusual JS regexes may colour imperfectly); edits live only in this browser and are never written to disk or deployed; a saved page-HTML edit is a *static snapshot for that exact URL* (cart/checkout/order content on it stops updating until Reset; list/search/form widgets need their ids kept); if you break the site with an edit, open the Code Editor and click Reset (or delete `nova.studio` in DevTools → Local Storage). Tag Assistant works against the normal site URL.

## Known limitations
Static frontend: demo order/duplicate protection is localStorage only (production needs server-side idempotency); `404.html` is only served by hosts configured for it (python’s server shows its own 404); images are generated SVG placeholders; no real GTM/GA4 hit was verified (needs your IDs).
