import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from '@/context/auth'
import { useProblemContext } from '@/context/problem'
import { ROUTES } from '@/constants/routes'
import { Footer } from '../Footer'
import { Header } from '../Header'

export const Layout = ({
  children,
  requireAuth = true,
}: {
  children: ReactNode
  requireAuth?: boolean
}) => {
  const { isAuthenticated } = useAuthContext()
  const { setProblemIds, setProblems } = useProblemContext()
  const { push } = useRouter()

  useEffect(() => {
    if (!isAuthenticated && requireAuth) {
      setProblemIds([])
      setProblems([])
    }
  }, [isAuthenticated, requireAuth, setProblemIds, setProblems])

  useEffect(() => {
    if (!isAuthenticated && requireAuth) {
      push(ROUTES.LOGIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, requireAuth])

  useEffect(() => {
    if (
      !isAuthenticated &&
      !window?.location?.href?.includes(ROUTES.LOGIN) &&
      requireAuth
    ) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window?.location?.href)
    }
  }, [isAuthenticated, requireAuth])

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
