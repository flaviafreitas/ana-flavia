import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '#imports'
import UiButton from '~/components/ui/UiButton.vue'
import UiBadge from '~/components/ui/UiBadge.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiAccordion from '~/components/ui/UiAccordion.vue'
import UiSectionHeading from '~/components/ui/UiSectionHeading.vue'

export default defineComponent({
  name: 'StyleGuidePage',
  components: { UiButton, UiBadge, UiCard, UiAccordion, UiSectionHeading },
  setup() {
    function guideClass(name: string) {
      return `style-guide-${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`
    }

    useHead({
      title: 'Style guide · Ana Flávia',
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    })

    const sections = [
      { id: 'cores', label: 'Cores' },
      { id: 'tipografia', label: 'Tipografia' },
      { id: 'botoes', label: 'Botões' },
      { id: 'componentes', label: 'Componentes' },
      { id: 'espacamento', label: 'Espaçamento' },
      { id: 'uso', label: 'Como usar' },
    ]
    const colors = [
      {
        name: 'Azul principal',
        token: '--color-primary-500',

        role: 'Identidade e destaques',
        dark: true,
      },
      {
        name: 'Azul-marinho',
        token: '--color-navy-900',

        role: 'Títulos e texto principal',
        dark: false,
      },
      {
        name: 'Azul de leitura',
        token: '--color-blue-700',

        role: 'Texto secundário',
        dark: false,
      },
      {
        name: 'Azul suave',
        token: '--color-blue-50',

        role: 'Fundos e áreas de apoio',
        dark: true,
      },
      {
        name: 'Creme',
        token: '--color-cream-50',

        role: 'Fundo principal',
        dark: true,
      },
      {
        name: 'Areia',
        token: '--color-cream-100',

        role: 'Seções alternadas',
        dark: true,
      },
      {
        name: 'Branco',
        token: '--color-white',

        role: 'Superfícies dos cards',
        dark: true,
      },
      {
        name: 'Azul de borda',
        token: '--color-blue-100',

        role: 'Divisórias e contornos',
        dark: true,
      },
    ]
    const colorValues = ref<Record<string, string>>({})

    function colorValue(token: string) {
      return colorValues.value[token] || token
    }

    onMounted(() => {
      const styles = getComputedStyle(document.documentElement)
      const tokens = [...colors.map((color) => color.token), '--color-action']
      colorValues.value = Object.fromEntries(
        tokens.map((token) => [token, styles.getPropertyValue(token).trim().toUpperCase()]),
      )
    })

    const typeScale = [
      {
        name: 'Display',
        family: 'Fraunces Black',
        size: '3.5 / 3.85',
        token: '--text-display',
        class: 'display',
        sample: 'Um espaço para ser você.',
      },
      {
        name: 'Título principal',
        family: 'Fraunces Black',
        size: '3 / 3.6',
        token: '--text-h1',
        class: 'h1',
        sample: 'Escuta que acolhe.',
      },
      {
        name: 'Título de seção',
        family: 'Fraunces Black',
        size: '2.5 / 3',
        token: '--text-h2',
        class: 'h2',
        sample: 'Novos caminhos começam aqui.',
      },
      {
        name: 'Título de card',
        family: 'Fraunces Bold',
        size: '1.5 / 1.8',
        token: '--text-h3',
        class: 'h3',
        sample: 'Cada história é singular.',
      },
      {
        name: 'Texto de destaque',
        family: 'Manrope Regular',
        size: '1.125 / 1.85625',
        token: '--text-body-lg',
        class: 'bodyLg',
        sample: 'Um convite a olhar para si com mais cuidado.',
      },
      {
        name: 'Texto corrido',
        family: 'Manrope Regular',
        size: '1 / 1.65',
        token: '--text-body',
        class: 'body',
        sample:
          'Uma escuta sensível e sem julgamentos para compreender seus sentimentos e construir novos caminhos.',
      },
      {
        name: 'Texto de apoio',
        family: 'Manrope Regular',
        size: '0.875 / 1.44375',
        token: '--text-small',
        class: 'small',
        sample: 'Atendimento online e presencial.',
      },
      {
        name: 'Etiqueta',
        family: 'Manrope Bold',
        size: '0.6875 / 0.9625',
        token: '--text-label',
        class: 'label',
        sample: 'CUIDADO EM CADA DETALHE',
      },
    ]
    const variants = ['primary', 'secondary', 'ghost', 'brand'] as const
    const variantNames = {
      primary: 'Primário',
      secondary: 'Secundário',
      ghost: 'Texto',
      brand: 'Marca',
    }
    const selectedVariant = ref<(typeof variants)[number]>('primary')
    const selectedSize = ref<'sm' | 'md' | 'lg'>('md')
    const buttonLabel = ref('Agendar consulta')
    const buttonDisabled = ref(false)
    const loading = ref(false)
    const feedback = ref('')
    let feedbackTimer: ReturnType<typeof setTimeout> | undefined
    let loadingTimer: ReturnType<typeof setTimeout> | undefined
    async function copy(value: string) {
      try {
        await navigator.clipboard.writeText(value)
        feedback.value = `${value} copiado.`
      } catch {
        feedback.value = `Copie o token: ${value}`
      }
      clearTimeout(feedbackTimer)
      feedbackTimer = setTimeout(() => {
        feedback.value = ''
      }, 3500)
    }
    function previewAction() {
      loading.value = true
      clearTimeout(loadingTimer)
      loadingTimer = setTimeout(() => {
        loading.value = false
        feedback.value = 'Pronto! O botão respondeu ao clique.'
      }, 1000)
    }
    onBeforeUnmount(() => {
      clearTimeout(feedbackTimer)
      clearTimeout(loadingTimer)
    })
    const spaces = [4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 96]
    const spaceKeys = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 24]
    const example = `<UiButton variant="primary" size="md" @click="agendar">\n  Agendar consulta\n</UiButton>\n\n<UiCard\n  title="Terapia individual"\n  description="Um espaço de escuta e acolhimento."\n/>\n\n<UiAccordion question="Como funciona a primeira sessão?">\n  Um primeiro encontro para nos conhecermos.\n</UiAccordion>`
    const semanticColors = [
      ['--color-background', 'Fundo da página'],
      ['--color-text', 'Texto principal'],
      ['--color-action', 'Ação principal'],
      ['--color-border', 'Bordas e divisórias'],
    ]
    const shapes = [
      { name: 'Cantos pequenos', token: '--radius-sm', value: '8px' },
      { name: 'Cards', token: '--radius-card', value: '16px' },
      { name: 'Botões & badges', token: '--radius-pill', value: '100px' },
    ]

    return {
      guideClass,
      colorValue,
      sections,
      colors,
      typeScale,
      variants,
      variantNames,
      selectedVariant,
      selectedSize,
      buttonLabel,
      buttonDisabled,
      loading,
      feedback,
      copy,
      previewAction,
      spaces,
      spaceKeys,
      example,
      semanticColors,
      shapes,
    }
  },
})
