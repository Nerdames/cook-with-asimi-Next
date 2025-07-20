// lib/queries.ts

export const blogsQuery = (offset = 0, limit = 6, tag?: string) => {
  const tagFilter = tag && tag !== 'All'
    ? `&& "${tag}" in tags`
    : ''

  return `
    *[_type == "blog" ${tagFilter}]
      | order(date desc)
      [${offset}...${offset + limit}] {
        _id,
        title,
        date,
        author,
        category,
        description,
        thumbnail {
          asset -> {
            url
          }
        },
        tags
      }
  `
}

export const blogsCountQuery = (tag?: string) => {
  const tagFilter = tag && tag !== 'All'
    ? `&& "${tag}" in tags`
    : ''

  return `count(*[_type == "blog" ${tagFilter}])`
}


// src/sanity/queries/recipe.ts
import { groq } from 'next-sanity'
import { sanityClient } from './sanityClient'

export async function getRecipes() {
  const query = groq`
    *[_type == "recipe"] | order(_createdAt desc){
      _id,
      title,
      description,
      slug,
      mainImage {
        asset -> {
          url
        }
      },
      cookingTime,
      categories[]->{title}
    }
  `
  return await sanityClient.fetch(query)
}
