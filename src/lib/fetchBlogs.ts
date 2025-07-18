import { sanityClient } from './sanityClient'
import { groq } from 'next-sanity'

// Fetch all blogs
export async function fetchBlogs() {
  const query = groq`
    *[_type == "blog"]{
      _id,
      title,
      description,
      date,
      author->{name},
      category->{title},
      tags,
      thumbnail{asset->{url}},
      video
    }
  `
  return await sanityClient.fetch(query)
}

// Fetch a single blog by _id
export async function getBlogById(id: string) {
  const query = groq`
    *[_type == "blog" && _id == $id][0]{
      _id,
      title,
      description,
      date,
      author->{name},
      category->{title},
      tags,
      thumbnail{asset->{url}},
      video,
      body
    }
  `
  return await sanityClient.fetch(query, { id })
}

// ✅ Fetch recommended/random-like posts
export async function fetchRecommendedPosts(limit = 8) {
  const query = groq`
    *[_type == "blog"] | order(date desc)[0...${limit}]{
      _id,
      title,
      tags,
      thumbnail{asset->{url}}
    }
  `
  const posts = await sanityClient.fetch(query)

  // Shuffle posts to simulate randomness
  return posts.sort(() => 0.5 - Math.random())
}
