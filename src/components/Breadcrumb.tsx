import { useContext, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BooksContext } from '../store/books-context'

const Breadcrumb = () => {
  const location = useLocation()
  const { rowBook, loading } = useContext(BooksContext)

  const crumbs = useMemo(() => {
    let currentLink = ''

    return location.pathname
      .split('/')
      .filter((crumb) => crumb !== '')
      .map((crumb) => {
        const bookName = crumb === rowBook?.id ? rowBook?.title : crumb
        currentLink += `/${crumb}`
        return (
          <div key={crumb}>
            <Link to={currentLink}> / {bookName} </Link>
          </div>
        )
      })
  }, [location.pathname, rowBook?.id, rowBook?.title])
  if (loading) {
    return null
  }
  return (
    <div className='flex my-4 w-full	'>
      <Link to='/'>Home </Link>
      {crumbs}
    </div>
  )
}

export default Breadcrumb
