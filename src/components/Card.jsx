import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import backupImg from '../assets/images/backupImg.jpg'

export const Card = ({ movie }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showReadMoreButton, setShowReadMoreButton] = useState(false)
  const overviewRef = useRef(null)

  const img = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : backupImg

  useEffect(() => {
    if (overviewRef.current) {
      // Temporarily remove line-clamp to measure full scrollHeight
      overviewRef.current.classList.remove('line-clamp-3')
      const hasOverflow =
        overviewRef.current.scrollHeight > overviewRef.current.clientHeight
      // Re-apply line-clamp if not expanded
      if (!isExpanded) {
        overviewRef.current.classList.add('line-clamp-3')
      }
      setShowReadMoreButton(hasOverflow)
    }
  }, [movie.overview, isExpanded]) // Rerun when overview text changes or expansion state changes

  const toggleReadMore = (e) => {
    e.stopPropagation() // Prevent Link navigation
    setIsExpanded(!isExpanded)
  }

  return (
    <Link to={`/movie/${movie.id}`} className='block m-3 group'>
      {' '}
      {/* Make entire card a Link and a group for potential group-hover states */}
      <div className='max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl flex flex-col justify-between h-full'>
        <div>
          {' '}
          {/* Top section for image and text */}
          {/* Ensure image is contained and responsive, removed fixed height */}
          <img
            className='rounded-t-lg w-full object-contain'
            src={img}
            alt={movie.title}
          />
          <div className='p-5'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-500'>
              {movie.title}
            </h5>
            <p
              ref={overviewRef}
              className={`mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden ${
                isExpanded ? '' : 'line-clamp-3'
              }`}
            >
              {movie.overview}
            </p>
          </div>
        </div>

        {showReadMoreButton && (
          <div className='p-5 pt-0 mt-auto'>
            {' '}
            {/* Ensures button is at the bottom if text is short */}
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
