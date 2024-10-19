import { Card } from '../components'
import { useFetch } from '../hooks/useFetch'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export const Search = ({ apiPath }) => {
  const [searchParams] = useSearchParams()
  const queryTerm = searchParams.get('q')
  const { data: movies } = useFetch(apiPath, queryTerm)

  useEffect(() => {
    document.title = ' Search- ' + queryTerm
  }, [queryTerm])

  return (
    <>
      <main className='min-h-screen '>
        <section>
          <p className='text-2xl p-2  text-gray-900 dark:text-white '>
            {movies.length === 0
              ? 'No Movies Found'
              : 'Search Results for "' + queryTerm + '"'}
          </p>
          {movies.length !== 0 ? null : (
            <Link
              to='/'
              className='text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600  dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-center w-1/3 mx-auto'
            >
              Back to Home
            </Link>
          )}
          {movies.length === 0 ? null : (
            <p className=' p-1 italic text-md  text-gray-900 dark:text-white'>
              {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'} Found
            </p>
          )}
        </section>
        <section className='max-w-7xl mx-auto py-7'>
          <div className='flex justify-start flex-wrap other:justify-evenly'>
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
