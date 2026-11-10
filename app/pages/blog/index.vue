<script setup lang="ts">
import { POSTS_QUERY } from '~~/sanity/lib/queries'
import type { Post } from '~/types/content'
import { normalizeSearch } from '~/utils/blog'

useSeoMeta({
  title: 'Blog | Ana Flávia',
  description:
    'Reflexões sobre autoconhecimento, saúde mental e psicanálise. Um espaço para olhar para si com mais curiosidade e acolhimento.',
})
const { data: posts, error } = await useSanityFetch<Post[]>('posts', POSTS_QUERY)
if (error.value)
  throw createError({ statusCode: 502, statusMessage: 'Não foi possível carregar as publicações.' })

const search = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const pageSize = 6
const resultsHeading = useTemplateRef<HTMLHeadingElement>('resultsHeading')
const categories = computed(() =>
  [
    ...new Set(
      (posts.value ?? [])
        .map((post) => post.category)
        .filter((category): category is string => Boolean(category)),
    ),
  ].sort((a, b) => a.localeCompare(b, 'pt-BR')),
)
const hasFilters = computed(() => Boolean(search.value.trim() || selectedCategory.value))
const featured = computed(() => (!hasFilters.value ? posts.value?.[0] : undefined))
const filteredPosts = computed(() =>
  (posts.value ?? []).filter((post) => {
    const matchesCategory = !selectedCategory.value || post.category === selectedCategory.value
    const haystack = normalizeSearch(`${post.title} ${post.excerpt ?? ''} ${post.category ?? ''}`)
    return matchesCategory && haystack.includes(normalizeSearch(search.value))
  }),
)
const remainingPosts = computed(() =>
  filteredPosts.value.filter((post) => post.slug !== featured.value?.slug),
)
const pageCount = computed(() => Math.max(1, Math.ceil(remainingPosts.value.length / pageSize)))
const visiblePosts = computed(() =>
  remainingPosts.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize),
)
watch([search, selectedCategory], () => {
  currentPage.value = 1
})

function clearFilters() {
  search.value = ''
  selectedCategory.value = ''
}
async function changePage(page: number) {
  currentPage.value = page
  await nextTick()
  resultsHeading.value?.focus({ preventScroll: true })
  resultsHeading.value?.scrollIntoView({ block: 'start' })
}
</script>

<template>
  <div class="journal">
    <section class="journal-hero" aria-labelledby="blog-title">
      <div class="site-shell journal-hero__inner">
        <div>
          <UiBadge>Conteúdo & reflexões</UiBadge>
          <h1 id="blog-title">Um convite para<br />olhar para dentro<span>.</span></h1>
        </div>
        <p>Entre perguntas e descobertas, um espaço para pensar sobre a vida, as relações e os caminhos do cuidado com você.</p>
      </div>
      <span class="journal-hero__decoration" aria-hidden="true">✳</span>
    </section>

    <div class="site-shell journal__content">
      <BlogPostCard v-if="featured && currentPage === 1" :post="featured" featured />

      <section class="journal-library" aria-labelledby="articles-title">
        <div class="journal-library__top">
          <h2 id="articles-title" ref="resultsHeading" tabindex="-1">{{ hasFilters ? 'Suas próximas leituras' : 'Mais para refletir' }}</h2>
          <form class="journal-search" role="search" @submit.prevent>
            <label class="site-visually-hidden" for="blog-search">Buscar artigos</label>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
            <input id="blog-search" v-model="search" type="search" placeholder="O que você quer explorar?" />
          </form>
        </div>
        <div v-if="posts?.length" class="journal-filters" role="group" aria-label="Filtrar por tema">
          <button type="button" :aria-pressed="selectedCategory === ''" @click="selectedCategory = ''">Todos os temas</button>
          <button v-for="category in categories" :key="category" type="button" :aria-pressed="selectedCategory === category" @click="selectedCategory = category">{{ category }}</button>
        </div>
        <p class="journal-results" role="status" aria-live="polite">{{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'artigo para explorar' : 'artigos para explorar' }}{{ featured ? ' · incluindo a leitura em destaque' : '' }}</p>
        <div v-if="visiblePosts.length" class="journal-grid">
          <BlogPostCard v-for="post in visiblePosts" :key="post.slug" :post="post" />
        </div>
        <div v-else-if="!featured" class="journal-empty">
          <span aria-hidden="true">✳</span>
          <h3>{{ hasFilters ? 'Vamos tentar outro caminho?' : 'Novas reflexões estão a caminho.' }}</h3>
          <p>{{ hasFilters ? 'Não encontramos artigos com essa busca. Experimente outro termo ou explore todos os temas.' : 'Em breve, este espaço receberá novas leituras. Volte para acompanhar.' }}</p>
          <UiButton v-if="hasFilters" variant="secondary" @click="clearFilters">Ver todos os artigos</UiButton>
        </div>
        <nav v-if="pageCount > 1" class="journal-pagination" aria-label="Páginas de artigos">
          <UiButton variant="secondary" size="sm" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">← Anterior</UiButton>
          <span aria-live="polite">{{ currentPage }} de {{ pageCount }}</span>
          <UiButton variant="secondary" size="sm" :disabled="currentPage === pageCount" @click="changePage(currentPage + 1)">Próxima →</UiButton>
        </nav>
      </section>
    </div>
    <BlogContactBanner />
  </div>
</template>
