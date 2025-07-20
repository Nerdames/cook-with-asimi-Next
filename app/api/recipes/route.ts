import { NextResponse } from 'next/server'
import { fetchRecipes } from '@/lib/fetchRecipes'

export async function GET() {
  const recipes = await fetchRecipes()
  return NextResponse.json(recipes)
}
