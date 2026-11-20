import {defineField, defineType} from "sanity";

/** Languages of the website. Keep in sync with SUPPORTED_LANGUAGES in the website's src/i18n.ts. */
const LANGUAGES = [
    {id: 'en', title: 'English'},
    {id: 'pt', title: 'Português'},
    {id: 'fr', title: 'Français'},
] as const

/**
 * Builds the three language fields of a localized type.
 * English is required, because the website falls back to it. The other languages only get a soft
 * warning when empty, so a missing translation never blocks publishing.
 */
const languageFields = (type: 'string' | 'text') =>
    LANGUAGES.map(({id, title}) =>
        defineField({
            name: id,
            title,
            type,
            ...(type === 'text' ? {rows: 3} : {}),
            validation: (rule) =>
                id === 'en'
                    ? rule.required()
                    : rule.custom((value) =>
                        value ? true : {message: `No ${title} translation yet. The website will show English.`}
                    ).warning(),
        })
    )

export const localizedStringType = defineType({
    name: 'localizedString',
    title: 'Localized text (short)',
    type: 'object',
    fields: languageFields('string'),
    options: {collapsible: true, collapsed: false},
})

export const localizedTextType = defineType({
    name: 'localizedText',
    title: 'Localized text (long)',
    type: 'object',
    fields: languageFields('text'),
    options: {collapsible: true, collapsed: false},
})
