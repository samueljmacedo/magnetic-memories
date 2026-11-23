import {defineField, defineType} from "sanity";
import {imageOptions} from "./imageOptions";

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
            options: imageOptions,
        }),
        defineField({
            name: 'journey',
            type: 'reference',
            to:[{ type: 'journey' }]
        }),
    ]
});