import {useEffect, useState} from "react";
import {type AboutPhoto, fallbackAboutPhotos, fetchAboutPhotos} from "@/lib/aboutPhotos.ts";

/** The About pictures from Sanity, starting with the local picture so the section is never empty. */
export const useAboutPhotos = () => {
    const [photos, setPhotos] = useState<AboutPhoto[]>(fallbackAboutPhotos)

    useEffect(() => {
        let cancelled = false

        fetchAboutPhotos()
            .then((fetched) => {
                if (!cancelled && fetched.length > 0) setPhotos(fetched)
            })
            .catch((error: unknown) => {
                console.error('[sanity] Could not load the About pictures. Showing the local picture instead.', error)
            })

        return () => {
            cancelled = true
        }
    }, [])

    return photos
}
