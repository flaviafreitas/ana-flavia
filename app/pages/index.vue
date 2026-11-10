<script setup lang="ts">
import { HOME_QUERY, HOME_POSTS_QUERY } from '~~/sanity/lib/queries'
import { resolveHomeSections } from '~/config/home'
import type { HomeData, Post } from '~/types/content'

const { data: home, error } = await useSanityFetch<HomeData>('home', HOME_QUERY)
if (error.value)
  throw createError({ statusCode: 502, statusMessage: 'Não foi possível carregar o conteúdo.' })

const { data: posts, error: postsError } = await useSanityFetch<Post[]>(
  'home-posts',
  HOME_POSTS_QUERY,
)
const sections = computed(() => resolveHomeSections(home.value))
const { site } = useSiteContent()
usePageSeo({
  title: () => `${site.value.name} | ${site.value.profession}`,
  description: () =>
    home.value?.introduction ||
    'Psicoterapia com escuta psicanalítica, acolhimento e sigilo. Atendimento online em todo o Brasil e presencial com Ana Flávia.',
})
</script>

<template>
  <HomeHero
    :content="sections.hero"
    :eyebrow="home?.eyebrow"
    :title="home?.title"
    :introduction="home?.introduction"
  />
  <UiTagline :text="home?.tagline ?? 'O que não é dito o corpo expressa, dê voz a palavra'" />
  <HomeAbout :content="sections.about" :body="home?.body" />
  <HomeServices :content="sections.services" />
  <HomeHowWorks :content="sections.howWorks" />
  <HomeTestimonials :content="sections.testimonials" />
  <HomeBlog :content="sections.blog" :posts="posts ?? []" :failed="Boolean(postsError)" />
  <HomeFaq :content="sections.faq" />
  <HomeCta :content="sections.cta" />
</template>
