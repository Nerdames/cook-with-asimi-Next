import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'
import { getBlogById } from '@/lib/fetchBlogs'

interface PageProps {
  params: { id: string }
}

export default async function BlogPage({ params }: PageProps) {
  const blog = await getBlogById(params.id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return <BlogContentViewer {...blog} />
}
