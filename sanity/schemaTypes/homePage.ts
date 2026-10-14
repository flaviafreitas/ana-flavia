import {defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Página inicial',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Chamada curta', type: 'string'}),
    defineField({name: 'title', title: 'Título principal', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'introduction', title: 'Introdução', type: 'text', rows: 3}),
    defineField({name: 'body', title: 'Conteúdo', type: 'array', of: [{type: 'block'}]}),
  ],
})
