import {defineArrayMember, defineField, defineType} from "sanity";
import {imageOptions} from "./imageOptions";

/** The About section's pictures. There is only one of these, see the structure in sanity.config.ts. */
export const aboutType = defineType({
    name: 'about',
    title: 'About',
    type: 'document',
    fields: [
        defineField({
            name: 'images',
            title: 'Pictures',
            description: 'Up to 5 pictures. The website changes between them automatically, in this order.',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: imageOptions,
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Description',
                            description: 'What the picture shows, for screen readers.',
                            type: 'localizedString',
                        }),
                    ],
                    preview: {
                        select: {media: 'asset', title: 'alt.en'},
                        prepare: ({media, title}) => ({media, title: title ?? 'Picture'}),
                    },
                }),
            ],
            validation: (rule) => rule.max(5),
        }),
    ],
    preview: {
        prepare: () => ({title: 'About'}),
    },
});
