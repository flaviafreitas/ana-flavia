export interface FaqItem {
  question: string
  answer: string
}

export const defaultFaq: FaqItem[] = [
  {
    question: 'Como funciona o atendimento online?',
    answer:
      'O atendimento online é realizado por chamadas de vídeo seguras e sigilosas (geralmente via Google Meet ou similar). Você só precisa de uma conexão estável e de um espaço privado.',
  },
  {
    question: 'Qual é a frequência recomendada das sessões?',
    answer:
      'Geralmente, as sessões ocorrem uma vez por semana, com duração média de 50 minutos. A regularidade é fundamental para o desenvolvimento e eficácia do processo psicanalítico.',
  },
  {
    question: 'O que é o CRP e por que ele importa?',
    answer:
      'O CRP (Conselho Regional de Psicologia) é o registro profissional que regulamenta e fiscaliza a prática. Ele garante atendimento ético, legal e certificado.',
  },
  {
    question: 'Os atendimentos são totalmente sigilosos?',
    answer:
      'Sim, absolutamente. O sigilo profissional é um dever ético inegociável do psicólogo, garantido pelo Código de Ética Profissional.',
  },
]
