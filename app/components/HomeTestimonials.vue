<script setup lang="ts">
import { defaultHome, type HomeSections } from '~/config/home'
import { A11y, EffectFade, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

withDefaults(defineProps<{ content?: HomeSections['testimonials'] }>(), {
  content: () => defaultHome.testimonials,
})

const reducedMotion = ref(false)
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
        id="testimonials-carousel"
        class="home-testimonials__slider"
        :modules="[A11y, EffectFade, Keyboard, Pagination]"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :slides-per-view="1"
        :space-between="32"
        :speed="reducedMotion ? 0 : 600"
        :grab-cursor="true"
        :keyboard="{ enabled: true, onlyInViewport: true }"
        :pagination="{ clickable: true, bulletElement: 'button' }"
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
