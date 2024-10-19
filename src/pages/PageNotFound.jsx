import { useEffect } from 'react'
import PageNotFoundImg from '../assets/404.png'
import { Link } from 'react-router-dom'
export const PageNotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found'
  })
  return (
    <section>
      <main className='min-h-screen bg-gray-50 dark:bg-gray-700 dark:text-white flex flex-col  top-1/2'>
        <h1 className='text-4xl dark:text-white text-center  font-bold pt-10'>
          Page Not Found
        </h1>
        <img
          className='max-sm:w-full w-1/3 sm  :w-3/4 max-w-4xl mx-auto mt-10 dark:invert '
          src={PageNotFoundImg}
          alt='Page Not Found'
        />

        <Link
          to='/'
          className='text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10 w-1/3 mx-auto'
        >
          Back to Home
        </Link>
      </main>
    </section>
  )
}
