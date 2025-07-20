// lib/fetchRecipes.ts
import { groq } from 'next-sanity'
import { sanityClient } from './sanityClient'
import type { Recipe } from './types/recipe'

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

export async function fetchRecipes(): Promise<Recipe[]> {
  return await sanityClient.fetch(recipeQuery)
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  return await sanityClient.fetch(singleRecipeQuery, { id })
}
