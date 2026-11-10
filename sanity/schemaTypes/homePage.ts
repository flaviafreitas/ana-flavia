import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'
import { defaultHome } from '../../app/config/home'

const text = (name: string, title: string, multiline = false) =>
  defineField({
    name,
    title,
    type: multiline ? 'text' : 'string',
  })
const heading = (description = true) => [
  text('eyebrow', 'Chamada curta'),
  text('title', 'Título'),
  ...(description ? [text('description', 'Descrição', true)] : []),
]
const stringList = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  })
const sections = [
  ['hero', 'Apresentação'],
  ['about', 'Sobre'],
  ['services', 'Serviços'],
  ['howWorks', 'Como funciona'],
  ['testimonials', 'Depoimentos'],
  ['blog', 'Blog'],
  ['faq', 'Perguntas frequentes'],
  ['cta', 'Chamada final'],
] as const
const section = (name: keyof typeof defaultHome, fields: ReturnType<typeof defineField>[]) =>
  defineField({
    name,
    title: sections.find(([key]) => key === name)![1],
    type: 'object',
    group: name,
    options: { collapsible: false },
    initialValue: defaultHome[name],
    fields,
  })

export const homePageType = defineType({
  name: 'homePage',
  title: 'Página inicial',
  type: 'document',
  icon: DocumentIcon,
  groups: sections.map(([name, title], index) => ({ name, title, default: index === 0 })),
  preview: { prepare: () => ({ title: 'Página inicial' }) },
  initialValue: {
    ...defaultHome,
    eyebrow: 'Abordagem Psicanalítica',
    title: 'Um espaço seguro para desatar os nós da sua mente.',
    introduction:
      'Através de uma escuta sensível e sem julgamentos, convido você a explorar sua singularidade, compreender seus sintomas e construir novos caminhos.',
    tagline: 'O que não é dito o corpo expressa, dê voz a palavra',
    body: [
      'Como psicóloga de orientação psicanalítica, meu compromisso é criar um espaço acessível, acolhedor e genuíno. Acredito que olhar para dentro e desatar as amarras do nosso sofrimento exige coragem, mas também leveza.',
      'Tenho uma atuação clínica voltada para o acolhimento de questões contemporâneas, com ênfase em autoconhecimento profundo, regulação em transtornos de personalidade e acolhimento das vivências da sexualidade.',
    ].map((value, index) => ({
      _type: 'block',
      _key: `about-${index}`,
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: `span-${index}`, marks: [], text: value }],
    })),
  },
  fields: [
    defineField({ name: 'eyebrow', title: 'Chamada curta', type: 'string', group: 'hero' }),
    defineField({
      name: 'title',
      title: 'Título principal',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introdução',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    section('hero', [
      text('primaryButton', 'Texto do botão de agendamento'),
      text('secondaryButton', 'Texto do botão sobre o trabalho'),
      text('availability', 'Modalidades de atendimento'),
      stringList('credentials', 'Credenciais'),
    ]),
    defineField({
      name: 'tagline',
      title: 'Frase entre a apresentação e a seção Sobre',
      type: 'string',
      group: 'about',
    }),
    section('about', [
      ...heading(false),
      defineField({
        name: 'stats',
        title: 'Números da experiência profissional',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'object',
            name: 'stat',
            title: 'Indicador',
            fields: [
              text('label', 'Descrição'),
              defineField({
                name: 'value',
                title: 'Quantidade',
                type: 'number',
                validation: (rule) => rule.required().integer().min(0),
              }),
            ],
            preview: { select: { title: 'label', subtitle: 'value' } },
          }),
        ],
      }),
    ]),
    defineField({
      name: 'body',
      title: 'Texto de apresentação — Sobre',
      type: 'array',
      group: 'about',
      of: [defineArrayMember({ type: 'block' })],
    }),
    section('services', [
      ...heading(),
      defineField({
        name: 'items',
        title: 'Serviços e especialidades',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'service',
            title: 'Serviço',
            type: 'object',
            fields: [
              text('title', 'Título'),
              text('description', 'Descrição', true),
              defineField({
                name: 'icon',
                title: 'Ícone',
                type: 'string',
                options: {
                  list: [
                    { title: 'Crianças', value: '/images/services/children.svg' },
                    { title: 'Adolescentes', value: '/images/services/adolescents.svg' },
                    { title: 'Adultos', value: '/images/services/adults.svg' },
                  ],
                },
                initialValue: '/images/services/adults.svg',
              }),
              defineField({
                name: 'featured',
                title: 'Destacar este serviço',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          }),
        ],
      }),
    ]),
    section('howWorks', [
      ...heading(),
      text('button', 'Texto do botão'),
      defineField({
        name: 'steps',
        title: 'Etapas do atendimento',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'step',
            title: 'Etapa',
            type: 'object',
            fields: [
              text('title', 'Título'),
              text('description', 'Descrição', true),
              text('detail', 'Informação complementar'),
              defineField({ name: 'accent', title: 'Destacar esta etapa', type: 'boolean' }),
            ],
          }),
        ],
      }),
    ]),
    section('testimonials', [
      ...heading(false),
      defineField({
        name: 'items',
        title: 'Depoimentos',
        description: 'Os textos iniciais são fictícios e servem para demonstração.',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'testimonial',
            title: 'Depoimento',
            type: 'object',
            fields: [
              text('name', 'Nome exibido'),
              text('quote', 'Depoimento', true),
              text('detail', 'Informação complementar'),
            ],
            preview: { select: { title: 'name', subtitle: 'quote' } },
          }),
        ],
      }),
    ]),
    section('blog', [
      ...heading(false),
      text('button', 'Texto do botão para todos os artigos'),
      text('articleButton', 'Texto do link de cada artigo'),
      text('emptyMessage', 'Mensagem quando não há artigos'),
    ]),
    section('faq', [
      ...heading(),
      text('button', 'Texto do botão de contato'),
      text('availabilityTitle', 'Título das modalidades de atendimento'),
      text('availability', 'Modalidades de atendimento'),
      defineField({
        name: 'items',
        title: 'Perguntas e respostas',
        type: 'array',
        of: [
          defineArrayMember({
            name: 'question',
            title: 'Pergunta',
            type: 'object',
            fields: [text('question', 'Pergunta'), text('answer', 'Resposta', true)],
            preview: { select: { title: 'question' } },
          }),
        ],
      }),
    ]),
    section('cta', [
      ...heading(),
      text('primaryButton', 'Texto do botão de agendamento'),
      text('secondaryButton', 'Texto do botão do Instagram'),
      stringList('reassurance', 'Informações abaixo dos botões'),
    ]),
  ],
})
