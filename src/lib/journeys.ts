import type {SanityImageSource} from '@sanity/image-url'
import {journeys as localJourneys} from '@/data/data.ts'
import {sanity, urlFor} from '@/lib/sanity.ts'
import {toIsoDate} from "@/utils/format.ts";

export type Journey = {
    id: string
    city: string
    country: string
    continent: string
    startDate: string
    endDate: string
    lat: number
    lng: number
    description: string
    tag: string
    image: string
}

/** One document of type "journey", as returned by the query below. */
type SanityJourney = {
    id: string
    city: string
    country: string
    continent: string
    startDate: string
    endDate: string | null
    lat: number
    lng: number
    description: string
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
    continent: doc.continent,
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


const fromLocal = (journey: Journey): Journey => ({
    ...journey,
    continent: journey.continent,
    startDate: toIsoDate(journey.startDate),
    endDate: toIsoDate(journey.endDate),
})

export const fallbackJourneys: Journey[] = localJourneys.map(fromLocal)
