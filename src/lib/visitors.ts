import centroids from "@/data/countryCentroids.json";

export type VisitorCountry = {
    code: string
    lat: number
    lng: number
    visits: number
}

const COUNTED_KEY = 'mm-visit-counted'

const centroidOf = (code: string) => (centroids as Record<string, number[]>)[code] as [number, number] | undefined

const toVisitor = (code: string, visits: number): VisitorCountry | null => {
    const centroid = centroidOf(code)
    return centroid ? {code, lat: centroid[0], lng: centroid[1], visits} : null
}

/** Visits per country from the Worker. Countries without a known position are left out. */
export const fetchVisitors = async (): Promise<VisitorCountry[]> => {
    const response = await fetch('/api/visitors')
    if (!response.ok) throw new Error(`Visitors request failed: ${response.status}`)
    const rows = (await response.json()) as {country: string; visits: number}[]
    return rows.flatMap((row) => toVisitor(row.country, row.visits) ?? [])
}

/**
 * Tells the Worker that someone visited, once per browser.
 * The only thing kept in the browser is a flag saying "already counted". The country itself is worked out
 * by Cloudflare on the server, so nothing about the visitor is sent from here.
 */
export const recordVisit = async () => {
    try {
        if (localStorage.getItem(COUNTED_KEY)) return
        const response = await fetch('/api/visit', {method: 'POST'})
        if (response.ok) localStorage.setItem(COUNTED_KEY, '1')
    } catch {
    }
}

export const sampleVisitors: VisitorCountry[] = [
    ['GB', 41], ['FR', 23], ['PT', 19], ['ES', 11], ['DE', 8], ['US', 7],
    ['BR', 5], ['RS', 4], ['IN', 3], ['JP', 2], ['AU', 2], ['CA', 2],
].flatMap(([code, visits]) => toVisitor(code as string, visits as number) ?? [])
