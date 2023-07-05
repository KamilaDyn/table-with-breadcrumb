import { createContext, useReducer } from 'react'
import { Books, SingleBook } from '../interface'

interface BooksState {
  books: Books[]
  rowBook: SingleBook | null
  loading: boolean
  error: string | null
}

interface BooksContextProps extends BooksState {
  setBooks: (books: Books[]) => void
  setLoading: (isLoading: boolean) => void
  setRowBook: (book: SingleBook) => void
  setError: (error: string) => void
}

type BooksAction =
  | { type: 'SET_BOOKS'; payload: Books[] }
  | { type: 'SET_SINGLE_BOOK'; payload: SingleBook | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }

export const BooksContext = createContext<BooksContextProps>({
  books: [],
  rowBook: null,
  loading: true,
  error: null,
  setBooks: () => {},
  setLoading: () => {},
  setRowBook: () => {},
  setError: () => {},
})

function booksReducer(state: BooksState, action: BooksAction): BooksState {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload,
      }
    case 'SET_SINGLE_BOOK':
      return {
        ...state,
        rowBook: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

function BooksContextProvider({ children }: { children: JSX.Element }) {
  const [booksState, dispatch] = useReducer(booksReducer, {
    books: [],
    rowBook: null,
    loading: true,
    error: null,
  })

  function setBooks(books: Books[]) {
    dispatch({ type: 'SET_BOOKS', payload: books })
  }

  function setLoading(isLoading: boolean) {
    dispatch({ type: 'SET_LOADING', payload: isLoading })
  }

  function setRowBook(book: SingleBook) {
    dispatch({ type: 'SET_SINGLE_BOOK', payload: book })
  }

  function setError(error: string) {
    dispatch({ type: 'SET_ERROR', payload: error })
  }
  const value: BooksContextProps = {
    ...booksState,
    setBooks,
    setLoading,
    setRowBook,
    setError,
  }

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}

export default BooksContextProvider
