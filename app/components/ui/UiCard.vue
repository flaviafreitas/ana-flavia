<script setup lang="ts">
withDefaults(defineProps<{ title: string; description?: string; tone?: 'white' | 'soft' }>(), {
  tone: 'white',
})
</script>

<template>
  <article :class="['card', `card--${tone}`]">
    <div
      v-if="$slots.icon"
      class="card__icon"
      aria-hidden="true"
    >
      <slot name="icon" />
    </div>
    <h3>{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
    <slot />
    <div
      v-if="$slots.footer"
      class="card__footer"
    >
      <slot name="footer" />
    </div>
  </article>
</template>
