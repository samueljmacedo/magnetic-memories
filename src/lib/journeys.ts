import type {PortableTextProps} from '@portabletext/react'
import type {SanityImageSource} from '@sanity/image-url'
import {journeys as localJourneys} from '@/data/data.ts'
import type {Continent, Journey as LocalJourney} from '@/data/data.ts'
import {sanity, urlFor} from '@/lib/sanity.ts'

export type RichText = PortableTextProps['value']

/** What the components use, whether the data comes from Sanity or from data.ts. */
export type Journey = {
    id: string
    city: string
    country: string
    continents: Continent[]
    /** ISO date (yyyy-mm-dd), formatted for display with formatDate() */
    startDate: string
    endDate: string
    lat: number
    lng: number
    /** Rich text from Sanity, or a plain string from the data.ts fallback */
    description: string | RichText
    tag: string
    /** Ready-to-use image URL */
    image: string
}

/** One document of type "journey", as returned by the query below. */
type SanityJourney = {
    id: string
    city: string
    country: string
    continent: string[] | null
    startDate: string
    endDate: string | null
    lat: number
    lng: number
    description: RichText | null
    tag: string | null
    mainImage: SanityImageSource
}

// Only complete journeys are returned, so a half-filled document can't break the page.
// Newest trip first.
const JOURNEYS_QUERY = `*[_type == "journey"
    && defined(city) && defined(country) && defined(startDate)
    && defined(location.lat) && defined(location.lng)
    && defined(mainImage.asset)
] | order(startDate desc) {
    "id": _id,
    city,
    country,
    continent,
    startDate,
    endDate,
    "lat": location.lat,
    "lng": location.lng,
    description,
    tag,
    mainImage
}`

const fromSanity = (doc: SanityJourney): Journey => ({
    id: doc.id,
    city: doc.city,
    country: doc.country,
    continents: (doc.continent ?? []) as Continent[],
    startDate: doc.startDate,
    endDate: doc.endDate ?? doc.startDate,
    lat: doc.lat,
    lng: doc.lng,
    description: doc.description ?? '',
    tag: doc.tag ?? '',
    image: urlFor(doc.mainImage).width(1000).fit('max').auto('format').url(),
})

export const fetchJourneys = async (): Promise<Journey[]> => {
    const docs = await sanity.fetch<SanityJourney[]>(JOURNEYS_QUERY)
    return docs.map(fromSanity)
}

// --- Fallback: the placeholder trips in data.ts ---------------------------------

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

/** '10 Aug 2026' -> '2026-08-10'. Anything it can't read is returned unchanged. */
const toIsoDate = (value: string) => {
    const match = /^(\d{1,2}) ([A-Za-z]{3}) (\d{4})$/.exec(value.trim())
    const month = match ? MONTHS.indexOf(match[2].toLowerCase()) : -1
    if (!match || month === -1) return value
    return `${match[3]}-${String(month + 1).padStart(2, '0')}-${match[1].padStart(2, '0')}`
}

const fromLocal = (journey: LocalJourney): Journey => ({
    ...journey,
    continents: [journey.continent],
    startDate: toIsoDate(journey.startDate),
    endDate: toIsoDate(journey.endDate),
})

export const fallbackJourneys: Journey[] = localJourneys.map(fromLocal)
