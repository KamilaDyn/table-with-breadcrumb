import { Books } from '../interface'
import { Dispatch, SetStateAction } from 'react'
import { ListItem } from './TableElements'
interface BookCardProps {
  selectedBook: Books
  setModalOpen: Dispatch<SetStateAction<boolean>>
  isModalOpen: boolean
}

function BookCard({ selectedBook, setModalOpen, isModalOpen }: BookCardProps) {
  const { description, imageLinks, language, kind, format, publishedDate, title } = selectedBook

  return (
    <>
      <div
        className={`z-10 max-h-full border-solid border-2 border-red-900 shadow-sm shadow-red-500/50 rounded-md  fixed top-1/2  -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white ${
          description ? 'w-11/12 lg:w-4/6' : 'w-11/12 lg:w-6/12'
        } ${isModalOpen ? 'block' : 'none'} `}
      >
        <div className='flex bg-red-900 px-4 py-2 items-center justify-between pb-6'>
          <h2 className='xl lg:text-2xl font-bold pb-2 text-white text-center'>{title}</h2>
          <div className='mx-1 lg:mx-4 cursor-pointer' onClick={() => setModalOpen(false)}>
            <i className='fa fa-close text-white text-2xl	'></i>
          </div>
        </div>
        <div className='px-6 py-4 overflow-auto max-h-96'>
          <img className={`float-right ${description && 'float-right'} ml-4`} src={imageLinks} />
          <ul>
            <ListItem spanText='Category' text={kind} />
            <ListItem spanText='Language' text={language} />
            <ListItem spanText='Published date' text={publishedDate || 'no info about date'} />
            <ListItem
              spanText='Format to read'
              text={
                format.pdf || format.epub
                  ? Object.values(format)
                      .map((el) => el)
                      .join(', ')
                  : ' no information'
              }
            />
          </ul>
          <p className='text-justify'>
            <span className='text-red-900 text-lg font-bold'>Description: </span>
            {description || 'no description'}
          </p>
        </div>
      </div>
    </>
  )
}

export default BookCard
