<script setup lang="ts">
const assetUrl = useAssetUrl()
import { defaultHome, type HomeSections } from '~/config/home'
import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'
const { site } = useSiteContent()

const props = withDefaults(
  defineProps<{ content?: HomeSections['about']; body?: PortableTextBlock[] }>(),
  { content: () => defaultHome.about },
)

const stats = computed(() => props.content.stats)
const counts = ref(stats.value.map((stat) => stat.value))
watch(stats, () => {
  finishCounting()
})
const statsElement = useTemplateRef<HTMLDListElement>('statsElement')
let observer: IntersectionObserver | undefined
let motionPreference: MediaQueryList | undefined
let animationFrame = 0

function finishCounting() {
  cancelAnimationFrame(animationFrame)
  observer?.disconnect()
  counts.value = stats.value.map((stat) => stat.value)
}

function handleMotionChange() {
  if (motionPreference?.matches) finishCounting()
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (motionPreference.matches || !statsElement.value || !('IntersectionObserver' in window)) return

  counts.value = stats.value.map(() => 0)
  motionPreference.addEventListener('change', handleMotionChange)
  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return
      observer?.disconnect()
      const start = performance.now()

      function tick(now: number) {
        const progress = Math.min((now - start) / 3000, 1)
        const eased = 1 - (1 - progress) ** 3
        counts.value = stats.value.map((stat) => Math.floor(stat.value * eased))
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
        :eyebrow="content.eyebrow"
        eyebrow-tone="brand"
        :title="content.title"
        title-id="about-title"
      />
      <figure class="home-about__portrait">
        <img
          :src="assetUrl('/images/about-portrait.png')"
          :alt="`${site.name} no consultório, apoiada à mesa com livros`"
          width="460"
          height="560"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div class="home-about__body">
        <PortableText
          v-if="body"
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
          :key="stat._key"
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
