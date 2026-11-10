<script setup lang="ts">
import { SITE_SETTINGS_QUERY } from '~~/sanity/lib/queries'
import { resolveSiteSettings, type SiteSettingsData } from '~/config/site'
import { siteContentKey } from '~/composables/useSiteContent'

const { data: settings } = await useSanityFetch<SiteSettingsData>(
  'site-settings',
  SITE_SETTINGS_QUERY,
)
provide(
  siteContentKey,
  computed(() => resolveSiteSettings(settings.value)),
)
</script>

<template>
  <SiteHeader />
  <main id="conteudo-principal" tabindex="-1" > <slot /> </main>
  <SiteFooter />
</template>
