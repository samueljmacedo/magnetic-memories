import type {TFunction} from "i18next";

export type Localized = {
    en: string
    pt?: string
    fr?: string
}

const asText = (value: unknown) => (typeof value === 'string' && value.trim() ? value : undefined)

/**
 * Turns whatever Sanity returns for a localized field into a Localized.
 * Journeys saved before translations hold a plain string, which becomes the English text,
 * so the site keeps working until the migration has run.
 */
export const toLocalized = (value: unknown): Localized => {
    if (typeof value === 'string') return {en: value}
    if (value && typeof value === 'object') {
        const {en, pt, fr} = value as Record<string, unknown>
        return {en: asText(en) ?? '', pt: asText(pt), fr: asText(fr)}
    }
    return {en: ''}
}

/**
 * The text in the given language, or the English text when that translation is empty.
 * @param language the site language code, such as "pt"
 */
export const pickLanguage = (text: Localized, language?: string) =>
    (language ? text[language as keyof Localized] : undefined) || text.en

/**
 * A country name in the current language. The names come from the "countries" keys in the
 * translation files (for example "countries.Scotland"), and the Sanity value is shown as it is when there is no key.
 */
export const countryName = (t: TFunction, country: string) =>
    t(`countries.${country}`, {defaultValue: country})
