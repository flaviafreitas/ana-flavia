<script setup lang="ts">
const { site, header } = useSiteContent()

const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)
function updateScrollState() {
  scrolled.value = window.scrollY > 12
}
onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', updateScrollState))
const menuButton = ref<HTMLButtonElement>()

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

function isCurrentLink(to: string) {
  return (
    route.fullPath === to || (!to.includes('#') && to !== '/' && route.path.startsWith(`${to}/`))
  )
}

function closeMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus()
}
</script>

<template>
  <header
    class="site-header"
    :class="{ 'site-header--scrolled': scrolled }"
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
          v-for="link in header.navigation"
          :key="link._key"
          :to="link.to"
          :class="{ 'is-current': isCurrentLink(link.to) }"
          :aria-current="isCurrentLink(link.to) ? (link.to.includes('#') ? 'location' : 'page') : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="site-header__actions">
        <UiButton
          class="site-header__appointment"
          size="sm"
          :href="site.whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="site-header__appointment-desktop">{{ header.appointmentLabel }}</span>
          <span class="site-header__appointment-mobile">{{ header.mobileAppointmentLabel }}</span>
          <span class="site-visually-hidden">pelo WhatsApp (abre em nova aba)</span>
        </UiButton>
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
    <Transition name="header-menu">
      <nav
        id="site-mobile-navigation"
        v-show="menuOpen"
        :inert="!menuOpen"
        class="site-header__mobile-nav"
        aria-label="Navegação principal no celular"
      >
        <div class="site-shell">
          <NuxtLink
            v-for="link in header.navigation"
            :key="link._key"
            :to="link.to"
            :aria-current="isCurrentLink(link.to) ? (link.to.includes('#') ? 'location' : 'page') : undefined"
            @click="menuOpen = false"
          >
            {{ link.label }}
            <span aria-hidden="true">↗</span>
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
