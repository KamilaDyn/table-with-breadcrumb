import { HeaderCell, ListItem, TableCell } from './TableElements'
import { Books } from '../interface'
interface TableProps {
  books: Books[]
  selectRow: (rowData: Books | null) => void
  selectedRow: Books | null
}

function Table({ books, selectRow, selectedRow }: TableProps) {
  return (
    <>
      <div className='hidden lg:block shadow overflow-hidden border-b border-gray-200 sm:rounded-lg '>
        <table id='table' className='min-w-full border-b-2 divide-y divide-gray-700'>
          <thead className='bg-red-900'>
            <tr className='details-row'>
              <HeaderCell text='Title' />
              <HeaderCell text='Author' />
              <HeaderCell text='Kind' />
              <HeaderCell text='Pages' />
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-300 '>
            {books.map((book) => (
              <tr
                key={book.id}
                className={`cursor-pointer hover:bg-gray-300 focus:ring  pointer-events-auto ${
                  selectedRow === book ? 'bg-red-300' : 'odd:bg-white even:bg-slate-50'
                }`}
                onClick={() => selectRow(book)}
              >
                <TableCell text={book.title} />
                <TableCell text={book.author} />
                <TableCell text={book.kind} />
                <TableCell text={book.pageCount?.toString() || 'no info'} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='grid grid-ols-1 gap-4 lg:hidden'>
        {books.map((book) => (
          <div
            key={book.id}
            className={`space-y-3 p-4 border-solid border-2  shadow-sm shadow-red-500/50 rounded-lg m-2 sm:flex justify-between ${
              selectedRow === book ? 'bg-red-300' : 'bg-white'
            }`}
            onClick={() => selectRow(book)}
          >
            <div className=' items-center space-x-2 text-sm'>
              <ul className='py-1 text-lg	'>
                <ListItem spanText='Title' text={book.title} />
                <ListItem spanText='Author' text={book.author} />
                <ListItem spanText='Kind' text={book.kind} />
                <ListItem spanText='Pages' text={book.pageCount?.toString() || 'no info'} />
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Table
