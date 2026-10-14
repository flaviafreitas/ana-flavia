import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/client'
import {POSTS_QUERY} from '@/sanity/lib/queries'

type Post = {title: string; slug: string; excerpt?: string; publishedAt?: string}

export default async function BlogPage() {
  const posts = await sanityFetch<Post[]>(POSTS_QUERY) ?? []

  return (
    <section className="container section">
      <h1>Blog</h1>
      {posts.length === 0 ? (
        <p>As publicações aparecerão aqui quando forem criadas no Sanity Studio.</p>
      ) : posts.map((post) => (
        <article key={post.slug}>
          <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
          {post.excerpt && <p>{post.excerpt}</p>}
        </article>
      ))}
    </section>
  )
}
