<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'brand'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    to?: string
    href?: string
  }>(),
  { variant: 'primary', size: 'md', type: 'button', disabled: false, loading: false },
)

const NuxtLink = resolveComponent('NuxtLink')
const unavailable = computed(() => props.disabled || props.loading)

function guardClick(event: MouseEvent) {
  if (unavailable.value) {
    event.preventDefault()
    event.stopImmediatePropagation()
  }
}
</script>

<template>
  <component
    :is="to ? NuxtLink : href ? 'a' : 'button'"
    :to="to && !unavailable ? to : undefined"
    :href="href && !unavailable ? href : undefined"
    :type="!to && !href ? type : undefined"
    :disabled="!to && !href ? unavailable : undefined"
    :aria-disabled="(to || href) && unavailable ? true : undefined"
    :tabindex="(to || href) && unavailable ? -1 : undefined"
    :aria-busy="loading || undefined"
    :class="['btn', `btn--${variant}`, `btn--${size}`]"
    @click="guardClick"
  >
    <span
      v-if="loading"
      class="btn__spinner"
      aria-hidden="true"
    ></span>
    <slot />
  </component>
</template>
