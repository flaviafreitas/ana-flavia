import { defaultServices } from './services'
import { defaultFaq } from './faq'
import { defaultTestimonials } from './testimonials'

export const defaultHome = {
  hero: {
    primaryButton: 'Agendar pelo WhatsApp',
    secondaryButton: 'Conheça meu trabalho',
    availability: 'Atendimento online (todo o Brasil) e presencial',
    credentials: ['Psicanálise Clínica', '+5 anos de experiência'],
  },
  about: {
    eyebrow: 'Olá, eu sou a Ana',
    title: 'A terapia não precisa ser fria, formal ou distante.',
    stats: [
      {
        _key: 'years',
        _type: 'stat',
        label: 'Anos de Atuação',
        value: 5,
      },
      {
        _key: 'patients',
        _type: 'stat',
        label: 'Pacientes Atendidos',
        value: 200,
      },
    ],
  },
  services: {
    items: defaultServices.map(({ id, ...item }) => ({ ...item, _key: id, _type: 'service' })),
    eyebrow: 'Frentes de Cuidado',
    title: 'Serviços e Especialidades',
    description:
      'Escuta e acolhimento em diferentes fases da vida, respeitando a singularidade, a história e o tempo de cada pessoa.',
  },
  howWorks: {
    button: 'Quero começar agora',
    steps: [
      {
        _key: 'step-0',
        _type: 'step',
        title: 'Primeiro Contato',
        description:
          'Você entra em contato pelo WhatsApp, tiramos dúvidas sobre horários e valores, e agendamos um horário inicial.',
        detail: 'WhatsApp',
      },
      {
        _key: 'step-1',
        _type: 'step',
        title: 'Entrevista Inicial',
        description:
          'Uma primeira conversa livre para você compartilhar o que te traz aqui, entender suas expectativas e alinhar o método.',
        detail: 'Sessão de 50min',
        accent: true,
      },
      {
        _key: 'step-2',
        _type: 'step',
        title: 'Sessões Regulares',
        description:
          'Sessões semanais focadas na fala livre. Sem roteiro fixo: você traz o que vier à mente, e trabalhamos juntos na escuta de si.',
        detail: 'Semanalmente',
      },
    ],
    eyebrow: 'O Caminho',
    title: 'Como funciona a psicoterapia?',
    description:
      'Um processo simples e acolhedor para dar o primeiro passo em direção ao seu bem-estar.',
  },
  testimonials: {
    items: defaultTestimonials.map(({ id, ...item }) => ({
      ...item,
      _key: id,
      _type: 'testimonial',
    })),
    eyebrow: 'Relatos de Quem Já Foi',
    title: 'O que dizem sobre a terapia',
  },
  blog: {
    button: 'Ver todos os artigos',
    articleButton: 'Ler artigo',
    emptyMessage: 'Novas reflexões em breve.',
    eyebrow: 'Conteúdo & Artigos',
    title: 'Reflexões sobre a mente e o comportamento',
  },
  faq: {
    items: defaultFaq.map((item, index) => ({ ...item, _key: `faq-${index}`, _type: 'question' })),
    button: 'Falar no WhatsApp',
    availabilityTitle: 'Atendimentos',
    availability: 'Online (Brasil todo) + Presencial',
    eyebrow: 'Dúvidas Comuns',
    title: 'Ficou com alguma dúvida sobre o atendimento?',
    description:
      'Se a sua dúvida não estiver respondida aqui, sinta-se à vontade para me mandar uma mensagem direta no WhatsApp ou Instagram!',
  },
  cta: {
    primaryButton: 'Agendar pelo WhatsApp',
    secondaryButton: 'Ver meu Instagram',
    reassurance: ['Sigilo garantido', 'Atendimento online e presencial'],
    eyebrow: 'Próximo Passo',
    title: 'Vamos iniciar esse percurso juntos?',
    description:
      'Dê o primeiro passo em direção ao seu próprio bem-estar emocional e compreensão dos seus sintomas. Entre em contato para alinhar seu primeiro horário.',
  },
}

export type HomeSections = typeof defaultHome

// Missing fields retain the original copy; empty strings and arrays are intentional edits.
export function resolveHomeSections(
  value?: { [K in keyof HomeSections]?: Partial<HomeSections[K]> } | null,
): HomeSections {
  return Object.fromEntries(
    Object.entries(defaultHome).map(([key, defaults]) => [
      key,
      {
        ...defaults,
        ...Object.fromEntries(
          Object.entries(value?.[key as keyof HomeSections] ?? {}).filter(
            ([, field]) => field != null,
          ),
        ),
      },
    ]),
  ) as HomeSections
}
