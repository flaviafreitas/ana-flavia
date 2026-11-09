<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <div class="tagline">
    <div class="site-shell tagline__inner">
      <span
        class="tagline__star"
        aria-hidden="true"
      >
        ✦
      </span>
      <p class="tagline__text">&quot;{{ text }}&quot;</p>
      <span
        class="tagline__star"
        aria-hidden="true"
      >
        ✦
      </span>
    </div>
  </div>
</template>
