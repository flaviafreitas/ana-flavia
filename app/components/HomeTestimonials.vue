<script setup lang="ts">
import type { Swiper as SwiperInstance } from 'swiper'
import { A11y, Autoplay, EffectFade, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { defaultTestimonials, type Testimonial } from '~/config/testimonials'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const props = withDefaults(defineProps<{ testimonials?: Testimonial[] }>(), {
  testimonials: () => defaultTestimonials,
})

const reducedMotion = ref(false)
const slider = shallowRef<SwiperInstance>()
const hasFocus = ref(false)

watchEffect(() => {
  const instance = slider.value
  if (!instance || instance.destroyed) return

  if (reducedMotion.value || hasFocus.value || props.testimonials.length < 2) {
    instance.autoplay.stop()
  } else if (!instance.autoplay.running) {
    instance.autoplay.start()
  }
})

function handleFocusOut(event: FocusEvent) {
  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) {
    hasFocus.value = false
  }
}

onMounted(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  const updatePreference = () => { reducedMotion.value = preference.matches }
  updatePreference()
  preference.addEventListener('change', updatePreference)
  onBeforeUnmount(() => preference.removeEventListener('change', updatePreference))
})
</script>

<template>
  <section
    v-if="testimonials.length"
    id="depoimentos"
    class="home-testimonials"
    aria-labelledby="testimonials-title"
  >
    <div class="site-shell home-testimonials__inner">
      <UiSectionHeading
        class="home-testimonials__heading"
        eyebrow="Relatos de Quem Já Foi"
        eyebrow-tone="brand"
        title="O que dizem sobre a terapia"
        title-id="testimonials-title"
      />
      <Swiper
        class="home-testimonials__slider"
        :modules="[A11y, Autoplay, EffectFade, Keyboard, Pagination]"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :slides-per-view="1"
        :space-between="32"
        :speed="reducedMotion ? 0 : 600"
        :autoplay="{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }"
        :keyboard="{ enabled: true, onlyInViewport: true }"
        :pagination="{ clickable: true, bulletElement: 'button' }"
        @swiper="slider = $event"
        @focusin="hasFocus = true"
        @focusout="handleFocusOut"
        :a11y="{
          containerRoleDescriptionMessage: 'Carrossel de depoimentos',
          itemRoleDescriptionMessage: 'Depoimento',
          slideLabelMessage: '{{index}} de {{slidesLength}}',
          paginationBulletMessage: 'Ir para o depoimento {{index}}',
        }"
      >
        <SwiperSlide
          v-for="testimonial in testimonials"
          :key="testimonial.id"
        >
          <figure class="card card--white testimonial-card">
            <div class="testimonial-card__quotes" aria-hidden="true">
              <span>“</span>
              <span>”</span>
            </div>
            <blockquote>{{ testimonial.quote }}</blockquote>
            <figcaption>
              <span class="testimonial-card__name">{{ testimonial.name }}</span>
              <span class="testimonial-card__detail">{{ testimonial.detail }}</span>
            </figcaption>
          </figure>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
