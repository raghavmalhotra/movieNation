import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import backupImg from '../assets/images/backupImg.jpg'
import { Card } from '../components'

export const MovieDetail = () => {
  const { id } = useParams()
  const [movieDetail, setMovieDetail] = useState(null)
  const [animatePoster, setAnimatePoster] = useState(false)
  const [similarMovies, setSimilarMovies] = useState([])
  const [loadingSimilarMovies, setLoadingSimilarMovies] = useState(false)
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [loadingRecommendedMovies, setLoadingRecommendedMovies] =
    useState(false)

  const img = movieDetail?.poster_path
    ? `https://image.tmdb.org/t/p/original/${movieDetail?.poster_path}`
    : backupImg

  useEffect(() => {
    const fetchMovie = async () => {
      setAnimatePoster(false)
      setMovieDetail(null)
      setSimilarMovies([])
      setLoadingSimilarMovies(true)
      setRecommendedMovies([])
      setLoadingRecommendedMovies(true)

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        )
        if (!response.ok) throw new Error('Failed to fetch movie details')
        const json = await response.json()
        setMovieDetail(json)
        if (json?.poster_path) {
          setAnimatePoster(true)
        } else {
          setAnimatePoster(true)
        }
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    }
    fetchMovie()
  }, [id])

  useEffect(() => {
    if (!id) return

    const fetchSimilarMovies = async () => {
      setLoadingSimilarMovies(true)
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        )
        if (!response.ok) throw new Error('Failed to fetch similar movies')
        const json = await response.json()
        setSimilarMovies(json.results || [])
      } catch (error) {
        console.error('Error fetching similar movies:', error)
        setSimilarMovies([])
      } finally {
        setLoadingSimilarMovies(false)
      }
    }

    fetchSimilarMovies()
  }, [id])

  useEffect(() => {
    if (!id) return

    const fetchRecommendedMovies = async () => {
      setLoadingRecommendedMovies(true)
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
            import.meta.env.VITE_API_KEY
          }`
        )
        if (!response.ok) throw new Error('Failed to fetch recommended movies')
        const json = await response.json()
        setRecommendedMovies(json.results || [])
      } catch (error) {
        console.error('Error fetching recommended movies:', error)
        setRecommendedMovies([])
      } finally {
        setLoadingRecommendedMovies(false)
      }
    }

    fetchRecommendedMovies()
  }, [id])

  useEffect(() => {
    if (movieDetail?.title) {
      document.title = movieDetail.title
    } else {
      document.title = 'Movie Detail'
    }
  }, [movieDetail])

  if (!movieDetail) {
    return (
      <main className='min-h-screen flex justify-center items-center'>
        <p className='text-2xl text-gray-700 dark:text-gray-200'>
          Loading movie details...
        </p>
      </main>
    )
  }

  return (
    <main className='pb-10'>
      <section className='flex justify-around flex-wrap py-5 px-4'>
        <div className='max-w-md lg:max-w-sm xl:max-w-md w-full'>
          <img
            className={`rounded-lg shadow-xl w-full h-auto transform origin-center ${
              animatePoster
                ? 'animate-tvTurnOn opacity-100'
                : 'opacity-0 scale-y-0'
            }`}
            src={img}
            alt={movieDetail?.title}
            onLoad={() => !animatePoster && setAnimatePoster(true)}
          />
        </div>
        <div className='md:my-5 sm:my-6 lg:my-0 max-w-2xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 p-6 text-gray-700 text-lg dark:text-gray-200 w-full lg:w-auto mt-5 lg:mt-0'>
          <h1 className='text-4xl font-bold my-3 text-center lg:text-left'>
            {movieDetail?.title}
          </h1>
          <p className='my-3'>{movieDetail?.overview}</p>
          {movieDetail?.genres?.length > 0 && (
            <p className='my-7 flex flex-wrap gap-2'>
              {movieDetail?.genres?.map((genre) => (
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
              {movieDetail?.vote_average?.toFixed(1)}
            </p>
            <span className='w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400'></span>
            <p className='text-sm font-medium text-gray-900 italic dark:text-white'>
              {movieDetail?.vote_count} votes
            </p>
          </div>
          <p className='my-3'>
            <span className='text-gray-900 dark:text-white mr-2 font-bold'>
              Runtime:
            </span>
            <span>
              {movieDetail?.runtime
                ? `${Math.floor(movieDetail.runtime / 60)}h ${
                    movieDetail.runtime % 60
                  }m`
                : 'N/A'}
            </span>
          </p>

          <p className='my-3'>
            <span className='text-gray-900 dark:text-white mr-2 font-bold'>
              Release Date:
            </span>
            <span>
              {movieDetail?.release_date
                ? new Date(movieDetail.release_date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </span>
          </p>

          {movieDetail?.budget > 0 && (
            <p className='my-3'>
              <span className='text-gray-900 dark:text-white mr-2 font-bold'>
                Budget:
              </span>
              <span> ${movieDetail?.budget?.toLocaleString()}</span>
            </p>
          )}

          {movieDetail?.revenue > 0 && (
            <p className='my-3'>
              <span className='text-gray-900 dark:text-white mr-2 font-bold'>
                Revenue:
              </span>
              <span> ${movieDetail?.revenue?.toLocaleString()}</span>
            </p>
          )}

          <p className='my-3'>
            <span className='text-gray-900 dark:text-white mr-2 font-bold'>
              Status:
            </span>
            <span> {movieDetail?.status || 'N/A'}</span>
          </p>

          {movieDetail?.tagline && (
            <p className='my-3'>
              <span className='text-gray-900 dark:text-white mr-2 font-bold'>
                Tagline:
              </span>
              <span> {movieDetail.tagline}</span>
            </p>
          )}

          <p className='my-3'>
            <span className='text-gray-900 dark:text-white mr-2 font-bold'>
              IMDB:
            </span>
            <span>
              {movieDetail?.imdb_id ? (
                <a
                  href={`https://www.imdb.com/title/${movieDetail.imdb_id}`}
                  target='_blank'
                  rel='noreferrer'
                  className='hover:underline'
                >
                  {movieDetail.imdb_id}
                </a>
              ) : (
                'N/A'
              )}
            </span>
          </p>
        </div>
      </section>

      {movieDetail && (
        <section className='my-12 px-4'>
          <h2 className='text-3xl font-bold mb-8 text-center dark:text-white'>
            Similar Movies
          </h2>
          {loadingSimilarMovies && (
            <div className='flex justify-center'>
              <p className='text-xl text-gray-700 dark:text-gray-200'>
                Loading similar movies...
              </p>
            </div>
          )}
          {!loadingSimilarMovies && similarMovies.length > 0 && (
            <div className='flex flex-wrap justify-center gap-4 md:gap-6'>
              {similarMovies.slice(0, 6).map((movie) => (
                <Card key={movie.id} movie={movie} size='small' />
              ))}
            </div>
          )}
          {!loadingSimilarMovies && similarMovies.length === 0 && (
            <p className='text-xl text-center text-gray-700 dark:text-gray-200'>
              No similar movies found.
            </p>
          )}
        </section>
      )}

      {/* Recommended Movies Section */}
      {movieDetail && recommendedMovies.length > 0 && (
        <section className='my-12 px-4'>
          <h2 className='text-3xl font-bold mb-8 text-center dark:text-white'>
            Recommended For You
          </h2>
          {loadingRecommendedMovies && (
            <div className='flex justify-center'>
              <p className='text-xl text-gray-700 dark:text-gray-200'>
                Loading recommendations...
              </p>
            </div>
          )}
          {!loadingRecommendedMovies && (
            <div className='flex flex-wrap justify-center gap-4 md:gap-6'>
              {recommendedMovies.slice(0, 6).map((movie) => (
                <Card key={movie.id} movie={movie} size='small' />
              ))}
            </div>
          )}
        </section>
      )}
      {/* Show message if no recommendations and not loading */}
      {movieDetail &&
        !loadingRecommendedMovies &&
        recommendedMovies.length === 0 && (
          <section className='my-12 px-4'>
            <p className='text-xl text-center text-gray-700 dark:text-gray-200'>
              No recommendations found for this movie yet.
            </p>
          </section>
        )}
    </main>
  )
}
