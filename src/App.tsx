import { Breadcrumb } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Details, Home } from './Pages'
import BooksContextProvider from './store/books-context'

function App() {
  return (
    <BooksContextProvider>
      <Router>
        <div className='flex-1 flex-col justify-center px-32	'>
          <Breadcrumb />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/:id' Component={Details} />
          </Routes>
        </div>
      </Router>
    </BooksContextProvider>
  )
}

export default App
