import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url'

export const sanity = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'roou5dul',
    dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
    apiVersion: '2025-02-19',
    useCdn: true,
})

const builder = createImageUrlBuilder(sanity)

/** urlFor(journey.mainImage).width(800).url() */
export const urlFor = (source: SanityImageSource) => builder.image(source)
