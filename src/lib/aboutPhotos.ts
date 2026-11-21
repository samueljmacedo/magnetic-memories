import type {SanityImageSource} from '@sanity/image-url'
import aboutPicture from "@/data/images/about/about-picture.png"
import {sanity, urlFor} from '@/lib/sanity.ts'
import {type Localized, toLocalized} from "@/utils/localized.ts";

export type AboutPhoto = {
    src: string
    /** Undefined when the Studio has no description for it, the component then uses a default one. */
    alt?: Localized
}

type SanityAboutPhoto = {
    asset: SanityImageSource
    crop?: unknown
    hotspot?: unknown
    alt?: unknown
}

/** Only the first 5 pictures are shown, even if more were added before the Studio limit existed. */
const ABOUT_QUERY = `*[_type == "about" && _id == "about"][0].images[defined(asset)][0...5]{
    asset,
    crop,
    hotspot,
    alt
}`

const fromSanity = (photo: SanityAboutPhoto): AboutPhoto => ({
    // The frame on the page is about 300 x 380, so this is sharp up to 2x screens.
    src: urlFor(photo as SanityImageSource).width(720).height(912).fit('crop').auto('format').url(),
    alt: photo.alt ? toLocalized(photo.alt) : undefined,
})

export const fetchAboutPhotos = async (): Promise<AboutPhoto[]> => {
    const photos = await sanity.fetch<SanityAboutPhoto[] | null>(ABOUT_QUERY)
    return (photos ?? []).map(fromSanity)
}

/** Shown until the Studio has pictures, or if it can't be reached. */
export const fallbackAboutPhotos: AboutPhoto[] = [{src: aboutPicture}]
