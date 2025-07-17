import { sanityClient } from './sanityClient'
import { blogsQuery } from './queries'

export async function fetchAllBlogs() {
  return await sanityClient.fetch(blogsQuery)
}
