export type VisitorCountry = {
    /** ISO 3166-1 alpha-2 code, such as "PT" */
    code: string
    name: string
    /** Roughly the middle of the country */
    lat: number
    lng: number
    visits: number
}

/**
 * Sample numbers, until the visit counter exists.
 * Only a country and a count per entry, nothing about individual visitors.
 */
export const fallbackVisitors: VisitorCountry[] = [
    {code: 'GB', name: 'United Kingdom', lat: 54, lng: -2, visits: 41},
    {code: 'FR', name: 'France', lat: 46.6, lng: 2.3, visits: 23},
    {code: 'PT', name: 'Portugal', lat: 39.5, lng: -8, visits: 19},
    {code: 'ES', name: 'Spain', lat: 40, lng: -3.7, visits: 11},
    {code: 'DE', name: 'Germany', lat: 51, lng: 10, visits: 8},
    {code: 'US', name: 'United States', lat: 39, lng: -98, visits: 7},
    {code: 'BR', name: 'Brazil', lat: -10, lng: -52, visits: 5},
    {code: 'RS', name: 'Serbia', lat: 44, lng: 21, visits: 4},
    {code: 'IN', name: 'India', lat: 21, lng: 78, visits: 3},
    {code: 'JP', name: 'Japan', lat: 36, lng: 138, visits: 2},
    {code: 'AU', name: 'Australia', lat: -25, lng: 134, visits: 2},
    {code: 'CA', name: 'Canada', lat: 56, lng: -106, visits: 2},
]
