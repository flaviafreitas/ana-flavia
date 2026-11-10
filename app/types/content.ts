import type { PortableTextBlock } from '@portabletext/types'

import type { HomeSections } from '~/config/home'

export type HomeData = { [K in keyof HomeSections]?: Partial<HomeSections[K]> } & {
  tagline?: string
  eyebrow?: string
  title?: string
  introduction?: string
  body?: PortableTextBlock[]
}
export interface Post {
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  updatedAt?: string
  category?: string
  readingTime?: number
  coverImage?: {
    url: string
    alt?: string
  }
  body?: PortableTextBlock[]
}
