/**
 * Options shared by every image field.
 * - Only the small blurred preview (lqip) is read from each upload. Sanity's default also saves the photo's EXIF data
 *   and GPS location on the image asset, and this dataset is public, so anyone could query them.
 * - The original file name is not stored either (names like "home-balcony.jpg" can say more than you meant to).
 * These options apply to new uploads. Pictures uploaded before this change keep what they already stored.
 */
export const imageOptions = {
    hotspot: true,
    metadata: ['lqip'] as 'lqip'[],
    storeOriginalFilename: false,
}
