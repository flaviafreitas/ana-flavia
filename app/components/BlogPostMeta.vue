<script setup lang="ts">
import type { Post } from '~/types/content'
import { formatPostDate } from '~/utils/blog'

defineProps<{ post: Post }>()
</script>

<template>
  <div class="blog-meta">
    <UiBadge tone="soft">{{ post.category || 'Reflexões' }}</UiBadge>
    <time v-if="formatPostDate(post.publishedAt)" :datetime="post.publishedAt">{{ formatPostDate(post.publishedAt) }}</time>
    <span v-if="post.readingTime">{{ post.readingTime }} min de leitura</span>
  </div>
</template>
