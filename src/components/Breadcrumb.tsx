import { Books, Path } from '../interface'
import { Dispatch, SetStateAction, MouseEvent } from 'react'

interface BreadcrumbProps {
  path: Path[]
  booksDate: Books[]
  setSelectedRow: Dispatch<SetStateAction<Books | null>>
}

const Breadcrumb = ({ path, setSelectedRow, booksDate }: BreadcrumbProps) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const findBook = booksDate.find((book) => book.title === e.currentTarget.textContent)
    if (findBook) {
      setSelectedRow(findBook)
    }
  }

  return (
    <div className='my-4 w-full	'>
      <nav className='flex justify-center items-center flex-wrap cursor-pointer '>
        {path?.map((item, index) => (
          <div key={item.id} className='my-1'>
            <span
              id={item.id}
              onClick={handleClick}
              className='bg-red-900	text-sm	text-white rounded-md p-1 mx-2 '
            >
              {item.title}
            </span>
            {index < path.length - 1 && <span className='text-red-700 text-lg'>/</span>}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Breadcrumb
