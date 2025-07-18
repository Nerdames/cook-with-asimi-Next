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
