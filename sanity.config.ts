import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Ana Flavia',
  projectId: projectId || 'placeholder',
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Página inicial')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'homePage'),
          ]),
    }),
  ],
  schema: {types: schemaTypes},
})
