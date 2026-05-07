import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/fetchBlogs'
import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

// 1. Update the type and await params in generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  return {
    title: blog?.title ?? `Blog: ${slug}`,
    description: blog?.description ?? 'Read this blog on Cook with Asimi',
  }
}

// 2. Update the type and await params in the main BlogPage component
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

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