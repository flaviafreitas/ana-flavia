export default defineNuxtConfig({
  compatibilityDate: '2026-10-29',
  devtools: {enabled: false},
  css: ['~/assets/scss/globals.scss'],
  runtimeConfig: {
    public: {
      sanityProjectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '',
      sanityDataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
      sanityApiVersion: process.env.NUXT_PUBLIC_SANITY_API_VERSION || '2026-10-14',
    },
  },
  app: {head: {
    htmlAttrs: {lang: 'pt-BR'},
    title: 'Ana Flavia',
    meta: [{name: 'description', content: 'Site institucional de Ana Flavia'}],
  }},
  routeRules: {'/studio': {ssr: false}, '/studio/**': {ssr: false}},
})
