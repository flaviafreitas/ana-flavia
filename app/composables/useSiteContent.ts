import { computed, inject, type ComputedRef, type InjectionKey } from 'vue'
import { defaultSiteSettings, type SiteSettings } from '~/config/site'

export const siteContentKey: InjectionKey<ComputedRef<SiteSettings>> = Symbol('siteContent')

export function useSiteContent() {
  const content = inject(
    siteContentKey,
    computed(() => defaultSiteSettings),
  )
  return {
    site: computed(() => content.value.contact),
    header: computed(() => content.value.header),
    footer: computed(() => content.value.footer),
  }
}
