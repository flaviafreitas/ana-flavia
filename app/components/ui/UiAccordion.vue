<script setup lang="ts">
withDefaults(defineProps<{ question: string; open?: boolean }>(), { open: false })
</script>

<template>
  <details
    :open="open"
    class="accordion"
  >
    <summary>
      {{ question }}
      <span
        class="accordion__indicator"
        aria-hidden="true"
      >
        <slot name="indicator">+</slot>
      </span>
    </summary>
    <div class="accordion__answer"><slot /></div>
  </details>
</template>
