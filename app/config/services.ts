export interface Service {
  id: string
  title: string
  description: string
  icon: string
  featured?: boolean
}

export const defaultServices: Service[] = [
  {
    id: 'criancas',
    title: 'Crianças',
    description:
      'Um espaço de escuta e cuidado em que a criança pode expressar sentimentos e vivências por meio da fala, do brincar e de outras formas de expressão. O acompanhamento acolhe questões emocionais e relacionais, com diálogo com os responsáveis ao longo do processo.',
    icon: '/images/services/children.svg',
  },
  {
    id: 'adolescentes',
    title: 'Adolescentes',
    description:
      'Acolhimento para as descobertas, mudanças e desafios da adolescência. Um espaço seguro e sem julgamentos para falar sobre emoções, identidade, relações e conflitos, respeitando a singularidade e o tempo de cada adolescente.',
    icon: '/images/services/adolescents.svg',
    featured: true,
  },
  {
    id: 'adultos',
    title: 'Adultos',
    description:
      'Um espaço para compreender sentimentos, relações e experiências que atravessam a vida adulta. A escuta psicanalítica convida a olhar para a própria história, elaborar sofrimentos e construir novas formas de se relacionar consigo e com o mundo.',
    icon: '/images/services/adults.svg',
  },
]
