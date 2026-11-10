<script setup lang="ts">
const assetUrl = useAssetUrl()
const { site } = useSiteContent()

withDefaults(defineProps<{ inverted?: boolean; showRegistration?: boolean }>(), {
  inverted: false,
  showRegistration: true,
})
</script>

<template>
  <NuxtLink
    :class="['site-brand', { 'site-brand--inverted': inverted }]"
    to="/"
  >
    <span
      class="site-brand__mark"
      aria-hidden="true"
    >
      <img
        :src="assetUrl(inverted ? '/images/brand-mark-footer.svg' : '/images/brand-mark-header.svg')"
        :width="inverted ? 20 : 22"
        :height="inverted ? 20 : 22"
        alt=""
      />
    </span>
    <span class="site-brand__text">
      <span class="site-brand__name">{{ site.name }}</span>
      <span
        v-if="showRegistration"
        class="site-brand__registration"
      >
        {{ site.profession }}
        <span aria-hidden="true">·</span>
        {{ site.registration }}
      </span>
    </span>
  </NuxtLink>
</template>
