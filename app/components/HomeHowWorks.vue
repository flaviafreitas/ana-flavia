<script setup lang="ts">
import { site } from '~/config/site'

const steps = [
  {
    title: 'Primeiro Contato',
    description:
      'Você entra em contato pelo WhatsApp, tiramos dúvidas sobre horários e valores, e agendamos um horário inicial.',
    detail: 'WhatsApp',
  },
  {
    title: 'Entrevista Inicial',
    description:
      'Uma primeira conversa livre para você compartilhar o que te traz aqui, entender suas expectativas e alinhar o método.',
    detail: 'Sessão de 50min',
    accent: true,
  },
  {
    title: 'Sessões Regulares',
    description:
      'Sessões semanais focadas na fala livre. Sem roteiro fixo: você traz o que vier à mente, e trabalhamos juntos na escuta de si.',
    detail: 'Semanalmente',
  },
]
</script>

<template>
  <section
    id="como-funciona"
    class="home-how-works"
    aria-labelledby="how-works-title"
  >
    <div class="site-shell home-how-works__inner">
      <UiSectionHeading
        class="home-how-works__heading"
        eyebrow="O Caminho"
        eyebrow-tone="brand"
        title="Como funciona a psicoterapia?"
        title-id="how-works-title"
        description="Um processo simples e acolhedor para dar o primeiro passo em direção ao seu bem-estar."
      />
      <ol
        class="home-how-works__steps"
        role="list"
      >
        <li
          v-for="(step, index) in steps"
          :key="step.title"
        >
          <UiCard
            :class="['how-works-step', { 'how-works-step--accent': step.accent }]"
            :title="step.title"
            :description="step.description"
          >
            <template #icon>{{ String(index + 1).padStart(2, '0') }}</template>
            <div class="how-works-step__meta">
              <span
                class="how-works-step__divider"
                aria-hidden="true"
              >
                <img
                  src="/images/how-works/divider.svg"
                  width="56"
                  height="2"
                  alt=""
                />
              </span>
              <span class="how-works-step__detail">
                <img
                  src="/images/hero/dot.svg"
                  width="8"
                  height="8"
                  alt=""
                  aria-hidden="true"
                />
                {{ step.detail }}
              </span>
            </div>
          </UiCard>
        </li>
      </ol>
      <UiButton
        class="home-how-works__action"
        :href="site.whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Quero começar agora
        <span class="site-visually-hidden">pelo WhatsApp (abre em nova aba)</span>
      </UiButton>
    </div>
  </section>
</template>
