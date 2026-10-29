<script setup lang="ts">
import {POSTS_QUERY} from '~~/sanity/lib/queries'
import type {Post} from '~/types/content'

useHead({title: 'Blog | Ana Flavia'})
const {data: posts, error} = await useSanityFetch<Post[]>('posts', POSTS_QUERY)
if (error.value) throw createError({statusCode: 502, statusMessage: 'Não foi possível carregar as publicações.'})
</script>
<template>
  <section class="container section">
    <h1>Blog</h1>
    <p v-if="!posts?.length">As publicações aparecerão aqui quando forem criadas no Sanity Studio.</p>
    <article v-for="post in posts" :key="post.slug">
      <h2><NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink></h2>
      <p v-if="post.excerpt">{{ post.excerpt }}</p>
    </article>
  </section>
</template>
