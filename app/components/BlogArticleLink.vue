<script setup lang="ts">
withDefaults(defineProps<{ slug: string; title: string; label?: string }>(), { label: 'Ler artigo' })
</script>

<template>
  <NuxtLink :to="`/blog/${slug}`" class="article-link" :aria-label="`${label}: ${title}`">
    {{ label }}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
  </NuxtLink>
</template>

<style scoped lang="scss">
.article-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: auto;
  padding-block: var(--space-2);
  color: var(--color-action);
  font: 700 var(--text-small)/1.4 var(--font-body);
  text-decoration: none;

  svg { display: block; flex-shrink: 0; }
  &:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 4px; border-radius: 2px; }
}

</style>
