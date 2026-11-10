<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { POST_QUERY, RELATED_POSTS_QUERY } from '~~/sanity/lib/queries'
import type { Post } from '~/types/content'
import { postCover } from '~/utils/blog'

definePageMeta({ key: (route) => route.fullPath })
const slug = String(useRoute().params.slug)
const { site } = useSiteContent()
const { data: post, error } = await useSanityFetch<Post>(`post:${slug}`, POST_QUERY, { slug })
if (error.value)
  throw createError({ statusCode: 502, statusMessage: 'Não foi possível carregar a publicação.' })
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Publicação não encontrada' })
const { data: related } = await useSanityFetch<Post[]>(`related:${slug}`, RELATED_POSTS_QUERY, {
  slug,
  category: post.value.category ?? '',
})
useSeoMeta({
  title: () => `${post.value?.title} | ${site.value.name}`,
  description: () => post.value?.excerpt,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.excerpt,
  ogImage: () => post.value?.coverImage?.url,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})
const shareMessage = ref('')
const manualShareUrl = ref('')
const shareInput = useTemplateRef<HTMLInputElement>('shareInput')
async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    manualShareUrl.value = ''
    shareMessage.value = 'Link copiado!'
  } catch {
    manualShareUrl.value = window.location.href
    shareMessage.value = 'Selecione e copie o link abaixo.'
    await nextTick()
    shareInput.value?.select()
  }
}
</script>

<template>
  <div v-if="post" class="journal journal--article">
    <article>
      <header class="article-header">
        <div class="site-shell">
          <nav class="journal-breadcrumb" aria-label="Localização">
            <NuxtLink to="/">Início</NuxtLink><span aria-hidden="true">/</span><NuxtLink to="/blog">Blog</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">Artigo</span>
          </nav>
          <div class="article-header__text">
            <BlogPostMeta :post="post" />
            <h1>{{ post.title }}</h1>
            <p v-if="post.excerpt" class="article-header__excerpt">{{ post.excerpt }}</p>
            <div class="article-byline">
              <img src="/images/about-portrait.png" alt="" width="44" height="44" />
              <div><span>Por {{ site.name }}</span><small>{{ site.profession }} · {{ site.registration }}</small></div>
            </div>
          </div>
          <figure class="article-cover">
            <img :src="postCover(post)" :alt="post.coverImage?.alt || ''" width="1376" height="768" fetchpriority="high" />
          </figure>
        </div>
      </header>
      <div class="site-shell article-layout">
        <aside class="article-author" aria-label="Sobre a autora">
          <span class="article-author__label">Um espaço de escuta</span>
          <img src="/images/about-portrait.png" :alt="site.name" width="88" height="88" loading="lazy" />
          <h2>{{ site.name }}</h2>
          <p>{{ site.profession }}<br />{{ site.registration }}</p>
          <NuxtLink to="/#sobre" class="journal-text-link">Conheça meu trabalho <span aria-hidden="true">↗</span></NuxtLink>
          <div class="article-author__contact">
            <p>Quer conversar sobre o que está sentindo?</p>
            <UiButton :href="site.whatsappUrl" size="sm" target="_blank" rel="noopener noreferrer">Agendar uma conversa<span class="site-visually-hidden"> pelo WhatsApp (abre em nova aba)</span></UiButton>
          </div>
        </aside>
        <div class="article-reading">
          <div class="article-prose">
            <PortableText v-if="post.body?.length" :value="post.body" />
            <p v-else>O conteúdo desta publicação estará disponível em breve.</p>
          </div>
          <div class="article-endnote"><span aria-hidden="true">✳</span><p>Cada história é singular.<br />Que esta leitura seja um convite à reflexão.</p></div>
          <div class="article-share">
            <span>Essa leitura fez sentido para você?</span>
            <UiButton variant="secondary" size="sm" @click="copyLink">Copiar link <span aria-hidden="true">↗</span></UiButton>
            <p v-if="shareMessage" role="status">{{ shareMessage }}</p>
            <input v-if="manualShareUrl" ref="shareInput" :value="manualShareUrl" readonly aria-label="Link do artigo para copiar" />
          </div>
          <NuxtLink to="/blog" class="journal-text-link article-back">← Voltar para todos os artigos</NuxtLink>
        </div>
      </div>
    </article>
    <section v-if="related?.length" class="journal-related" aria-labelledby="related-title">
      <div class="site-shell">
        <div class="journal-related__heading"><div><UiBadge>Continue explorando</UiBadge><h2 id="related-title">Outros caminhos de reflexão</h2></div><NuxtLink to="/blog" class="journal-text-link">Todos os artigos <span aria-hidden="true">↗</span></NuxtLink></div>
        <div class="journal-grid"><BlogPostCard v-for="article in related" :key="article.slug" :post="article" /></div>
      </div>
    </section>
    <BlogContactBanner />
  </div>
</template>
