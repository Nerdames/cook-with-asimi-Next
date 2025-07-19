import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'
import { getBlogById } from '@/lib/fetchBlogs'

// ✅ Inline the expected structure
export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlogById(params.id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return <BlogContentViewer {...blog} />
}
