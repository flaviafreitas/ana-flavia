import type {PortableTextBlock} from '@portabletext/types'

export interface HomeData {
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
  body?: PortableTextBlock[]
}
