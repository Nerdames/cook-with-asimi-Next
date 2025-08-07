import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/fetchBlogs'
import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug)

  return {
    title: blog?.title ?? `Blog: ${params.slug}`,
    description: blog?.description ?? 'Read this blog on Cook with Asimi',
  }
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string }
}) {
  const blog = await getBlogBySlug(params.slug)

  // Guard against missing data
  if (!blog?.title || !blog?.slug?.current || !blog?.body) {
    notFound()
  }

  return (
    <BlogContentViewer
      title={blog.title}
      date={blog.date}
      author={{ name: blog.author?.name || 'Unknown Author' }}
      category={{ title: blog.category?.title || 'Uncategorized' }}
      description={blog.description}
      tags={blog.tags || []}
      thumbnail={blog.thumbnail}
      video={blog.video}
      body={blog.body}
      related={blog.related || []}
    />
  )
}
