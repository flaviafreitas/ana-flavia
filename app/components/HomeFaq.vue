<script setup lang="ts">
const assetUrl = useAssetUrl()
import { defaultHome, type HomeSections } from '~/config/home'

const { site } = useSiteContent()

withDefaults(defineProps<{ content?: HomeSections['faq'] }>(), {
  content: () => defaultHome.faq,
})
</script>

<template>
  <section v-if="content.items.length" id="faq" class="home-faq" aria-labelledby="faq-title" >
    <div class="site-shell home-faq__inner">
      <div class="home-faq__intro">
        <UiSectionHeading
          class="home-faq__heading"
          :eyebrow="content.eyebrow"
          eyebrow-tone="brand"
          :title="content.title"
          title-id="faq-title"
          :description="content.description"
        />
        <div class="home-faq__contacts">
          <UiButton
            class="home-faq__whatsapp"
            :href="site.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ content.button }}
            <span class="site-visually-hidden">(abre em nova aba)</span>
          </UiButton>
          <a
            class="home-faq__instagram"
            :href="site.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="assetUrl('/images/faq/dot.svg')" width="8" height="8" alt="" aria-hidden="true" />
            @{{ site.instagram }} no Instagram
            <span class="site-visually-hidden">(abre em nova aba)</span>
          </a>
        </div>
        <div class="home-faq__availability">
          <strong>{{ content.availabilityTitle }}</strong>
          <span>{{ content.availability }}</span>
        </div>
      </div>
      <div class="home-faq__list">
        <UiAccordion
          v-for="item in content.items"
          :key="item._key"
          :question="item.question"
          :open="true"
        >
          <template #indicator>
            <img :src="assetUrl('/images/faq/chevron-down.svg')" width="16" height="16" alt="" />
          </template>
          <p>{{ item.answer }}</p>
        </UiAccordion>
      </div>
    </div>
  </section>
</template>
