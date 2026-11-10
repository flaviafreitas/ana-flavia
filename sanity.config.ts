import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'

export function createStudioConfig(projectId: string, dataset: string) {
  return defineConfig({
    name: 'default',
    title: 'Ana Flavia',
    projectId,
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
              S.listItem()
                .title('Cabeçalho, rodapé e contato')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.divider(),
              ...S.documentTypeListItems().filter(
                (item) => !['homePage', 'siteSettings'].includes(item.getId() ?? ''),
              ),
            ]),
      }),
    ],
    schema: { types: schemaTypes },
  })
}
