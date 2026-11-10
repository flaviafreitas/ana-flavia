import {createClient} from '@sanity/client'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-29',
  devtools: { enabled: false },
  css: ['~/assets/scss/global.scss'],
  runtimeConfig: {
    public: {
      sanityProjectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '',
      sanityDataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
      sanityApiVersion: process.env.NUXT_PUBLIC_SANITY_API_VERSION || '2026-10-14',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Ana Flávia | Psicóloga Clínica',
      meta: [{ name: 'description', content: 'Psicoterapia com escuta psicanalítica, acolhimento e sigilo. Atendimento online em todo o Brasil e presencial com Ana Flávia.' }],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', '/studio'],
    },
    hooks: {
      async 'prerender:routes'(routes) {
        const projectId = process.env.NUXT_PUBLIC_SANITY_PROJECT_ID
        if (!projectId) return
        const client = createClient({
          projectId,
          dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
          apiVersion: process.env.NUXT_PUBLIC_SANITY_API_VERSION || '2026-10-14',
          useCdn: false,
          perspective: 'published',
        })
        const posts = await client.fetch<{slug: string}[]>(
          `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
        )
        for (const post of posts) routes.add(`/blog/${encodeURIComponent(post.slug)}`)
      },
    },
  },
  routeRules: {
    '/studio': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/studio/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    '/style-guide': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
  },
})
