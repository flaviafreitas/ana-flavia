import { defineArrayMember, defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'
import { defaultSiteSettings } from '../../app/config/site'

const text = (name: string, title: string) => defineField({ name, title, type: 'string' })
const url = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'url',
    validation: (rule) => rule.uri({ scheme: ['https', 'http'] }),
  })

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Cabeçalho, rodapé e contato',
  type: 'document',
  icon: CogIcon,
  preview: { prepare: () => ({ title: 'Cabeçalho, rodapé e contato' }) },
  initialValue: defaultSiteSettings,
  groups: [
    { name: 'contact', title: 'Identidade e contato', default: true },
    { name: 'header', title: 'Cabeçalho' },
    { name: 'footer', title: 'Rodapé' },
  ],
  fields: [
    defineField({
      name: 'contact',
      title: 'Identidade e contato',
      type: 'object',
      group: 'contact',
      description: 'Dados compartilhados pelo cabeçalho, rodapé e botões de contato das páginas.',
      options: { collapsible: false },
      initialValue: defaultSiteSettings.contact,
      fields: [
        text('name', 'Nome'),
        text('profession', 'Título profissional'),
        text('registration', 'Registro profissional (CRP)'),
        text('location', 'Localização'),
        text('phone', 'Telefone exibido'),
        defineField({
          name: 'phoneUrl',
          title: 'Link de ligação',
          description: 'Exemplo: tel:+5512996769665',
          type: 'url',
          validation: (rule) => rule.uri({ scheme: ['tel'] }),
        }),
        defineField({
          name: 'email',
          title: 'E-mail',
          type: 'string',
          validation: (rule) => rule.email(),
        }),
        text('instagram', 'Usuário do Instagram (sem @)'),
        url('instagramUrl', 'Link do Instagram'),
        url('whatsappUrl', 'Link do WhatsApp'),
      ],
    }),
    defineField({
      name: 'header',
      title: 'Cabeçalho',
      type: 'object',
      group: 'header',
      options: { collapsible: false },
      initialValue: defaultSiteSettings.header,
      fields: [
        defineField({
          name: 'navigation',
          title: 'Links de navegação',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'navigationLink',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Texto do link',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'to',
                  title: 'Destino',
                  type: 'string',
                  description: 'Exemplos: /blog, /#sobre ou https://exemplo.com',
                  validation: (rule) =>
                    rule
                      .required()
                      .custom(
                        (value) =>
                          !value ||
                          /^(\/(?!\/)|#|https?:\/\/)/i.test(value) ||
                          'Use um caminho iniciado por /, uma âncora # ou uma URL http(s).',
                      ),
                }),
              ],
              preview: { select: { title: 'label', subtitle: 'to' } },
            }),
          ],
        }),
        text('appointmentLabel', 'Texto do botão de agendamento'),
        text('mobileAppointmentLabel', 'Texto do botão no celular'),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Rodapé',
      type: 'object',
      group: 'footer',
      options: { collapsible: false },
      initialValue: defaultSiteSettings.footer,
      fields: [
        defineField({ name: 'description', title: 'Texto de apresentação', type: 'text', rows: 3 }),
        text('contactTitle', 'Título da coluna de contato'),
        text('socialTitle', 'Título da coluna de redes sociais'),
        text('servicesTitle', 'Título da coluna de atendimento'),
        text('availability', 'Modalidades de atendimento'),
        defineField({
          name: 'services',
          title: 'Públicos atendidos',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        text('copyright', 'Texto de direitos autorais'),
      ],
    }),
  ],
})
