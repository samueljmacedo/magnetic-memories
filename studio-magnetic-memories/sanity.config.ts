import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

/** Document types that exist only once, so they open directly instead of showing a list. */
const SINGLETONS = ['about']

export default defineConfig({
  name: 'default',
  title: 'Magnetic Memories',

  projectId: 'roou5dul',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('About')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Stops the "create new" menu from offering a second About document.
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
  },
})
