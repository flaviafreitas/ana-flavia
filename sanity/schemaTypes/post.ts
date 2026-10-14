import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Publicações',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Endereço', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'excerpt', title: 'Resumo', type: 'text', rows: 3}),
    defineField({name: 'publishedAt', title: 'Data de publicação', type: 'datetime'}),
    defineField({name: 'body', title: 'Conteúdo', type: 'array', of: [{type: 'block'}]}),
  ],
})
