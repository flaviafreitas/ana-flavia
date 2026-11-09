<script setup lang="ts">
import { site, siteNavigation } from '~/config/site'

const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement>()

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

function closeMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus()
}
</script>

<template>
  <header
    class="site-header"
    @keydown.esc="closeMenu"
  >
    <a
      class="site-header__skip"
      href="#conteudo-principal"
    >
      Pular para o conteúdo
    </a>
    <div class="site-shell site-header__inner">
      <SiteBrand />
      <nav
        class="site-header__desktop-nav"
        aria-label="Navegação principal"
      >
        <NuxtLink
          v-for="link in siteNavigation"
          :key="link.to"
          :to="link.to"
          :class="{ 'is-current': route.fullPath === link.to }"
          :aria-current="route.fullPath === link.to ? 'location' : 'false'"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="site-header__actions">
        <a
          class="btn btn--primary btn--sm site-header__appointment"
          :href="site.whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="site-header__appointment-desktop">Agendar consulta</span>
          <span class="site-header__appointment-mobile">Agendar</span>
          <span class="site-visually-hidden">pelo WhatsApp (abre em nova aba)</span>
        </a>
        <button
          ref="menuButton"
          class="site-header__menu-button"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="site-mobile-navigation"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="menuOpen = !menuOpen"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path
              v-if="menuOpen"
              d="m6 6 12 12M18 6 6 18"
            />
            <path
              v-else
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
    <nav
      id="site-mobile-navigation"
      v-show="menuOpen"
      class="site-header__mobile-nav"
      aria-label="Navegação principal no celular"
    >
      <div class="site-shell">
        <NuxtLink
          v-for="link in siteNavigation"
          :key="link.to"
          :to="link.to"
          @click="menuOpen = false"
        >
          {{ link.label }}
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
