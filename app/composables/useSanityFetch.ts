import {createClient, type QueryParams} from '@sanity/client'

export function useSanityFetch<T>(key: string, query: string, params: QueryParams = {}) {
  const config = useRuntimeConfig().public
  return useAsyncData<T | null>(key, async () => {
    if (!config.sanityProjectId) return null
    const client = createClient({
      projectId: config.sanityProjectId,
      dataset: config.sanityDataset,
      apiVersion: config.sanityApiVersion,
      useCdn: true,
      perspective: 'published',
    })
    return client.fetch<T>(query, params)
  })
}
