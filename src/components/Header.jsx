import logo from '../assets/logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('darkMode')) || true
  )

  // States for header visibility control
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0) // Using useRef to avoid re-renders on lastScrollY change
  const scrollThreshold = 100 // Only hide header after scrolling this much

  const Navigate = useNavigate()

  const { pathname } = useLocation()

  useEffect(() => {
    showMenu && setShowMenu(false)
  }, [pathname])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Effect for controlling header visibility on scroll
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY
      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > scrollThreshold
      ) {
        // Scrolling Down and past threshold
        setHeaderVisible(false)
      } else {
        // Scrolling Up or within threshold
        setHeaderVisible(true)
      }
      lastScrollY.current = currentScrollY // Update last scroll position
    }

    window.addEventListener('scroll', controlHeader)
    return () => {
      window.removeEventListener('scroll', controlHeader)
    }
  }, []) // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const activeClass =
    'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
  const inActiveClass =
    'block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'

  const handleSubmit = (e) => {
    e.preventDefault()
    const queyTerm = e.target.search.value
    e.target.reset()
    showMenu && setShowMenu(false)
    return Navigate(`/search?q=${queyTerm}`)
  }
  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-transform duration-300 ease-in-out
        ${
          headerVisible
            ? 'transform translate-y-0'
            : 'transform -translate-y-full'
        }
      `}
    >
      <nav className='bg-white border-gray-400 px-2 sm:px-4 py-2.5  dark:bg-gray-900 border-b-1'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link
            to='/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img src={logo} className='h-8' alt='MovieWhore Logo' />
            <span className='self-center text-1xl sm:text-3xl font-semibold whitespace-nowrap dark:text-white'>
              MovieNation
            </span>
          </Link>

          <div className='flex md:order-2'>
            <button
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 mr-1 transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95'
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                // Moon Icon (Dark mode is ON, shows icon to switch to Light mode)
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                  ></path>
                </svg>
              ) : (
                // Sun Icon (Dark mode is OFF, shows icon to switch to Dark mode)
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 3v1m0 16v1m8.66-15.66l-.707.707M4.04 19.96l-.707.707M21 12h-1M4 12H3m15.66 8.66l-.707-.707M4.707 4.707l-.707-.707'
                  ></path>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 5.5A6.5 6.5 0 1012 18.5 6.5 6.5 0 0012 5.5z'
                  ></path>
                </svg>
              )}
              <span className='sr-only'>Toggle dark mode</span>
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              type='button'
              data-collapse-toggle='navbar-search'
              aria-controls='navbar-search'
              aria-expanded='false'
              className='md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1 transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95'
            >
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
            <div className='relative hidden md:block'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
                <span className='sr-only'>Search icon</span>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  id='search-navbar'
                  className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search...'
                  name='search'
                />
              </form>
            </div>

            <button
              data-collapse-toggle='navbar-search'
              onClick={() => setShowMenu(!showMenu)}
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95'
              aria-controls='navbar-search'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between  w-full md:flex md:w-auto md:order-1 ${
              showMenu ? '' : 'hidden'
            }`}
            id='navbar-search'
          >
            <div className='relative mt-3 md:hidden'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  id='search-navbar'
                  className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search...'
                  name='search'
                />
              </form>
            </div>
            <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                  aria-current='page'
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/movies/popular'
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  Popular
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/movies/top_rated'
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  TopRated
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/movies/upcoming'
                  className={({ isActive }) =>
                    isActive ? activeClass : inActiveClass
                  }
                >
                  Upcoming
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
