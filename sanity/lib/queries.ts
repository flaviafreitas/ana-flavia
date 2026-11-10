export const HOME_QUERY = `*[_id == "homePage"][0]{eyebrow, title, introduction, body, tagline, hero, about, services, howWorks, testimonials, blog, faq, cta}`
export const HOME_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc)[0...3]{title, "slug": slug.current, category, readingTime, "coverImage": coverImage{alt, "url": asset->url}}`
const POST_SUMMARY_FIELDS = `title, "slug": slug.current, excerpt, publishedAt, category, readingTime, "coverImage": coverImage{alt, "url": asset->url}`
export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc){${POST_SUMMARY_FIELDS}}`
export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{${POST_SUMMARY_FIELDS}, body}`
export const RELATED_POSTS_QUERY = `*[_type == "post" && defined(slug.current) && slug.current != $slug] | order((category == $category) desc, publishedAt desc, _createdAt desc)[0...3]{${POST_SUMMARY_FIELDS}}`

export const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{contact, header, footer}`
