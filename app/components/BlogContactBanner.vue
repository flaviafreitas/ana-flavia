<script setup lang="ts">
const { site } = useSiteContent()
</script>

<template>
  <aside class="journal-contact" aria-labelledby="journal-contact-title">
    <div class="site-shell journal-contact__inner">
      <div>
        <UiBadge>Da leitura à escuta</UiBadge>
        <h2 id="journal-contact-title">Algumas questões merecem<br />um espaço só seu.</h2>
        <p>A terapia pode ser um lugar para acolher o que essas reflexões despertam em você.</p>
      </div>
      <UiButton :href="site.whatsappUrl" target="_blank" rel="noopener noreferrer">Vamos conversar <span aria-hidden="true">↗</span><span class="site-visually-hidden"> pelo WhatsApp (abre em nova aba)</span></UiButton>
    </div>
  </aside>
</template>
