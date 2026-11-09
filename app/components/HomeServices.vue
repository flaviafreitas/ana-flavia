<script setup lang="ts">
import { defaultServices, type Service } from '~/config/services'
import { site } from '~/config/site'

withDefaults(defineProps<{ services?: Service[] }>(), {
  services: () => defaultServices,
})

function contactUrl(service: Service) {
  return `${site.whatsappUrl}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o atendimento para ${service.title.toLocaleLowerCase('pt-BR')}.`)}`
}
</script>

<template>
  <section
    v-if="services.length"
    id="servicos"
    class="home-services"
    aria-labelledby="services-title"
  >
    <div class="site-shell home-services__inner">
      <UiSectionHeading
        class="home-services__heading"
        eyebrow="Frentes de Cuidado"
        eyebrow-tone="brand"
        title="Serviços e Especialidades"
        title-id="services-title"
        description="Escuta e acolhimento em diferentes fases da vida, respeitando a singularidade, a história e o tempo de cada pessoa."
      />
      <div class="home-services__grid">
        <UiCard
          v-for="service in services"
          :key="service.id"
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
              :variant="service.featured ? 'brand' : 'ghost'"
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
