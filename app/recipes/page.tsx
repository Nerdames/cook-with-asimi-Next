import { fetchRecipes } from '@/lib/fetchRecipes'
import RecipeCard from '@/components/RecipeCard/RecipeCard'
import type { RecipeCardProps } from '@/components/RecipeCard/RecipeCard'

export default async function RecipesPage() {
  const recipes: RecipeCardProps[] = await fetchRecipes()

  return (
    <div className="recipes-container">
      <h1>All Recipes</h1>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} {...recipe} />
        ))}
      </div>
    </div>
  )
}
