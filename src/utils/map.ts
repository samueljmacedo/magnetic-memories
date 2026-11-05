// Latitude band shown on the illustrated map (crops the poles).
const LAT_TOP = 80
const LAT_BOTTOM = -60

/** Equirectangular projection: lat/lng -> x/y as a percentage of the map paper. */
export const projectToMap = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 100,
  y: ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * 100,
})

const toDegreesMinutes = (value: number) => {
  const abs = Math.abs(value)
  let degrees = Math.floor(abs)
  let minutes = Math.round((abs - degrees) * 60)
  if (minutes === 60) {
    degrees += 1
    minutes = 0
  }
  return `${degrees}°${String(minutes).padStart(2, '0')}'`
}

/** 55.9533, -3.1883 -> "55°57' N · 3°11' W" */
export const formatCoordinates = (lat: number, lng: number) =>
  `${toDegreesMinutes(lat)} ${lat >= 0 ? 'N' : 'S'} · ${toDegreesMinutes(lng)} ${lng >= 0 ? 'E' : 'W'}`
