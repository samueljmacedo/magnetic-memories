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

export type GalleryPhoto = {
    id: string
    src: string
    full: string
    width: number
    height: number
    caption: Localized
}

export type LocalJourney = Omit<Journey, 'description' | 'tag' | 'gallery'> & {
    description: string
    tag: string
}

type SanityJourney = {
    id: string
    city: string
    country: string
    continent: string | null
    startDate: string
    endDate: string | null
    lat: number
    lng: number
    description: unknown
    tag: unknown
    mainImage: SanityImageSource
    gallery: SanityGalleryPhoto[] | null
}

type SanityGalleryPhoto = {
    _key: string
    asset?: {_ref?: string}
    crop?: unknown
    hotspot?: unknown
    caption?: unknown
    dimensions?: {width: number, height: number} | null
}

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
