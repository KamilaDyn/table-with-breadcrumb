import { useLocation } from 'react-router-dom'
import { useCallback, useContext, useEffect } from 'react'
import { ListItem } from '../components/TableElements'
import { BooksContext } from '../store/books-context'
import { fetchBookById } from '../util/http'
import { Loading } from '../components'

export default function Details() {
  const location = useLocation()
  const pathName = location.pathname
  const { setRowBook, rowBook, setLoading, loading, setError } = useContext(BooksContext)

  const getSingleBook = useCallback(async () => {
    try {
      setLoading(true)
      const book = await fetchBookById(pathName)
      setRowBook(book)
    } catch (err) {
      setError('There was issue to fetch book details')
    } finally {
      setLoading(false)
    }
  }, [rowBook])

  useEffect(() => {
    if (rowBook?.id !== pathName.slice(1)) {
      getSingleBook()
    }
  }, [])

  if (loading) {
    return <Loading message='Loading data...' />
  }
  if (!loading && rowBook) {
    const { title, description, imageLinks, kind, language, publishedDate, format } = rowBook
    return (
      <div>
        <div className='flex bg-red-900 px-4 py-2 items-center justify-between pb-6'>
          <h2 className='xl lg:text-2xl font-bold pb-2 text-white text-center'>{title}</h2>
        </div>
        <div className='px-6 py-4'>
          <img
            className={`${description && 'float-right'} ml-4`}
            src={imageLinks.thumbnail}
            alt={title}
          />
          <ul>
            <ListItem spanText='Category' text={kind} />
            <ListItem spanText='Language' text={language} />
            <ListItem spanText='Published date' text={publishedDate || 'no info about date'} />
            <ListItem
              spanText='Format to read'
              text={
                format.pdf || format.epub ? Object.values(format).join(', ') : ' no information'
              }
            />
          </ul>
          <div>
            <p>
              <span className='text-red-900 text-lg font-bold'>Description: </span>
            </p>
            <div
              className='text-justify'
              dangerouslySetInnerHTML={{ __html: description || '<p>no info</p>' }}
            />
          </div>
        </div>
      </div>
    )
  }
  return <div>no book</div>
}
