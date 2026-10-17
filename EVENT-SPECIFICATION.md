# NOVA Living — Event Specification
All pushes are centralised in `assets/js/app.js` (`track(event,params)`; `ecom(event,ecommerce,extra)` which first pushes `{ecommerce:null}`). Currency `USD`, numeric money. **No names, emails, addresses, passwords or payment data are ever pushed.** Items: `item_id,item_name,item_brand("NOVA Living"),item_category,price,quantity[,index,item_list_id,item_list_name]`.
Consent: Google tags should require `analytics_storage` (GA4) / `ad_storage` etc. in GTM. Events are always pushed to `dataLayer`; whether tags fire depends on GTM consent settings.

## Standard (GA4) events
| Event | Trigger | Key params |
|---|---|---|
| view_item_list | Product lists (home, category, article recs) | item_list_id/name, items[] |
| select_item | Click product card/“View product” | item_list_*, items[1], placement |
| view_item | Product page | currency, value, items[1] |
| add_to_cart | Product/article/cart “+” | value, items[qty], placement |
| remove_from_cart | Cart “−”/Remove | value, items[qty] |
| view_cart | Cart page | currency, value, coupon, items |
| begin_checkout | Checkout page, once per cart signature per session | currency, value, coupon, items |
| add_shipping_info | Step 2 → 3 | shipping_tier, value, items |
| add_payment_info | Complete-purchase click (before processing) | payment_type:`demo_card` |
| purchase | **Only** after simulated approval; once per `transaction_id` | transaction_id `NOVA-DEMO-nnnnn`, value (total incl. tax+shipping), tax, shipping, coupon, items |
| view_promotion / select_promotion | Home promo banners | promotion_id/name, creative_slot |
| search | Search page load with `q` (not on reload, not per keystroke) | search_term (lowercased), results_count |
| sign_up / login | Only after successful demo action | method:`demo` |
| share | Share buttons | method, content_type, item_id |
`refund` is not implemented.

## Custom events
page_view (page_type, page_title, page_location, page_category) · content_list_view (list_name, items_count, content_ids) · article_view (content_id, content_type, content_category) · article_scroll (25/50/75/90, once each) · article_engagement (≥15 s active + ≥25% scroll, once) · select_content (content_id, content_type, placement) · filter_content / sort_content / load_more_content · newsletter_signup (form_name, placement; only on success/explicit opt-in) · form_start (first focus) / form_submit (valid) / form_error (form_name, error_type) · begin_reservation (item_id) · reserve_product (item_id, item_name, quantity, price, reservation_ref; success only) · reservation_confirmation · checkout_step_view (1–3) · checkout_error (error_type, checkout_step) · coupon_applied (coupon) · consent_update (consent_analytics/marketing/personalization) · navigation_click · outbound_click (link_domain, placement) · cta_click (cta_name, cta_location) · logout.

## Example purchase (from a real test run)
```json
{"event":"purchase","ecommerce":{"transaction_id":"NOVA-DEMO-10001","currency":"USD","value":191.48,"tax":14.18,"shipping":0,"coupon":"NOVA10","items":[{"item_id":"smart-lamp-001","item_name":"NOVA Smart Lamp","item_brand":"NOVA Living","item_category":"Home & Living","price":79,"quantity":2},{"item_id":"pour-over-kit-004","item_name":"Ceramic Pour-Over Kit","item_brand":"NOVA Living","item_category":"Home & Living","price":39,"quantity":1}]}}
```
## Caveats
Dedupe is a localStorage `nova.tx` list (demo only). `value` on non-purchase ecommerce events = subtotal − discount (excludes shipping/tax). `search_term` may appear in `page_location` (the URL). `consent` commands are pushed as `arguments` objects (gtag style).
