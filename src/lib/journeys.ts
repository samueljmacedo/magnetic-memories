import type {SanityImageSource} from '@sanity/image-url'
import {journeys as localJourneys} from '@/data/data.ts'
import {sanity, urlFor} from '@/lib/sanity.ts'
import {toIsoDate} from "@/utils/format.ts";
import {type Localized, toLocalized} from "@/utils/localized.ts";

export type Journey = {
    id: string
    city: string
    country: string
    continent: string
    startDate: string
    endDate: string
    lat: number
    lng: number
    description: Localized
    tag: Localized
    image: string
    gallery: GalleryPhoto[]
}

/** One extra picture of a journey, shown in the gallery. */
export type GalleryPhoto = {
    id: string
    /** Smaller version for the grid */
    src: string
    /** Larger version for the viewer */
    full: string
    width: number
    height: number
    caption: Localized
}

/** A journey as written in data.ts, with plain English texts. */
export type LocalJourney = Omit<Journey, 'description' | 'tag' | 'gallery'> & {
    description: string
    tag: string
}

/** One document of type "journey", as returned by the query below. */
type SanityJourney = {
    id: string
    city: string
    country: string
    continent: string | null
    startDate: string
    endDate: string | null
    lat: number
    lng: number
    /** Plain strings on journeys saved before translations, {en, pt, fr} objects afterwards */
    description: unknown
    tag: unknown
    mainImage: SanityImageSource
    gallery: SanityGalleryPhoto[] | null
}

/** One entry of a journey's gallery. Entries without a picture (an empty slot in the Studio) are skipped. */
type SanityGalleryPhoto = {
    _key: string
    asset?: {_ref?: string}
    crop?: unknown
    hotspot?: unknown
    caption?: unknown
    dimensions?: {width: number, height: number} | null
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
    mainImage,
    "gallery": gallery[defined(asset)]{
        _key, asset, crop, hotspot, caption,
        "dimensions": asset->metadata.dimensions
    }
}`

/**
 * Maps a journey document from Sanity to the app's Journey.
 * Journeys saved before `continent` and `description` became plain strings still hold arrays,
 * so any value that isn't a string is treated as empty until the journey is saved again in the Studio.
 */
const fromSanityPhoto = (photo: SanityGalleryPhoto): GalleryPhoto => {
    const source = photo as unknown as SanityImageSource
    return {
        id: photo._key,
        src: urlFor(source).width(900).fit('max').auto('format').url(),
        full: urlFor(source).width(2000).fit('max').auto('format').url(),
        // Used to reserve the right amount of space before the picture arrives. 4:3 if Sanity didn't say.
        width: photo.dimensions?.width ?? 4,
        height: photo.dimensions?.height ?? 3,
        caption: toLocalized(photo.caption),
    }
}

const fromSanity = (doc: SanityJourney): Journey => ({
    id: doc.id,
    city: doc.city,
    country: doc.country,
    continent: typeof doc.continent === 'string' ? doc.continent : '',
    startDate: doc.startDate,
    endDate: doc.endDate ?? doc.startDate,
    lat: doc.lat,
    lng: doc.lng,
    description: toLocalized(doc.description),
    tag: toLocalized(doc.tag),
    image: urlFor(doc.mainImage).width(1000).fit('max').auto('format').url(),
    gallery: (doc.gallery ?? []).map(fromSanityPhoto),
})

export const fetchJourneys = async (): Promise<Journey[]> => {
    const docs = await sanity.fetch<SanityJourney[]>(JOURNEYS_QUERY)
    return docs.map(fromSanity)
}

const fromLocal = (journey: LocalJourney): Journey => ({
    ...journey,
    gallery: [],
    description: toLocalized(journey.description),
    tag: toLocalized(journey.tag),
    startDate: toIsoDate(journey.startDate),
    endDate: toIsoDate(journey.endDate),
})

export const fallbackJourneys: Journey[] = localJourneys.map(fromLocal)
