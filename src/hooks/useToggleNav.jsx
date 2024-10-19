import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export const ScrollToTop = (showMenu, setShowMenu) => {
  const { pathname } = useLocation()

  useEffect(() => {
    showMenu && setShowMenu(false)
  }, [pathname])

  return null
}
