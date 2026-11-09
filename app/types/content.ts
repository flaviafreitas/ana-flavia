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
  category?: string
  readingTime?: number
  coverImage?: {
    url: string
    alt?: string
  }
  body?: PortableTextBlock[]
}
