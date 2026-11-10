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

## Notes

- This is a visual first iteration with sample content; navigation links are section anchors.
- The language selector is a visual placeholder for now. Real EN/PT/FR routing and translations come in a later phase.
- The travel map is an interactive Leaflet map (react-leaflet). Pins, popups and the stats come from each journey's `lat`/`lng` in `src/data/data.ts`. Basemap tiles are © OpenStreetMap contributors © CARTO.
- No backend, CMS, guestbook or database is included yet.
- The sample image URLs require an internet connection. Download and optimize your own images before publishing.
