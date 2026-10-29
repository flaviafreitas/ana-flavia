<script setup lang="ts">
import {PortableText} from '@portabletext/vue'
import {HOME_QUERY} from '~~/sanity/lib/queries'
import type {HomeData} from '~/types/content'

const {data: home, error} = await useSanityFetch<HomeData>('home', HOME_QUERY)
if (error.value) throw createError({statusCode: 502, statusMessage: 'Não foi possível carregar o conteúdo.'})
</script>
<template>
  <section :class="$style.hero">
    <div class="container">
      <span :class="$style.eyebrow">{{ home?.eyebrow ?? 'Bem-vindo' }}</span>
      <h1>{{ home?.title ?? 'Um espaço para apresentar seu trabalho e suas ideias.' }}</h1>
      <p>{{ home?.introduction ?? 'Esta página inicial está pronta para evoluir com o conteúdo gerenciado pelo Sanity.' }}</p>
      <NuxtLink class="button" to="/blog">Ver publicações</NuxtLink>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <h2>Sobre</h2>
      <div :class="['prose', $style.intro]">
        <PortableText v-if="home?.body" :value="home.body" />
        <p v-else>Use esta área para apresentar sua trajetória e seu trabalho.</p>
      </div>
    </div>
  </section>
</template>
<style module lang="scss">
.hero {
  display: grid;
  min-height: 68vh;
  place-items: center;
  background: linear-gradient(135deg, var(--surface) 0%, #f4e8df 100%);

  h1 {
    max-width: 16ch;
    margin: 0.5rem 0 1rem;
    font-size: clamp(2.75rem, 7vw, 5.5rem);
    line-height: 0.98;
  }

  p {
    max-width: 58ch;
    margin-bottom: 2rem;
    color: var(--muted);
    font-size: 1.1rem;
  }
}

.eyebrow {
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.intro {
  color: var(--muted);
}
</style>
