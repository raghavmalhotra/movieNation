import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import backupImg from '../assets/images/backupImg.jpg'

export const Card = ({ movie, size = 'normal' }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMoreButton, setShowReadMoreButton] = useState(false)
  const overviewRef = useRef(null)

  const imageWidth = size === 'small' ? 'w200' : 'w500'
  const img = movie.poster_path
    ? `https://image.tmdb.org/t/p/${imageWidth}/${movie.poster_path}`
    : backupImg

  useEffect(() => {
    if (size === 'normal' && overviewRef.current) {
      overviewRef.current.classList.remove('line-clamp-3')
      const hasOverflow =
        overviewRef.current.scrollHeight > overviewRef.current.clientHeight
      if (!isExpanded) {
        overviewRef.current.classList.add('line-clamp-3')
      }
      setShowReadMoreButton(hasOverflow)
    } else {
      setShowReadMoreButton(false)
    }
  }, [movie.overview, isExpanded, size])

  const toggleReadMore = (e) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const cardClasses =
    size === 'small'
      ? 'w-40 bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-md flex flex-col justify-between h-full'
      : 'max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl flex flex-col justify-between h-full'

  const titleClasses =
    size === 'small'
      ? 'mb-1 text-sm font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-500 line-clamp-2 text-center'
      : 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-500 text-center'

  const paddingClasses = size === 'small' ? 'p-2' : 'p-5'

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`block group ${size === 'small' ? 'm-1' : 'm-3'}`}
    >
      <div className={cardClasses}>
        <div>
          <img
            className='rounded-t-lg w-full object-cover'
            src={img}
            alt={movie.title}
          />
          <div className={paddingClasses}>
            <h5 className={titleClasses}>{movie.title}</h5>
            {size === 'normal' && (
              <p
                ref={overviewRef}
                className={`mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden ${
                  isExpanded ? '' : 'line-clamp-3'
                }`}
              >
                {movie.overview}
              </p>
            )}
          </div>
        </div>

        {size === 'normal' && showReadMoreButton && (
          <div className={`mt-auto ${paddingClasses} pt-0`}>
            <button
              onClick={toggleReadMore}
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-10 relative'
            >
              {isExpanded ? 'Read Less' : 'Read More'}
              <svg
                className={`w-3.5 h-3.5 ms-2 transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                {isExpanded ? (
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 9l6-6 6 6'
                  />
                ) : (
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                )}
              </svg>
            </button>
          </div>
        )}
      </div>
    </Link>
  )
}
