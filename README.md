# Magnetic Memories — travel journal starter

A first homepage prototype built with React, TypeScript and Vite.

## To-do

### Planned for after 17 November

- [ ] Add more images to each journey, to show them as a gallery (needs a `gallery` field in the Sanity `journey` schema)
- [ ] Add Portuguese and French translations
- [ ] Correct the dates of each trip (for example, in `data.ts` Birmingham ends on `17 Nov 20260` and Strasbourg ends before it starts)
- [ ] Write a proper introduction on the website
- [ ] Add multiple pictures of myself in the introduction

### Open items noticed along the way

- [ ] "See more pictures" button and gallery modal on each journey (depends on the gallery images above)
- [ ] Add the production domain to the CORS origins in Sanity (sanity.io/manage → API)
- [ ] Maybe move the hosting from GitHub Pages to Cloudflare (Pages/Workers): set `base` to `'/'` in `vite.config.ts`, replace the deploy workflow, and update the Sanity CORS origin

### Done

- [x] Consistent stylesheet with shared design tokens
- [x] Interactive Leaflet map with a pin for each journey
- [x] Sanity Studio set up with a `journey` schema
- [x] Journey carousel and map load their data from Sanity (with `data.ts` as a fallback)
- [x] Year and country filters on the journeys carousel
- [x] New MagnetPanel (sticker sheet with tilt and shine)
- [x] Published on GitHub Pages
- [x] Build errors fixed (unused `image-reveal` and `Moments` components removed)

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

## Notes

- This is a visual first iteration with sample content; navigation links are section anchors.
- The language selector is a visual placeholder for now. Real EN/PT/FR routing and translations come in a later phase.
- The travel map is an interactive Leaflet map (react-leaflet). Pins, popups and the stats come from each journey's `lat`/`lng` in `src/data/data.ts`. Basemap tiles are © OpenStreetMap contributors © CARTO.
- No backend, CMS, guestbook or database is included yet.
- The sample image URLs require an internet connection. Download and optimize your own images before publishing.
