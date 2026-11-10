<script setup lang="ts">
import type { Post } from '~/types/content'
import { postCover } from '~/utils/blog'

withDefaults(defineProps<{ post: Post; featured?: boolean }>(), { featured: false })
</script>

<template>
  <article :class="['journal-card', { 'journal-card--featured': featured }]">
    <NuxtLink :to="`/blog/${post.slug}`" class="journal-card__image" :aria-label="`Ler artigo: ${post.title}`">
      <img :src="postCover(post)" alt="" width="1376" height="768" :loading="featured ? 'eager' : 'lazy'" />
    </NuxtLink>
    <div class="journal-card__content">
      <span v-if="featured" class="journal-card__featured-label">Leitura em destaque</span>
      <BlogPostMeta :post="post" />
      <component :is="featured ? 'h2' : 'h3'" class="journal-card__title">
        <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
      </component>
      <p v-if="post.excerpt" class="journal-card__excerpt">{{ post.excerpt }}</p>
      <BlogArticleLink :slug="post.slug" :title="post.title" />
    </div>
  </article>
</template>
