<script setup lang="ts">
import { defaultHome, type HomeSections } from '~/config/home'
import type { Swiper as SwiperInstance } from 'swiper'
import { A11y, Autoplay, EffectFade, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const props = withDefaults(defineProps<{ content?: HomeSections['testimonials'] }>(), {
  content: () => defaultHome.testimonials,
})

const reducedMotion = ref(false)
const slider = shallowRef<SwiperInstance>()
const hasFocus = ref(false)

watchEffect(() => {
  const instance = slider.value
  if (!instance || instance.destroyed) return

  if (reducedMotion.value || hasFocus.value || props.content.items.length < 2) {
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
  const updatePreference = () => {
    reducedMotion.value = preference.matches
  }
  updatePreference()
  preference.addEventListener('change', updatePreference)
  onBeforeUnmount(() => preference.removeEventListener('change', updatePreference))
})
</script>

<template>
  <section
    v-if="content.items.length"
    id="depoimentos"
    class="home-testimonials"
    aria-labelledby="testimonials-title"
  >
    <div class="site-shell home-testimonials__inner">
      <UiSectionHeading
        class="home-testimonials__heading"
        :eyebrow="content.eyebrow"
        eyebrow-tone="brand"
        :title="content.title"
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
          v-for="testimonial in content.items"
          :key="testimonial._key"
        >
          <figure class="card card--white testimonial-card">
            <div class="testimonial-card__quotes" aria-hidden="true" >
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
