<script setup lang="ts">
import { defaultHome, type HomeSections } from '~/config/home'
const { site } = useSiteContent()

withDefaults(defineProps<{ content?: HomeSections['howWorks'] }>(), {
  content: () => defaultHome.howWorks,
})
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
        :eyebrow="content.eyebrow"
        eyebrow-tone="brand"
        :title="content.title"
        title-id="how-works-title"
        :description="content.description"
      />
      <ol
        class="home-how-works__steps"
        role="list"
      >
        <li
          v-for="(step, index) in content.steps"
          :key="step._key"
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
        {{ content.button }}
        <span class="site-visually-hidden">pelo WhatsApp (abre em nova aba)</span>
      </UiButton>
    </div>
  </section>
</template>
