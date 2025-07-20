import { getBlogById } from '@/lib/fetchBlogs'
import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'

export const dynamic = 'force-dynamic'

export default async function BlogPage({
  params,
}: {
  params: { id: string }
}) {
  const blog = await getBlogById(params.id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return <BlogContentViewer {...blog} />
}
