import './App.css'
import { AllRoutes } from './routes/AllRoutes'
import { Header, Footer } from './components'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  return (
    <>
      <Header />
      <main key={location.pathname} className='animate-fadeInUp'>
        <AllRoutes />
      </main>
      <Footer />
    </>
  )
}

export default App
