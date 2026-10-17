# NOVA Living — Test Plan
Setup: `python3 -m http.server 8000`; clear `nova.*` localStorage for a clean run. Check `dataLayer` or the Studio inspector.

| # | Journey | Steps | Expected |
|---|---|---|---|
| A | Navigation | Open home, articles, article, product, cart | Exactly 1 `page_view` each, correct page_type/title |
| B | Article | Scroll to bottom; click inline “Add to cart” | `article_scroll` 25/50/75/90 once each; add_to_cart `placement=article_inline_1`; engagement once after 15 s active |
| C | Search | “smart lamp”; nonexistent term; Clear | `search` w/ search_term; empty state + suggestions; none on reload |
| D | Register | Empty; bad email; valid | `form_error` (required, invalid_email); `sign_up` once only on success; no password in dataLayer |
| E | Ecommerce | Product → qty 2 → add; cart +, −, Remove | items/prices/qty match; header count matches |
| F | Reserve | Invalid, then valid | `reserve_product` + `reservation_confirmation` only on success; **no** `purchase` |
| G | Purchase | 2 products, `NOVA10`, checkout, standard shipping, approve | begin_checkout, step views 1–3, add_shipping_info, add_payment_info, one `purchase` (value = sub − disc + ship + tax); cart cleared; order persists |
| H | Failure | Choose “declines” → error → switch → retry | `checkout_error payment_declined`; no purchase; cart kept; retry succeeds with 1 purchase |
| I | Consent | Fresh load; accept; reload; Customize/Reject; reload | default denied pushed first; choice persists; `consent_update` fired |
| J | Duplicates | Double-click pay; reload/back/forward confirmation; re-apply coupon | 1 order, 1 purchase, “already applied” |
| K | Code Editor | Open from a page; edit HTML/CSS/JS/tracking; Save; view site; reload; Reset; Export | Opens on current page HTML; Save button only when changed; edits appear on site and persist; bad JS refused; Reset restores all |
| K2 | Editor features | Highlighting, line numbers, tabs, auto-close, Enter indent, Tab, Ctrl+/, Ctrl+S, find/replace, A+ | All behave as in a code editor |
| K3 | Event Rules | Add preset `view_content`; Save; open an article, home; add click rule on Add to cart | Fires once on articles with title/slug filled; not on home; click rule fires once per click; invalid rule blocks Save |
| K4 | Bookmarklet | Build with a GTM ID; run on a different site | `gtm.js?id=` requested once; rules apply; 2nd run on same load adds nothing |
| L | GTM Preview | Set real ID; connect Tag Assistant to localhost URL | **Not performed — needs your container** |
| M | Responsive | 1200/768/375 px | Menu works, no horizontal scroll |

## Results (automated Playwright/Chromium run, 17 Oct 2026)
Passed: A (all 15 pages + invalid slug/id/order fallbacks, no console errors), B, C, D, E, F, G (purchase payload verified, totals equal order record), H, I, J, K (re-tested after the Studio rework: page HTML/CSS/JS/tracking edits apply to the site, Save visibility, syntax-error refusal, reset), M (375 px menu + no overflow).
Event Rules and bookmarklet: 28 automated checks passed (rules on page load/click, URL conditions, validation, persistence, reset, bookmarklet on a separate local site, no duplicates).
Not verified: L; real GTM/GA4/Meta/TikTok/LinkedIn delivery; Safari/Firefox; screen-reader testing; contrast audit; 768 px visual review; Studio Import and Export paths after the rework; keyboard-only walkthrough.
