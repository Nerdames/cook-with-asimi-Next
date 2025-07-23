import { getBlogById } from '@/lib/fetchBlogs'
import { BlogContentViewer } from '@/components'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = await getBlogById(params.id)

  return {
    title: blog?.title ?? `Blog: ${params.id}`,
    description: blog?.excerpt ?? 'Read this blog on Cook with Asimi',
  }
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlogById(params.id)

  if (!blog) return <div>Blog not found</div>

  return <BlogContentViewer {...blog} />
}
