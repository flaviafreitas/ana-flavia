<script setup lang="ts">
const assetUrl = useAssetUrl()
import { defaultHome, type HomeSections } from '~/config/home'
const { site } = useSiteContent()
withDefaults(defineProps<{ content?: HomeSections['cta'] }>(), { content: () => defaultHome.cta })
</script>

<template>
  <section id="agendar" class="home-cta" aria-labelledby="cta-title" >
    <div class="home-cta__decoration" aria-hidden="true" >
      <span class="home-cta__spark home-cta__spark--plus">+</span>
      <span class="home-cta__spark home-cta__spark--cross">×</span>
      <img class="home-cta__circle home-cta__circle--top" :src="assetUrl('/images/cta/circle-top.svg')" width="200" height="200" alt="" />
      <img class="home-cta__circle home-cta__circle--left" :src="assetUrl('/images/cta/circle-left.svg')" width="160" height="160" alt="" />
    </div>
    <div class="site-shell home-cta__inner">
      <UiSectionHeading
        class="home-cta__heading"
        :eyebrow="content.eyebrow"
        eyebrow-tone="brand"
        :title="content.title"
        title-id="cta-title"
        :description="content.description"
      />
      <div class="home-cta__actions">
        <UiButton
          class="home-cta__whatsapp"
          :href="site.whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ content.primaryButton }}
          <span class="site-visually-hidden">(abre em nova aba)</span>
        </UiButton>
        <UiButton
          class="home-cta__instagram"
          variant="secondary"
          :href="site.instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ content.secondaryButton }}
          <span class="site-visually-hidden">(abre em nova aba)</span>
        </UiButton>
      </div>
      <ul class="home-cta__reassurance" role="list" >
        <li v-for="text in content.reassurance" :key="text" >
          <img :src="assetUrl('/images/cta/dot.svg')" width="6" height="6" alt="" aria-hidden="true" />
          {{ text }}
        </li>
      </ul>
    </div>
  </section>
</template>
