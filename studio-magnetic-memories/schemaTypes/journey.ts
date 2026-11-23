import {defineArrayMember, defineField, defineType} from "sanity";
import {imageOptions} from "./imageOptions";

export const journeyType = defineType({
    name: 'journey',
    type: 'document',
    title: 'Journey',
    fields: [
        defineField({
            name: 'city',
            type: 'string'
        }),
        defineField({
            name: 'country',
            type: 'string'
        }),
        defineField({
            name: 'continent',
            type: 'string',
            options: {
                list: ['Africa', 'Asia','Europe','North America', 'Oceania','South America'],
                layout: 'radio'
            },
        }),
        defineField({
            name: 'startDate',
            type: 'date'
        }),
        defineField({
            name: 'endDate',
            type: 'date'
        }),
        defineField({
            name: 'location',
            type: 'geopoint'
        }),
        defineField({
            name: 'description',
            type: 'localizedText',
        }),
        defineField({
            name: 'tag',
            type: 'localizedString'
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            options: imageOptions,
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            description: 'Extra pictures of this trip, shown when someone taps "See more pictures". Optional.',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: imageOptions,
                    fields: [
                        defineField({
                            name: 'caption',
                            title: 'Caption',
                            description: 'Optional. A few words shown under the picture.',
                            type: 'localizedString',
                        }),
                    ],
                }),
            ],
        }),

    ],

})