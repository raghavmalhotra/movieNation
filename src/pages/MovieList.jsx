import { Card, MovieCarousel } from '../components'
import { useEffect } from 'react'

import { useFetch } from '../hooks/useFetch'
export const MovieList = ({ apiPath, title }) => {
  const { data: movies } = useFetch(apiPath)

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <main className='min-h-screen'>
      {movies && movies.length > 0 && <MovieCarousel movies={movies} />}
      {title === 'Top Rated' && (
        <section className='max-w-3xl mx-auto py-7 px-4'>
          <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
            Explore a curated collection of the most critically acclaimed and
            beloved films of all time. These top-rated movies have captivated
            audiences and critics alike, earning their place in cinematic
            history through exceptional storytelling, unforgettable
            performances, and groundbreaking filmmaking. Dive in and discover
            timeless classics and modern masterpieces that continue to inspire
            and entertain.
          </p>
        </section>
      )}

      <section className='max-w-7xl mx-auto py-7'>
        <div className='flex justify-start flex-wrap other:justify-evenly'>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  )
}
