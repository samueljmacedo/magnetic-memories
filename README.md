# Magnetic Memories — travel journal starter

A first homepage prototype built with React, TypeScript and Vite.

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
