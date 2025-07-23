// app/blogs/[id]/page.tsx
import { getBlogById } from '@/lib/fetchBlogs'
import {BlogContentViewer} from '@/components'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getBlogById(params.id)

  return {
    title: blog?.title ?? `Blog: ${params.id}`,
    description: blog?.description ?? 'Read this blog on Cook with Asimi',
  }
}

export default async function BlogPage({ params }: PageProps) {
  const blog = await getBlogById(params.id)

  if (!blog) return <div>Blog not found</div>

  return <BlogContentViewer {...blog} />
}
