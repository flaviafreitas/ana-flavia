// Contact details from the Figma reference, kept together for future updates.
export const site = {
  name: 'Ana Flávia',
  registration: 'CRP 06/171677',
  location: 'São Paulo, Brasil',
  phone: '(12) 99676-9665',
  email: 'psicoanamaga@gmail.com',
  instagram: 'psicoanamaga_',
  instagramUrl: 'https://www.instagram.com/psicoanamaga_/',
  whatsappUrl: 'https://wa.me/5512996769665',
}

export const siteNavigation = [
  { label: 'Sobre', to: '/#sobre' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contato', to: '/#contato' },
]

export const defaultSiteSettings = {
  contact: {
    ...site,
    profession: 'Psicóloga Clínica',
    phoneUrl: 'tel:+5512996769665',
  },
  header: {
    navigation: siteNavigation.map((link, index) => ({
      ...link,
      _key: `nav-${index}`,
      _type: 'navigationLink',
    })),
    appointmentLabel: 'Agendar consulta',
    mobileAppointmentLabel: 'Agendar',
  },
  footer: {
    description:
      'Psicóloga clínica sob abordagem psicanalítica. Acolhimento, respeito e sigilo absoluto.',
    contactTitle: 'Contato',
    socialTitle: 'Social',
    servicesTitle: 'Atendimento',
    availability: 'Online e presencial',
    services: ['Crianças', 'Adolescentes', 'Adultos'],
    copyright: 'Todos os direitos reservados.',
  },
}

export type SiteSettings = typeof defaultSiteSettings
export type SiteSettingsData = { [K in keyof SiteSettings]?: Partial<SiteSettings[K]> }

export function resolveSiteSettings(value?: SiteSettingsData | null): SiteSettings {
  return Object.fromEntries(
    Object.entries(defaultSiteSettings).map(([key, defaults]) => [
      key,
      {
        ...defaults,
        ...Object.fromEntries(
          Object.entries(value?.[key as keyof SiteSettings] ?? {}).filter(
            ([, field]) => field != null,
          ),
        ),
      },
    ]),
  ) as SiteSettings
}
