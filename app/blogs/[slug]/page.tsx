import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/fetchBlogs'
import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  /**
   * FIX: 
   * Changed !blog.slug.current to !blog.slug 
   * Most custom fetchers map 'slug.current' to a plain string 'slug'.
   */
  if (!blog || !blog.title || !blog.body || !blog.slug) {
    notFound()
  }

  return (
    <BlogContentViewer
      title={blog.title}
      date={blog.date}
      // Added optional chaining for nested Sanity references
      author={{ name: blog.author?.name || 'Samuel Asimi' }}
      category={{ title: blog.category?.title || 'General' }}
      description={blog.description}
      tags={blog.tags || []}
      thumbnail={blog.thumbnail}
      video={blog.video}
      body={blog.body}
      related={blog.related || []}
    />
  )
}