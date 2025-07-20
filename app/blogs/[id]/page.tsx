// app/blogs/[id]/page.tsx

import { getBlogById } from '@/lib/fetchBlogs'
import BlogContentViewer from '@/components/BlogContentViewer/BlogContentViewer'

export const dynamic = 'force-dynamic'

// ✅ Correct type for `params` — as expected by Next.js
interface BlogPageProps {
  params: {
    id: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogById(params.id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return <BlogContentViewer {...blog} />
}
