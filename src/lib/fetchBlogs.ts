// lib/fetchBlogs.ts
import { sanityClient } from './sanityClient'
import { groq } from 'next-sanity'
import type { Blog } from '@/lib/types/blog'

// Get all blogs
export async function fetchBlogs(): Promise<Blog[]> {
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

// Get one blog by ID
export async function getBlogById(id: string): Promise<Blog | null> {
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
      body,
      related[]->{title, _id}
    }
  `
  return await sanityClient.fetch(query, { id })
}

// Fetch a few recommended posts
export async function fetchRecommendedPosts(limit = 8): Promise<Partial<Blog>[]> {
  const query = groq`
    *[_type == "blog"] | order(date desc)[0...${limit}]{
      _id,
      title,
      tags,
      thumbnail{asset->{url}}
    }
  `
  const posts = await sanityClient.fetch(query)
  return posts.sort(() => 0.5 - Math.random())
}
