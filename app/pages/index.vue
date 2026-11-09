<script setup lang="ts">
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
  <HomeAbout :body="home?.body" />
  <HomeServices />
</template>
