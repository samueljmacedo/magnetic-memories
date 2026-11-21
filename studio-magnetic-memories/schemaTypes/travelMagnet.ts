import {defineField, defineType} from "sanity";

export const travelMagnetType = defineType({
    name: 'travelMagnet',
    type: 'document',
    title: 'Travel Magnet',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {hotspot: true},
        }),
        defineField({
            name: 'journey',
            type: 'reference',
            to:[{ type: 'journey' }]
        }),
    ]
});