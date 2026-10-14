export const HOME_QUERY = `*[_id == "homePage"][0]{eyebrow, title, introduction, body}`
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc){title, "slug": slug.current, excerpt, publishedAt}`
export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{title, body, publishedAt}`
