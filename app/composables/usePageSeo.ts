import { toValue, type MaybeRefOrGetter } from 'vue'

export function usePageSeo(options: {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
  imageAlt?: MaybeRefOrGetter<string | undefined>
  type?: 'website' | 'article'
}) {
  const { site } = useSiteContent()
  useSeoMeta({
    title: () => toValue(options.title),
    description: () => toValue(options.description),
    ogTitle: () => toValue(options.title),
    ogDescription: () => toValue(options.description),
    ogType: options.type ?? 'website',
    ogSiteName: () => site.value.name,
    ogLocale: 'pt_BR',
    ogImage: () => toValue(options.image),
    ogImageAlt: () => toValue(options.imageAlt),
    twitterCard: () => toValue(options.image) ? 'summary_large_image' : 'summary',
    twitterTitle: () => toValue(options.title),
    twitterDescription: () => toValue(options.description),
    twitterImage: () => toValue(options.image),
    twitterImageAlt: () => toValue(options.imageAlt),
  })
}
