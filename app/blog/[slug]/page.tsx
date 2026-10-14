import {PortableText} from '@portabletext/react'
import {notFound} from 'next/navigation'
import {sanityFetch} from '@/sanity/lib/client'
import {POST_QUERY} from '@/sanity/lib/queries'

export default async function PostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const post = await sanityFetch<{title: string; body?: never[]} | null>(POST_QUERY, {slug})
  if (!post) notFound()

  return (
    <article className="container section prose">
      <h1>{post.title}</h1>
      {post.body && <PortableText value={post.body} />}
    </article>
  )
}
