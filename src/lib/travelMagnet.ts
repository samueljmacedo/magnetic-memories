import type {SanityImageSource} from '@sanity/image-url'
import {magnets} from '@/data/data.ts'
import {sanity, urlFor} from '@/lib/sanity.ts'
import {getYear} from "@/utils/format.ts";

export type TravelMagnet = {
    id: string
    title?: string
    image: string
    city: string
    country: string
    year: string
}

type SanityJourney = {
    _id: string
    title: string
    country: string
    city: string
    startDate: string
}

type SanityTravelMagnet = {
    _id: string
    title?: string
    image: SanityImageSource
    journey: SanityJourney
}

const TRAVEL_MAGNET_QUERY = `*[_type == "travelMagnet"
    && defined(image.asset)
] | order(createdAt desc){
    _id,
    journey->{
        _id,
        city,
        country,
        startDate
    },
    title,
    image
}`

const fromSanity = (doc: SanityTravelMagnet): TravelMagnet => ({
    id: doc._id,
    title: doc.title,
    city: doc.journey.city,
    country: doc.journey.country,
    year: getYear(doc.journey.startDate),
    image: urlFor(doc.image).width(1000).fit('max').auto('format').url(),
})

export const fetchTravelMagnets = async (): Promise<TravelMagnet[]> => {
    const docs =
        await sanity.fetch<SanityTravelMagnet[]>(TRAVEL_MAGNET_QUERY);
    return docs.map(fromSanity)
}

const fromLocal = (travelMagnet: TravelMagnet): TravelMagnet => ({
    ...travelMagnet,
})

export const fallbackTravelMagnets: TravelMagnet[] = magnets.map(fromLocal)