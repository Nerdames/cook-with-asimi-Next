import { getBlogById } from '@/lib/fetchBlogs'
import { BlogContentViewer } from '@/components'
import type { Metadata } from 'next'

// This forces dynamic rendering
export const dynamic = 'force-dynamic'

// Let Next.js infer types instead of manually defining PageProps
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const blog = await getBlogById(params.id)
  return {
    title: blog?.title ?? `Blog: ${params.id}`,
    description: blog?.description ?? 'Read this blog on Cook with Asimi',
  }
}

// Remove PageProps and use inline type annotation
export default async function BlogPage({
  params,
}: {
  params: { id: string }
}) {
  const blog = await getBlogById(params.id)

  if (!blog) return <div>Blog not found</div>

  return <BlogContentViewer {...blog} />
}
