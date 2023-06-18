export interface Books {
  id: string
  title: string
  author: string
  kind: string
  pageCount: number
  description: string
  publishedDate: string
  imageLinks: string
  language: string
  averageRating: number
  format: { epub: string; pdf: string }
}
export interface Path {
  id: string
  title: string
}
