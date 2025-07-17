export const blogsQuery = `*[_type == "blog"]{
  _id,
  title,
  date,
  author,
  category,
  description,
  thumbnail {
    asset->{
      url
    }
  },
  tags
}`
