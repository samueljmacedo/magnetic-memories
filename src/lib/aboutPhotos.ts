import type {SanityImageSource} from '@sanity/image-url'
import aboutPicture from "@/data/images/about/about-picture.png"
import {sanity, urlFor} from '@/lib/sanity.ts'
import {type Localized, toLocalized} from "@/utils/localized.ts";

export type AboutPhoto = {
    src: string
    alt?: Localized
}

type SanityAboutPhoto = {
    asset: SanityImageSource
    crop?: unknown
    hotspot?: unknown
    alt?: unknown
}

const ABOUT_QUERY = `*[_type == "about" && _id == "about"][0].images[defined(asset)][0...5]{
    asset,
    crop,
    hotspot,
    alt
}`

const fromSanity = (photo: SanityAboutPhoto): AboutPhoto => ({
    src: urlFor(photo as SanityImageSource).width(720).height(912).fit('crop').auto('format').url(),
    alt: photo.alt ? toLocalized(photo.alt) : undefined,
})

export const fetchAboutPhotos = async (): Promise<AboutPhoto[]> => {
    const photos = await sanity.fetch<SanityAboutPhoto[] | null>(ABOUT_QUERY)
    return (photos ?? []).map(fromSanity)
}

export const fallbackAboutPhotos: AboutPhoto[] = [{src: aboutPicture}]
