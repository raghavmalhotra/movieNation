import React from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

import backupImg from '../assets/images/backup_landscape.jpg'

export const MovieCarousel = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return null // Don't render anything if there are no movies
  }

  // Create a landscape backup image or use a generic one if you don't have specific landscape backups.
  // For now, I'll reuse the existing backupImg, but ideally, it should be landscape-oriented.
  const landscapeBackupImg = backupImg

  return (
    <div className='pt-8 pb-4 sm:pb-8 mx-auto max-w-full group/carousel'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        className='movie-carousel-landscape pb-6 sm:pb-12'
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {movies.slice(0, 10).map((movie) => {
          const backdrop = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`
            : landscapeBackupImg
          return (
            <SwiperSlide
              key={movie.id}
              className='carousel-slide-landscape relative overflow-hidden rounded-lg shadow-lg h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]'
            >
              <Link
                to={`/movie/${movie.id}`}
                className='block w-full h-full group'
              >
                <img
                  src={backdrop}
                  alt={movie.title}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>
                <div className='absolute bottom-0 left-0 right-0 p-3 md:p-4 flex flex-col items-center'>
                  <h3 className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold truncate group-hover:text-blue-300 transition-colors text-center mb-1 md:mb-2 max-w-full'>
                    {movie.title}
                  </h3>
                  {movie.tagline && (
                    <p className='text-gray-300 text-xs sm:text-sm italic truncate text-center max-w-full'>
                      {movie.tagline}
                    </p>
                  )}
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
        <div className='swiper-button-prev-custom absolute top-1/2 left-2 sm:left-4 z-10 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 rounded-full cursor-pointer transition-opacity opacity-0 group-hover/carousel:opacity-100'>
          <svg
            className='w-6 h-6 sm:w-8 sm:h-8 text-white'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M15 19l-7-7 7-7'></path>
          </svg>
        </div>
        <div className='swiper-button-next-custom absolute top-1/2 right-2 sm:right-4 z-10 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/60 rounded-full cursor-pointer transition-opacity opacity-0 group-hover/carousel:opacity-100'>
          <svg
            className='w-6 h-6 sm:w-8 sm:h-8 text-white'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M9 5l7 7-7 7'></path>
          </svg>
        </div>
      </Swiper>
      <div className='swiper-pagination-custom text-center pt-4 hidden sm:block'></div>
    </div>
  )
}
