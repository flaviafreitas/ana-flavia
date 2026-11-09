<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'
import { site } from '~/config/site'

defineProps<{ body?: PortableTextBlock[] }>()

const stats = [
  { label: 'Anos de Atuação', value: 5 },
  { label: 'Pacientes Atendidos', value: 200 },
]
const counts = ref(stats.map((stat) => stat.value))
const statsElement = useTemplateRef<HTMLDListElement>('statsElement')
let observer: IntersectionObserver | undefined
let motionPreference: MediaQueryList | undefined
let animationFrame = 0

function finishCounting() {
  cancelAnimationFrame(animationFrame)
  observer?.disconnect()
  counts.value = stats.map((stat) => stat.value)
}

function handleMotionChange() {
  if (motionPreference?.matches) finishCounting()
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (motionPreference.matches || !statsElement.value || !('IntersectionObserver' in window)) return

  counts.value = stats.map(() => 0)
  motionPreference.addEventListener('change', handleMotionChange)
  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return
      observer?.disconnect()
      const start = performance.now()

      function tick(now: number) {
        const progress = Math.min((now - start) / 3000, 1)
        const eased = 1 - (1 - progress) ** 3
        counts.value = stats.map((stat) => Math.floor(stat.value * eased))
        if (progress < 1) animationFrame = requestAnimationFrame(tick)
      }

      animationFrame = requestAnimationFrame(tick)
    },
    { threshold: 0.5 },
  )
  observer.observe(statsElement.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  observer?.disconnect()
  motionPreference?.removeEventListener('change', handleMotionChange)
})
</script>

<template>
  <section
    id="sobre"
    class="home-about"
    aria-labelledby="about-title"
  >
    <div class="site-shell home-about__inner">
      <UiSectionHeading
        class="home-about__heading"
        eyebrow="Olá, eu sou a Ana"
        eyebrow-tone="brand"
        title="A terapia não precisa ser fria, formal ou distante."
        title-id="about-title"
      />
      <figure class="home-about__portrait">
        <img
          src="/images/about-portrait.png"
          :alt="`${site.name} no consultório, apoiada à mesa com livros`"
          width="460"
          height="560"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div class="home-about__body">
        <PortableText
          v-if="body?.length"
          :value="body"
        />
        <template v-else>
          <p>
            Como psicóloga de orientação psicanalítica, meu compromisso é criar um espaço acessível,
            acolhedor e genuíno. Acredito que olhar para dentro e desatar as amarras do nosso
            sofrimento exige coragem, mas também leveza.
          </p>
          <p>
            Tenho uma atuação clínica voltada para o acolhimento de questões contemporâneas, com
            ênfase em autoconhecimento profundo, regulação em transtornos de personalidade e
            acolhimento das vivências da sexualidade.
          </p>
        </template>
      </div>
      <dl
        ref="statsElement"
        class="home-about__stats"
        aria-label="Experiência profissional"
      >
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
        >
          <dt>{{ stat.label }}</dt>
          <dd>
            <span class="site-visually-hidden">{{ stat.value }}+</span>
            <span aria-hidden="true">{{ counts[index] }}+</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
