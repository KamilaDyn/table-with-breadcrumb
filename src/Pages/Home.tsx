import { useCallback, useContext, useEffect } from 'react'
import { Table } from '../components'
import { BooksContext } from '../store/books-context'
import { fetchBooks } from '../util/http'
import { Books } from '../interface'

export default function Home() {
  const { books, loading, error, setLoading, setBooks, setError } = useContext(BooksContext)

  const getBooks = useCallback(async () => {
    setLoading(true)

    try {
      setLoading(true)
      const booksArray: Books[] = await fetchBooks()
      setLoading(false)
      setBooks(booksArray)
    } catch (err: any) {
      setError('There was issue with getting data')
      setLoading(false)
    }
  }, [books])

  useEffect(() => {
    if (!books.length) {
      getBooks()
    } else {
      setLoading(false)
    }
  }, [])

  if (loading || error) {
    return (
      <div className='flex center my-24 h-screen w-screen		'>
        <p className='text-center'>Fetching data from server...</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    )
  }

  return (
    <>
      <div className='relative '>
        <div className='pb-24'>
          <header>
            <h1 className='text-red-900 text-base	md:text-lg lg:text-2xl'>
              Dynamic table with row selection and breadcrumb.
            </h1>
          </header>

          <>
            <div className='mx-auto max-w-7xl'>
              <Table />
            </div>
          </>
        </div>
        <footer className='py-2'>&copy; Kamila Dynysiuk</footer>

        {/* <div
      onClick={() => setModalOpen(false)}
      className={`w-full h-full absolute top-0 left-0 backdrop-opacity-10  bg-gray-900/10 none ${
        isModalOpen ? 'block' : 'hidden'
      } `}
    /> */}
      </div>
    </>
  )
}
