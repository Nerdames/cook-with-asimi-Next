// lib/fetchRecipes.ts
import { groq } from 'next-sanity'
import { sanityClient } from './sanityClient'

const recipeQuery = groq`
  *[_type == "recipe"] | order(_createdAt desc){
    _id,
    title,
    description,
    slug,
    mainImage {
      asset -> { url }
    },
    cookingTime,
    body,
    categories[]->{
      _id,
      title
    }
  }
`

const singleRecipeQuery = groq`
  *[_type == "recipe" && _id == $id][0]{
    _id,
    title,
    description,
    slug,
    mainImage {
      asset -> { url }
    },
    cookingTime,
    body,
    categories[]->{
      _id,
      title
    }
  }
`

export async function fetchRecipes() {
  return await sanityClient.fetch(recipeQuery)
}

export async function getRecipeById(id: string) {
  return await sanityClient.fetch(singleRecipeQuery, { id })
}
