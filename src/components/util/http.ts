import axios from 'axios'

const baseUrl = 'https://www.googleapis.com/books/v1/volumes?q=""&projection=full&maxResults=40'

export async function fetchBooks() {
  const response = await axios.get(baseUrl)

  const books = []

  for (const key in response.data.items) {
    const { id, volumeInfo, accessInfo } = response.data.items[key]
    const expenseObj = {
      id: id,
      title: volumeInfo.title,
      author: volumeInfo?.authors?.join(', ') || 'no info',
      kind: volumeInfo?.categories?.join(', ') || 'no info',
      pageCount: volumeInfo.pageCount,
      description: volumeInfo?.description,
      publishedDate: volumeInfo.publishedDate,
      imageLinks: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail,
      language: volumeInfo.language,
      averageRating: volumeInfo.averageRating,
      format: {
        epub: accessInfo.epub.isAvailable ? 'epub' : '',
        pdf: accessInfo.pdf.isAvailable ? 'pdf' : '',
      },
    }

    books.push(expenseObj)
  }

  return books
}
