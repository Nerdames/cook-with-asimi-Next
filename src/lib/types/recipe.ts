// types/recipe.ts

import type { PortableTextBlock } from '@portabletext/types'

export interface RecipeCategory {
  _id: string
  title: string
}

export interface RecipeImage {
  asset: {
    url: string
  }
}

export interface Recipe {
  _id: string
  title: string
  description: string
  slug: {
    current: string
  }
  mainImage: RecipeImage
  cookingTime?: number
  body: PortableTextBlock[]
  categories: RecipeCategory[]
}
