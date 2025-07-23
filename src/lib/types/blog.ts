// src/types/blog.ts
import type { PortableTextBlock } from '@portabletext/types'

export interface Blog {
  _id: string
  title: string
  description: string
  date: string
  author?: { name?: string }
  category?: { title?: string }
  tags: string[]
  thumbnail?: { asset: { url: string } }
  video?: string
  body: PortableTextBlock[]
  related?: { title: string; _id: string }[]
}
