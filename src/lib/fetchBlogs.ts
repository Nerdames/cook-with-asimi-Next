// lib/fetchBlogs.ts
import { sanityClient } from './sanityClient'
import { groq } from 'next-sanity'
import type { Blog } from '@/lib/types/blog'

/**
 * Fetch all blogs (optionally supports category filter, search, or sort in future)
 */
export async function fetchBlogs(): Promise<Blog[]> {
  const query = groq`
    *[_type == "blog"] | order(date desc){
      _id,
      title,
      slug,
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

/**
 * Fetch a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const query = groq`
    *[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      date,
      author->{name},
      category->{title},
      tags,
      thumbnail{asset->{url}},
      video,
      body,
      related[]->{title, slug}
    }
  `
  try {
    const blog = await sanityClient.fetch(query, { slug })
    if (!blog) {
      console.warn(`No blog found with slug: ${slug}`)
      return null
    }
    return blog
  } catch (error) {
    console.error(`Error fetching blog with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch a few random recommended blog posts
 */
export async function fetchRecommendedPosts(limit = 8): Promise<Partial<Blog>[]> {
  const query = groq`
    *[_type == "blog"] | order(date desc)[0...${limit}]{
      _id,
      title,
      slug,
      tags,
      thumbnail{asset->{url}}
    }
  `
  const posts = await sanityClient.fetch(query)
  return posts.sort(() => 0.5 - Math.random())
}
