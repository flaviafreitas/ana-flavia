import {createClient} from 'next-sanity'
import {apiVersion, dataset, hasSanityConfig, projectId} from '../env'

const client = hasSanityConfig
  ? createClient({projectId, dataset, apiVersion, useCdn: true})
  : null

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null
  return client.fetch<T>(query, params, {next: {revalidate: 60}})
}
