export const HOME_QUERY = `*[_id == "homePage"][0]{eyebrow, title, introduction, body}`
export const HOME_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc)[0...3]{title, "slug": slug.current, category, readingTime, "coverImage": coverImage{alt, "url": asset->url}}`
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc){title, "slug": slug.current, excerpt, publishedAt}`
export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{title, body, publishedAt}`
