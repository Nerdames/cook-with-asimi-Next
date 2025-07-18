import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Published Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      title: 'Video URL',
      type: 'url',
      description: 'Optional video URL to embed alongside the article.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Full content of the blog post, including instructions, details, and any relevant information.',
    }),
    defineField({
      name: 'related',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blog' }] }],
    }),
  ],
})
