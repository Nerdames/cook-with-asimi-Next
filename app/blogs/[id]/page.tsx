import { getBlogById } from '@/lib/fetchBlogs'
import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

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

export default async function BlogPage({
  params,
}: {
  params: { id: string }
}) {
  const blog = await getBlogById(params.id)

  if (
    !blog ||
    !blog.author?.name ||
    !blog.category?.title ||
    !blog.title ||
    !blog.date ||
    !blog.description ||
    !blog.body
  ) {
    return <div>Blog not found or missing required fields.</div>
  }

  return (
    <BlogContentViewer
      title={blog.title}
      date={blog.date}
      author={{ name: blog.author.name }}
      category={{ title: blog.category.title }}
      description={blog.description}
      tags={blog.tags || []}
      thumbnail={blog.thumbnail}
      video={blog.video}
      body={blog.body}
      related={blog.related || []}
    />
  )
}
