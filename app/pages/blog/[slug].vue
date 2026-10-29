<script setup lang="ts">
import {PortableText} from '@portabletext/vue'
import {POST_QUERY} from '~~/sanity/lib/queries'
import type {Post} from '~/types/content'

definePageMeta({key: route => route.fullPath})
const slug = String(useRoute().params.slug)
const {data: post, error} = await useSanityFetch<Post>(`post:${slug}`, POST_QUERY, {slug})
if (error.value) throw createError({statusCode: 502, statusMessage: 'Não foi possível carregar a publicação.'})
if (!post.value) throw createError({statusCode: 404, statusMessage: 'Publicação não encontrada'})
useHead({title: `${post.value.title} | Ana Flavia`})
</script>
<template>
  <article v-if="post" class="container section prose">
    <h1>{{ post.title }}</h1>
    <PortableText v-if="post.body" :value="post.body" />
  </article>
</template>
