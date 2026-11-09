<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { HOME_QUERY } from '~~/sanity/lib/queries'
import type { HomeData } from '~/types/content'

const { data: home, error } = await useSanityFetch<HomeData>('home', HOME_QUERY)
if (error.value)
  throw createError({ statusCode: 502, statusMessage: 'Não foi possível carregar o conteúdo.' })
</script>

<template>
  <section class="home-hero">
    <div class="container">
      <span class="home-eyebrow">{{ home?.eyebrow ?? 'Bem-vindo' }}</span>
      <h1>{{ home?.title ?? 'Um espaço para apresentar seu trabalho e suas ideias.' }}</h1>
      <p>
        {{
          home?.introduction ??
          'Esta página inicial está pronta para evoluir com o conteúdo gerenciado pelo Sanity.'
        }}
      </p>
      <NuxtLink
        class="button"
        to="/blog"
      >
        Ver publicações
      </NuxtLink>
    </div>
  </section>
  <section id="sobre" class="section">
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
