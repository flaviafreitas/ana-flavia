<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { HOME_QUERY } from '~~/sanity/lib/queries'
import type { HomeData } from '~/types/content'

const { data: home, error } = await useSanityFetch<HomeData>('home', HOME_QUERY)
if (error.value)
  throw createError({ statusCode: 502, statusMessage: 'Não foi possível carregar o conteúdo.' })
</script>

<template>
  <HomeHero
    :eyebrow="home?.eyebrow"
    :title="home?.title"
    :introduction="home?.introduction"
  />
  <UiTagline text="O que não é dito o corpo expressa, dê voz a palavra" />
  <section
    id="sobre"
    class="section"
  >
    <div class="container">
      <h2>Sobre</h2>
      <div :class="['prose', 'home-intro']">
        <PortableText
          v-if="home?.body"
          :value="home.body"
        />
        <p v-else>Use esta área para apresentar sua trajetória e seu trabalho.</p>
      </div>
    </div>
  </section>
</template>
