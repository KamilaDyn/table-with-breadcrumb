import axios from 'axios'

const baseUrl = 'https://www.googleapis.com/books/v1/volumes'

export async function fetchBookById(getId: string) {
  const response = await axios.get(`${baseUrl}${getId}`).then((response) => response.data)

  const { id, volumeInfo, accessInfo } = response
  const book = {
    id: id,
    title: volumeInfo?.title,
    author: volumeInfo?.authors?.join(', ') || 'no info',
    kind: volumeInfo?.categories?.join(', ') || 'no info',
    pageCount: volumeInfo.pageCount,
    description: volumeInfo?.description,
    publishedDate: volumeInfo.publishedDate,
    imageLinks: {
      smallThumbnail: volumeInfo.imageLinks?.thumbnail || '',
      thumbnail: volumeInfo.imageLinks?.smallThumbnail || '',
      medium: volumeInfo.imageLinks?.medium || '',
      large: volumeInfo.imageLinks?.large || '',
    },
    language: volumeInfo.language,
    averageRating: volumeInfo.averageRating,
    format: {
      epub: accessInfo.epub.isAvailable ? 'epub' : '',
      pdf: accessInfo.pdf.isAvailable ? 'pdf' : '',
    },
  }
  return book
}

export async function fetchBooks() {
  const response = await axios.get(`${baseUrl}?q=""&projection=full&maxResults=40`)
  const books = []

  for (const key in response.data.items) {
    const { id, volumeInfo } = response.data.items[key]
    const expenseObj = {
      id: id,
      title: volumeInfo.title,
      author: volumeInfo?.authors?.join(', ') || 'no info',
      kind: volumeInfo?.categories?.join(', ') || 'no info',
      pageCount: volumeInfo.pageCount,
      description: volumeInfo?.description,
      publishedDate: volumeInfo.publishedDate,
      imageLinks: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail,
      averageRating: volumeInfo.averageRating,
    }

    books.push(expenseObj)
  }

  return books
}
