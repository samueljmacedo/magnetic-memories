# Magnetic Memories — travel journal starter

A first homepage prototype built with React, TypeScript and Vite.

## To-do

### Next up

**About section**
- [ ] Slideshow of up to 5 pictures with an automatic transition (replaces the single picture; this also covers the earlier "multiple pictures of myself" item)
- [ ] Resize and compress the pictures (`about-picture.png` is 1 MB)

**Journey section**
- [ ] Smooth transitions between carousel slides
- [ ] Write the remaining journey descriptions in the Studio (in all three languages)
- [ ] Add more images to each journey, to show them as a gallery (needs a `gallery` field in the Sanity `journey` schema)
- [ ] "See more pictures" button and gallery modal on each journey (depends on the gallery images above)
- [ ] Check the dates of each trip (the `data.ts` placeholders had Birmingham ending on `17 Nov 20260` and Strasbourg ending before it starts; the live data comes from Sanity)

**Map section**

**Magnet panel**
- [ ] Bigger modal on mobile, so the picture is larger and shows more detail

**Branding**
- [ ] Add the Magnetic Memories logo as the favicon
- [ ] Turn the site into a PWA (web manifest, app icons, maybe offline support)

### Done

- [x] About slideshow: up to 5 pictures from the Studio with an automatic crossfade (this also covers the earlier "multiple pictures of myself" item)
- [x] Map counters roll like an odometer when they scroll into view, using the React Bits CountUp (the visitor map counters too)
- [x] Consistent stylesheet with shared design tokens
- [x] Interactive Leaflet map with a pin for each journey
- [x] Sanity Studio set up with a `journey` schema
- [x] Journey carousel and map load their data from Sanity (with `data.ts` as a fallback)
- [x] Year and country filters on the journeys carousel (the year starts on the newest journey)
- [x] New MagnetPanel (sticker sheet with tilt and shine)
- [x] Build errors fixed (unused `image-reveal` and `Moments` components removed)
- [x] Write a proper introduction on the website
- [x] Portuguese and French translations (interface, journeys, country names and dates; plan in `docs/translations-plan.md`)
- [x] Moved the hosting from GitHub Pages to Cloudflare (Workers with static assets), and added the Cloudflare address to the Sanity CORS origins
- [x] Visitor map with a country counter (Cloudflare Worker + D1)

## Run locally

1. Install Node.js (current LTS recommended).
2. Open this folder in your terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite (usually http://localhost:5173).

## First edits

- Replace the sample photos in `src/App.tsx` and `src/data/data.ts` with your own images.
- Edit the sample journeys and favourite places in `src/data/data.ts`.
- Adjust colors, typography and spacing in `src/styles.css`.
- Update the page title and description in `index.html`.

## Content from Sanity

The journeys come from Sanity Studio (`studio-magnetic-memories/`, project `roou5dul`, dataset `production`).

- `src/lib/sanity.ts`: the client and the image URL helper.
- `src/lib/journeys.ts`: the GROQ query and the mapping to the `Journey` type used by the components.
- `src/context/JourneysContext.tsx`: fetches in a `useEffect` once and shares the result with the carousel and the map.
- Only **published** journeys appear, and only complete ones (city, country, start date, location and main image).
- If Sanity can't be reached, or has no published journeys, the placeholder trips in `src/data/data.ts` are shown and a message is logged in the browser console.
- First time: add `http://localhost:5173` (and your production domain) under CORS origins at https://www.sanity.io/manage → your project → API.

Run the Studio with `cd studio-magnetic-memories && npm install && npm run dev`.

### Translated journeys

- `description` and `tag` hold one text per language (`{en, pt, fr}`). English is required and the site falls back to it when a translation is empty. The Studio shows a warning, not an error, for missing translations.
- Country names are translated on the website, with `countries.<name>` keys in `src/i18n/*.json` (for example `countries.Scotland`). A country without a key is shown as it is in Sanity.
- Journeys saved before this change keep working (the old text is read as English). To move them to the new shape run, from `studio-magnetic-memories/`:
  `npx sanity exec scripts/migrate-localized-fields.ts --with-user-token` (dry run), then add `APPLY=1` in front to apply it.

## Notes

- This is a visual first iteration with sample content; navigation links are section anchors.
- The language selector is a visual placeholder for now. Real EN/PT/FR routing and translations come in a later phase.
- The travel map is an interactive Leaflet map (react-leaflet). Pins, popups and the stats come from each journey's `lat`/`lng` in `src/data/data.ts`. Basemap tiles are © OpenStreetMap contributors © CARTO.
- No backend, CMS, guestbook or database is included yet.
- The sample image URLs require an internet connection. Download and optimize your own images before publishing.

## Visitor counter

The "Postcards from N countries" map counts visits per country, and nothing else.

- `worker/index.ts`: a small Cloudflare Worker. `POST /api/visit` adds 1 to the visitor's country (Cloudflare provides it, the IP address is never read), and `GET /api/visitors` returns the totals. Everything outside `/api/*` is served straight from the static files.
- `worker/schema.sql`: the single `visits` table in a D1 database.
- `src/lib/visitors.ts`: fetches the totals and counts a visit once per browser (the only thing stored in the browser is a flag, `mm-visit-counted`).
- `src/data/countryCentroids.json`: a point for each country code, from the open `world-countries` data.
- Country names on the map come from the browser's `Intl.DisplayNames`, so they follow the site language.
- Local development has no Worker, so `npm run dev` shows sample numbers. To try the real thing: `npm run build`, then `npx wrangler d1 execute DB --local --file=worker/schema.sql`, then `npx wrangler dev`.

One-time setup on Cloudflare: create a D1 database named `magnetic-memories-visitors` (Storage & databases > D1), run the contents of `worker/schema.sql` in its Console tab, and put its id in `wrangler.jsonc` as `database_id`.

### About pictures

In the Studio, open **About** and add up to 5 pictures, each with a short description (used as the alt text, in all three languages). The website crops and resizes them, changes between them automatically (paused while the pointer is over them, and off for visitors who ask for less motion) and shows dots to pick one. Until the Studio has pictures it shows `src/data/images/about/about-picture.png`.
