<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    eyebrowTone?: 'brand' | 'soft' | 'outline'
    title: string
    titleId?: string
    description?: string
  }>(),
  { eyebrowTone: 'soft' },
)
</script>

<template>
  <header class="section-heading">
    <UiBadge
      v-if="eyebrow"
      :tone="eyebrowTone"
    >
      {{ eyebrow }}
    </UiBadge>
    <h2 :id="titleId">{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </header>
</template>
