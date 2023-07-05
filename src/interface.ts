export interface Books {
  id: string
  title: string
  author: string
  kind: string
  pageCount: number
  description: string
  publishedDate: string
  averageRating: number
}

export interface Image {
  smallThumbnail: string
  thumbnail: string
  medium: string
  large: string
}
export interface SingleBook extends Books {
  imageLinks: Image
  language: string
  format: { epub: string; pdf: string }
}
export interface Path {
  id: string
  title: string
}
