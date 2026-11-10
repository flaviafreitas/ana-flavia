<script setup lang="ts">
import { defaultHome, type HomeSections } from '~/config/home'
import type { Post } from '~/types/content'

withDefaults(defineProps<{ content?: HomeSections['blog']; posts?: Post[]; failed?: boolean }>(), {
  content: () => defaultHome.blog,
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
  <section id="blog" class="home-blog" aria-labelledby="blog-title" >
    <div class="site-shell home-blog__inner">
      <UiSectionHeading
        class="home-blog__heading"
        :eyebrow="content.eyebrow"
        eyebrow-tone="brand"
        :title="content.title"
        title-id="blog-title"
      />
      <div v-if="posts.length" class="home-blog__grid" >
        <article
          v-for="(post, index) in posts.slice(0, 3)"
          :key="post.slug"
          class="card card--white blog-card"
        >
          <NuxtLink :to="`/blog/${post.slug}`" class="blog-card__cover" tabindex="-1" aria-hidden="true" >
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
              <UiBadge class="blog-card__category" tone="soft" > {{ post.category || 'Artigos' }} </UiBadge>
              <span v-if="post.readingTime" class="blog-card__reading-time" >
                {{ post.readingTime }} min de leitura
              </span>
            </div>
            <h3> <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink> </h3>
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="blog-card__link"
              :aria-label="`Ler artigo: ${post.title}`"
            >
              {{ content.articleButton }}
              <img src="/images/blog/chevron-right.svg" width="14" height="14" alt="" aria-hidden="true" />
            </NuxtLink>
          </div>
        </article>
      </div>
      <p v-else class="home-blog__empty" role="status" >
        {{
          failed
            ? 'Não foi possível carregar os artigos. Tente novamente mais tarde.'
            : content.emptyMessage
        }}
      </p>
      <UiButton class="home-blog__action" variant="secondary" to="/blog" >
        {{ content.button }}
      </UiButton>
    </div>
  </section>
</template>
