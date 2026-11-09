<script setup lang="ts">
import { site } from '~/config/site'

withDefaults(defineProps<{ eyebrow?: string; title?: string; introduction?: string }>(), {
  eyebrow: 'Abordagem Psicanalítica',
  title: 'Um espaço seguro para desatar os nós da sua mente.',
  introduction:
    'Através de uma escuta sensível e sem julgamentos, convido você a explorar sua singularidade, compreender seus sintomas e construir novos caminhos.',
})
</script>

<template>
  <section
    class="home-hero"
    aria-labelledby="hero-title"
  >
    <div
      class="home-hero__decoration"
      aria-hidden="true"
    >
      <picture class="home-hero__circle home-hero__circle--top">
        <source
          media="(max-width: 800px)"
          srcset="/images/hero/circle-top-mobile.svg"
          width="200"
          height="200"
        />
        <img
          src="/images/hero/circle-top.svg"
          width="320"
          height="320"
          alt=""
        />
      </picture>
      <picture class="home-hero__circle home-hero__circle--bottom">
        <source
          media="(max-width: 800px)"
          srcset="/images/hero/circle-bottom-mobile.svg"
          width="160"
          height="160"
        />
        <img
          src="/images/hero/circle-bottom.svg"
          width="240"
          height="240"
          alt=""
        />
      </picture>
      <span class="home-hero__spark home-hero__spark--1">+</span>
      <span class="home-hero__spark home-hero__spark--2">×</span>
      <span class="home-hero__spark home-hero__spark--3">+</span>
      <span class="home-hero__spark home-hero__spark--4">×</span>
      <span class="home-hero__spark home-hero__spark--5">×</span>
      <span class="home-hero__spark home-hero__spark--6">+</span>
    </div>
    <div class="site-shell home-hero__inner">
      <div class="home-hero__heading">
        <UiBadge tone="brand">{{ eyebrow }}</UiBadge>
        <h1 id="hero-title">{{ title }}</h1>
      </div>
      <figure class="home-hero__portrait">
        <img
          src="/images/hero/portrait.png"
          :alt="`${site.name} sentada em uma poltrona no consultório`"
          width="1440"
          height="1440"
          fetchpriority="high"
        />
      </figure>
      <p class="home-hero__description">{{ introduction }}</p>
      <div class="home-hero__actions">
        <div class="home-hero__buttons">
          <UiButton
            :href="site.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar pelo WhatsApp
            <span class="site-visually-hidden">(abre em nova aba)</span>
          </UiButton>
          <UiButton
            to="/#sobre"
            variant="secondary"
          >
            Conheça meu trabalho
          </UiButton>
        </div>
        <p class="home-hero__availability">Atendimento online (todo o Brasil) e presencial</p>
      </div>
      <ul
        class="home-hero__credentials"
        aria-label="Sobre o atendimento"
      >
        <li
          v-for="label in ['Psicanálise Clínica', '+5 anos de experiência']"
          :key="label"
        >
          <picture aria-hidden="true">
            <source
              media="(max-width: 800px)"
              srcset="/images/hero/dot-mobile.svg"
              width="6"
              height="6"
            />
            <img
              src="/images/hero/dot.svg"
              width="8"
              height="8"
              alt=""
            />
          </picture>
          {{ label }}
        </li>
      </ul>
    </div>
  </section>
</template>
