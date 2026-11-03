<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'brand' | 'soft' | 'outline' }>(), { tone: 'brand' })
</script>

<template>
  <span :class="['badge', `badge--${tone}`]"><slot /></span>
</template>
