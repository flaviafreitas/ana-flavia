<script setup lang="ts">
import { defaultHome, type HomeSections } from '~/config/home'
import type { Service } from '~/config/services'
const { site } = useSiteContent()

withDefaults(defineProps<{ content?: HomeSections['services'] }>(), {
  content: () => defaultHome.services,
})

function contactUrl(service: Pick<Service, 'title'>) {
  return `${site.value.whatsappUrl}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o atendimento para ${service.title.toLocaleLowerCase('pt-BR')}.`)}`
}
</script>

<template>
  <section
    v-if="content.items.length"
    id="servicos"
    class="home-services"
    aria-labelledby="services-title"
  >
    <div class="site-shell home-services__inner">
      <UiSectionHeading
        class="home-services__heading"
        :eyebrow="content.eyebrow"
        eyebrow-tone="brand"
        :title="content.title"
        title-id="services-title"
        :description="content.description"
      />
      <div class="home-services__grid">
        <UiCard
          v-for="service in content.items"
          :key="service._key"
          class="service-card"
          :title="service.title"
          :description="service.description"
          :tone="service.featured ? 'dark' : 'white'"
        >
          <template #icon>
            <img
              :src="service.icon"
              width="28"
              height="28"
              alt=""
              loading="lazy"
            />
          </template>
          <template #footer>
            <UiButton
              class="service-card__action"
              :variant="service.featured ? 'primary' : 'ghost'"
              size="sm"
              :href="contactUrl(service)"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Saiba mais sobre ${service.title} pelo WhatsApp (abre em nova aba)`"
            >
              <span aria-hidden="true">→</span>
            </UiButton>
          </template>
        </UiCard>
      </div>
    </div>
  </section>
</template>
