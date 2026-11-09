<script setup lang="ts">
import { site } from '~/config/site'
</script>

<template>
  <section id="agendar" class="home-cta" aria-labelledby="cta-title">
    <div class="home-cta__decoration" aria-hidden="true">
      <span class="home-cta__spark home-cta__spark--plus">+</span>
      <span class="home-cta__spark home-cta__spark--cross">×</span>
      <img class="home-cta__circle home-cta__circle--top" src="/images/cta/circle-top.svg" width="200" height="200" alt="" />
      <img class="home-cta__circle home-cta__circle--left" src="/images/cta/circle-left.svg" width="160" height="160" alt="" />
    </div>
    <div class="site-shell home-cta__inner">
      <UiSectionHeading
        class="home-cta__heading"
        eyebrow="Próximo Passo"
        eyebrow-tone="brand"
        title="Vamos iniciar esse percurso juntos?"
        title-id="cta-title"
        description="Dê o primeiro passo em direção ao seu próprio bem-estar emocional e compreensão dos seus sintomas. Entre em contato para alinhar seu primeiro horário."
      />
      <div class="home-cta__actions">
        <UiButton
          class="home-cta__whatsapp"
          :href="site.whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar pelo WhatsApp
          <span class="site-visually-hidden">(abre em nova aba)</span>
        </UiButton>
        <UiButton
          class="home-cta__instagram"
          variant="secondary"
          :href="site.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver meu Instagram
          <span class="site-visually-hidden">(abre em nova aba)</span>
        </UiButton>
      </div>
      <ul class="home-cta__reassurance" role="list">
        <li v-for="text in ['Sigilo garantido', 'Atendimento online e presencial']" :key="text">
          <img src="/images/cta/dot.svg" width="6" height="6" alt="" aria-hidden="true" />
          {{ text }}
        </li>
      </ul>
    </div>
  </section>
</template>
