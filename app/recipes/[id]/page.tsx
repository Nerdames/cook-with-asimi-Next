// app/recipes/[id]/page.tsx

import { getRecipeById } from '@/lib/fetchRecipes'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import styles from './RecipePage.module.css'
import type { RecipeCategory } from '@/lib/types/recipe'


export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id)

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return (
    <div className={styles.recipePage}>
      <h1 className={styles.title}>{recipe.title}</h1>

      {recipe.mainImage?.asset?.url && (
        <div className={styles.imageWrapper}>
          <Image
            src={recipe.mainImage.asset.url}
            alt={recipe.title}
            width={800}
            height={500}
            className={styles.image}
          />
        </div>
      )}

      <p className={styles.description}>{recipe.description}</p>

      {recipe.cookingTime && (
        <p className={styles.cookingTime}>⏱ {recipe.cookingTime} mins</p>
      )}

      {recipe.categories?.length > 0 && (
        <div className={styles.categories}>
          {recipe.categories.map((cat: RecipeCategory) => (
            <span key={cat._id} className={styles.tag}>{cat.title}</span>
          ))}
        </div>
      )}

      {recipe.body && (
        <div className={styles.body}>
          <PortableText value={recipe.body} />
        </div>
      )}
    </div>
  )
}
