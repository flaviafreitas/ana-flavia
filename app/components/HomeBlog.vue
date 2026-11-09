<script setup lang="ts">
import type { Post } from '~/types/content'

withDefaults(defineProps<{ posts?: Post[]; failed?: boolean }>(), {
  posts: () => [],
  failed: false,
})

const fallbackImages = [
  '/images/blog/personality.jpg',
  '/images/blog/self-knowledge.jpg',
  '/images/blog/sexuality.jpg',
]
</script>

<template>
  <section id="blog" class="home-blog" aria-labelledby="blog-title">
    <div class="site-shell home-blog__inner">
      <UiSectionHeading
        class="home-blog__heading"
        eyebrow="Conteúdo & Artigos"
        eyebrow-tone="brand"
        title="Reflexões sobre a mente e o comportamento"
        title-id="blog-title"
      />
      <div v-if="posts.length" class="home-blog__grid">
        <article
          v-for="(post, index) in posts.slice(0, 3)"
          :key="post.slug"
          class="card card--white blog-card"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="blog-card__cover" tabindex="-1" aria-hidden="true">
            <img
              :src="post.coverImage?.url || fallbackImages[index]"
              :alt="post.coverImage?.alt || ''"
              width="1376"
              height="768"
              loading="lazy"
            />
          </NuxtLink>
          <div class="blog-card__body">
            <div class="blog-card__meta">
              <UiBadge class="blog-card__category" tone="soft">{{ post.category || 'Artigos' }}</UiBadge>
              <span v-if="post.readingTime" class="blog-card__reading-time">
                {{ post.readingTime }} min de leitura
              </span>
            </div>
            <h3><NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink></h3>
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="blog-card__link"
              :aria-label="`Ler artigo: ${post.title}`"
            >
              Ler artigo
              <img src="/images/blog/chevron-right.svg" width="14" height="14" alt="" aria-hidden="true" />
            </NuxtLink>
          </div>
        </article>
      </div>
      <p v-else class="home-blog__empty" role="status">
        {{ failed ? 'Não foi possível carregar os artigos. Tente novamente mais tarde.' : 'Novas reflexões em breve.' }}
      </p>
      <UiButton class="home-blog__action" variant="secondary" to="/blog">
        Ver todos os artigos
      </UiButton>
    </div>
  </section>
</template>
