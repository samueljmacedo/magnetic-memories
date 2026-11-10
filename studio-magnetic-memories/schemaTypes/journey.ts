import {defineField, defineType} from "sanity";

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
            type: 'array',
            of:[{type: 'string'}],
            options: {
                list: ['Africa', 'Asia','Europe','North America', 'Oceania','South America']
            },
            validation: (Rule) => Rule.unique(),
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
            type: 'array',
            of:[{type: 'block'}]
        }),
        defineField({
            name: 'tag',
            type: 'string'
        }),
        defineField({
            name: 'mainImage',
            type: 'image'
        }),

    ],

})