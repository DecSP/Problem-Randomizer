import { ReactNode, useEffect } from 'react'
import { useAuthContext } from '@/context/auth'
import { Footer } from '../Footer'
import { Header } from '../Header'

export const Layout = ({ children }: { children: ReactNode }) => {
  const { logout, isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated) {
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : null}
    </>
  )
}
