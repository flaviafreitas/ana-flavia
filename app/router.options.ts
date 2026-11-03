import type { RouterConfig } from '@nuxt/schema'

export default {
  routes(routes) {
    const styleGuide = routes.find((route) => route.path === '/style-guide')

    if (styleGuide) {
      styleGuide.meta = { ...styleGuide.meta, layout: false }
    }

    return routes
  },
} satisfies RouterConfig
