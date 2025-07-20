// app/blogs/[id]/page.tsx

import { getBlogById } from '@/lib/fetchBlogs'
import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Params {
  id: string
}

interface PageProps {
  params: Params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Blog: ${params.id}`,
  }
}

export default async function BlogPage({ params }: PageProps) {
  const blog = await getBlogById(params.id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return <BlogContentViewer {...blog} />
}
