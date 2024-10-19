import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import backupImg from '../assets/images/backupImg.jpg'
export const MovieDetail = () => {
  const { id } = useParams()

  const [MovieDetail, setMovieDetail] = useState()

  const img = MovieDetail?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${MovieDetail?.poster_path}}`
    : backupImg

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      )
      const json = await response.json()
      setMovieDetail(json)
    }
    fetchMovie()
  }, [id])

  useEffect(() => {
    document.title = MovieDetail?.title
  }, [MovieDetail])

  return (
    <main>
      <section className='flex justify-around flex-wrap py-5'>
        <div className='max-w-sm '>
          <img className='rounded-lg' src={img} alt={MovieDetail?.title} />
        </div>
        <div className=' md:my-5 sm:my-6  lg:my-0 max-w-2xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700  p-6  text-gray-700 text-lg dark:text-gray-200'>
          <h1 className='text-4xl font-bold my-3 text-center lg:text-left'>
            {MovieDetail?.title}
          </h1>
          <p className='my-3'>{MovieDetail?.overview}</p>
          {MovieDetail?.genres?.length > 0 && (
            <p className='my-7 flex flex-wrap gap-2'>
              {MovieDetail?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className='mr-2 border border-gray-400 rounded dark:border-gray-600 p-2'
                >
                  {genre.name}
                </span>
              ))}
            </p>
          )}

          <div className='flex items-center'>
            <svg
              className='w-4 h-4 text-yellow-300 me-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <p className='ms-2 text-sm font-bold text-gray-900 dark:text-white'>
              {MovieDetail?.vote_average.toFixed(1)}
            </p>
            <span className='w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400'></span>
            <p className='text-sm font-medium text-gray-900 italic dark:text-white'>
              {MovieDetail?.vote_count} votes
            </p>
          </div>
          <p className='my-3'>
            <span className='text-gray-900 dark:text-white mr-2 font-bold'>
              {' '}
              Runtime:
            </span>
            <span> {MovieDetail?.runtime} minutes</span>
          </p>
          <p className='my-3'>
            <span className='text-gray-900 dark:text-white mr-2 font-bold'>
              {' '}
              Release Date:
            </span>
            <span>
              {new Date(MovieDetail?.release_date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>

          {MovieDetail?.budget > 0 && (
            <p className='my-3'>
              <span className='text-gray-900 dark:text-white mr-2 font-bold'>
                {' '}
                Budget:
              </span>
              <span> ${MovieDetail?.budget?.toLocaleString()}</span>
            </p>
          )}

          {MovieDetail?.revenue > 0 && (
            <p className='my-3'>
              <span className='text-gray-900 dark:text-white mr-2 font-bold'>
                {' '}
                Revenue:
              </span>
              <span> ${MovieDetail?.revenue?.toLocaleString()}</span>
            </p>
          )}

          <p className='my-3'>
            <span className='text-gray-900 dark:text-white mr-2 font-bold'>
              {' '}
              Status:
            </span>
            <span> {MovieDetail?.status}</span>
          </p>

          {MovieDetail?.tagline && (
            <p className='my-3'>
              <span className='text-gray-900 dark:text-white mr-2 font-bold'>
                {' '}
                Tagline:
              </span>
              <span> {MovieDetail?.tagline}</span>
            </p>
          )}

          <p className='my-3'>
            <span className='text-gray-900 dark:text-white mr-2 font-bold'>
              {' '}
              IMDB:
            </span>
            <span>
              <a
                href={`https://www.imdb.com/title/${MovieDetail?.imdb_id}`}
                target='_blank'
                rel='noreferrer'
              >
                {MovieDetail?.imdb_id}
              </a>
            </span>
          </p>
        </div>
      </section>
    </main>
  )
}
