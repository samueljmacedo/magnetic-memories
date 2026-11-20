# Translations plan (EN / PT / FR)

Status: planned, not started.

## 1. Interface text
- Use `react-i18next` with one JSON file per language (`en.json`, `pt.json`, `fr.json`).
- Components call `t('hero.title')` instead of holding the text.
- Language comes from the browser setting and is remembered in the visitor's browser.
- Text to move first: Hero, About, MagnetPanel, TravelMap, filter labels and nav items.
- Make `formatDate` use the active language (it is fixed to `en-GB` today).

## 2. Content from Sanity
- Preferred: field-level translations, for example `description` becomes `{en, pt, fr}`.
- The GROQ query picks the active language and falls back to English.
- Country names can use `Intl.DisplayNames`; city names may need a translated field.
- Descriptions are personal, so they are written by hand rather than machine-translated.
- Open question: translate the Sanity fields, or only the interface?

## 3. Language switcher
- Small EN / PT / FR toggle in the nav, styled like the filter pills.
- Sets `<html lang>` for screen readers and search engines.

## 4. URLs
- Keep one URL and switch the language in the browser.
- Separate `/pt/` and `/fr/` paths are better for search engines but complicate GitHub Pages and the Cloudflare move. Can be added later.

## Order of work
1. Move the interface text into `en.json`.
2. Add `pt.json` and `fr.json` plus the switcher.
3. Translate the Sanity content (if chosen).
