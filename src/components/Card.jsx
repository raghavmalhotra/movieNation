import { Link } from 'react-router-dom'
import backupImg from '../assets/images/backupImg.jpg'

export const Card = ({ movie }) => {
  const img = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : backupImg
  return (
    <div>
      <div className='max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3'>
        <Link to={`/movie/${movie.id}`}>
          <img className='rounded-t-lg' src={img} alt='img' />
        </Link>
        <div className='p-5'>
          <Link to={`/movie/${movie.id}`}>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {movie.title}
            </h5>
          </Link>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  )
}
