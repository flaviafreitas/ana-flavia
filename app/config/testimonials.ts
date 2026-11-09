export interface Testimonial {
  id: string
  quote: string
  name: string
  detail: string
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: 'maria-s',
    quote:
      'A terapia com Ana foi o primeiro espaço onde eu consegui falar sobre minha ansiedade sem me sentir julgado. Hoje vejo meus pensamentos com mais clareza e consigo lidar melhor com o estresse do dia a dia.',
    name: 'Maria S. (fictício)',
    detail: 'Depoimento de teste para o carrossel',
  },
  {
    id: 'depoimento-teste',
    quote:
      'Encontrei na terapia um espaço de escuta e acolhimento para entender melhor o que sinto. Aos poucos, aprendi a respeitar meu tempo e a olhar para os desafios do cotidiano com mais tranquilidade.',
    name: 'Lucas R. (fictício)',
    detail: 'Depoimento de teste para o carrossel',
  },
]
