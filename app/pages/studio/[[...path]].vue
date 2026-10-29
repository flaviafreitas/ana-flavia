<script setup lang="ts">
definePageMeta({layout: false})
useHead({title: 'Painel | Ana Flavia', meta: [{name: 'robots', content: 'noindex, nofollow'}]})
const config = useRuntimeConfig().public
const container = useTemplateRef<HTMLDivElement>('studio')
const message = ref('Carregando painel…')
let unmount: (() => void) | undefined
let disposed = false

onMounted(async () => {
  if (!config.sanityProjectId) {
    message.value = 'Configure NUXT_PUBLIC_SANITY_PROJECT_ID no arquivo .env.local para acessar o Studio.'
    return
  }
  try {
    const [{createRoot}, {createElement}, {Studio}, {createStudioConfig}] = await Promise.all([
      import('react-dom/client'), import('react'), import('sanity'), import('~~/sanity.config'),
    ])
    if (disposed || !container.value) return
    const root = createRoot(container.value)
    unmount = () => root.unmount()
    root.render(createElement(Studio, {config: createStudioConfig(config.sanityProjectId, config.sanityDataset)}))
    message.value = ''
  } catch {
    message.value = 'Não foi possível abrir o painel. Recarregue a página para tentar novamente.'
  }
})
onBeforeUnmount(() => { disposed = true; unmount?.() })
</script>
<template>
  <div class="studio-page">
    <p v-if="message" role="status">{{ message }}</p>
    <div ref="studio" class="studio-root" />
  </div>
</template>
<style scoped>
.studio-page { position: fixed; inset: 0; background: white; }
.studio-page > p { padding: 2rem; }
.studio-root { height: 100dvh; overflow: auto; overscroll-behavior: none; }
</style>
