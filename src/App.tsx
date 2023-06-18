import { useCallback, useEffect, useState } from 'react'
import { BookCard, Breadcrumb, Table } from './components'
import { fetchBooks } from './components/util/http'
import { Books, Path } from './interface'

function App() {
  const [booksDate, setBooksDate] = useState<Books[] | []>([])
  const [selectedRow, setSelectedRow] = useState<Books | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [path, setPath] = useState<Path[]>([])

  async function getBooks() {
    try {
      const books = await fetchBooks()
      setBooksDate(books)
    } catch (err) {
      alert(err)
    }
  }
  const handleRowSelection = (rowData: Books | null) => {
    setSelectedRow(rowData)
    setModalOpen(true)
  }

  useEffect(() => {
    getBooks()
  }, [])

  const generateBreadcrumbPath = useCallback(() => {
    if (selectedRow) {
      const breadcrumbItem = {
        id: selectedRow.id,
        title: selectedRow.title,
      }
      const isInBreadcrumb = path.some((path) => path.id === breadcrumbItem.id)
      if (!isInBreadcrumb) {
        setPath((prevPath) => [...prevPath, breadcrumbItem])
      }
    }
  }, [selectedRow])

  useEffect(() => {
    generateBreadcrumbPath()
  }, [selectedRow, generateBreadcrumbPath])

  return (
    <>
      <div
        className={`relative pt-12 px-4 lg:px-12   ${isModalOpen && 'overflow-hidden h-screen'} `}
      >
        <div className='pb-24'>
          <header>
            <h1 className='text-red-900 text-base	md:text-lg lg:text-2xl'>
              Dynamic table with row selection and breadcrumb.
            </h1>
          </header>
          <Breadcrumb path={path} setSelectedRow={setSelectedRow} booksDate={booksDate} />
          <div className='mx-auto max-w-7xl'>
            <Table books={booksDate} selectRow={handleRowSelection} selectedRow={selectedRow} />
            {isModalOpen && selectedRow && (
              <BookCard
                selectedBook={selectedRow}
                setModalOpen={setModalOpen}
                isModalOpen={isModalOpen}
              />
            )}
          </div>
        </div>
        <footer className='py-2'>&copy; Kamila Dynysiuk</footer>

        <div
          onClick={() => setModalOpen(false)}
          className={`w-full h-full absolute top-0 left-0 backdrop-opacity-10  bg-gray-900/10 none ${
            isModalOpen ? 'block' : 'hidden'
          } `}
        />
      </div>
    </>
  )
}

export default App
