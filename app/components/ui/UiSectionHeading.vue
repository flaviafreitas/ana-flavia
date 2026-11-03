<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; description?: string }>()
</script>

<template>
  <header class="section-heading">
    <UiBadge
      v-if="eyebrow"
      tone="soft"
    >
      {{ eyebrow }}
    </UiBadge>
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </header>
</template>
