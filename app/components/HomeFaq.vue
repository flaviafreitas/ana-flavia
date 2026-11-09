<script setup lang="ts">
import { defaultFaq, type FaqItem } from '~/config/faq'
import { site } from '~/config/site'

withDefaults(defineProps<{ items?: FaqItem[] }>(), {
  items: () => defaultFaq,
})
</script>

<template>
  <section v-if="items.length" id="faq" class="home-faq" aria-labelledby="faq-title">
    <div class="site-shell home-faq__inner">
      <div class="home-faq__intro">
        <UiSectionHeading
          class="home-faq__heading"
          eyebrow="Dúvidas Comuns"
          eyebrow-tone="brand"
          title="Ficou com alguma dúvida sobre o atendimento?"
          title-id="faq-title"
          description="Se a sua dúvida não estiver respondida aqui, sinta-se à vontade para me mandar uma mensagem direta no WhatsApp ou Instagram!"
        />
        <div class="home-faq__contacts">
          <UiButton
            class="home-faq__whatsapp"
            :href="site.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
            <span class="site-visually-hidden">(abre em nova aba)</span>
          </UiButton>
          <a
            class="home-faq__instagram"
            :href="site.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/faq/dot.svg" width="8" height="8" alt="" aria-hidden="true" />
            @{{ site.instagram }} no Instagram
            <span class="site-visually-hidden">(abre em nova aba)</span>
          </a>
        </div>
        <div class="home-faq__availability">
          <strong>Atendimentos</strong>
          <span>Online (Brasil todo) + Presencial</span>
        </div>
      </div>
      <div class="home-faq__list">
        <UiAccordion
          v-for="item in items"
          :key="item.question"
          :question="item.question"
          :open="true"
        >
          <template #indicator>
            <img src="/images/faq/chevron-down.svg" width="16" height="16" alt="" />
          </template>
          <p>{{ item.answer }}</p>
        </UiAccordion>
      </div>
    </div>
  </section>
</template>
