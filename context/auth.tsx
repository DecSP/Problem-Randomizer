import { notification } from 'antd'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { ROUTES } from '@/constants/routes'
import { client } from '@/lib/apis'
import { UserData } from '@/lib/schema'

interface AuthContextValues {
  isAuthenticated: boolean
  isAuthenticating: boolean
  user?: UserData
  // eslint-disable-next-line no-unused-vars
  login: (username: string, password: string) => Promise<any>
  logout: () => void
  revalidate: () => void
}

export const AUTH_TOKEN_KEY = 'probrand-token'
export const LOGIN_REDIRECTION_KEY = 'probrand-redirection-key'

const authContext = createContext<AuthContextValues | undefined>(undefined)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)
  const [user, setUser] = useState<UserData>()
  const [fetchTrigger, setFetchTrigger] = useState(Date.now())
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = useCallback(async (username: string, password: string) => {
    try {
      const { data, message } = await client.login({
        username,
        password,
      })
      const token = data?.token

      if (token) {
        client.setAuthToken(token)
        window.localStorage.setItem(AUTH_TOKEN_KEY, token)
        setIsAuthenticated(true)
      } else {
        notification.error({ message })
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const logout = () => {
    setAuthToken('')
    setUser(undefined)
    client.clearAuthToken()
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  const revalidate = () => setFetchTrigger(Date.now())

  useEffect(() => {
    if (!window.location.href.includes(ROUTES.LOGIN)) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
    }
  }, [authToken])

  useEffect(() => {
    const getUser = async () => {
      try {
        const resp = await client.getUser()
        setUser(resp.data)
      } catch (error: any) {
        notification.error({
          message: error?.message || 'Could not fetch user',
        })
      }
    }

    const authToken = localStorage.getItem(AUTH_TOKEN_KEY)

    if (authToken) {
      client.setAuthToken(authToken)
      getUser()
      setAuthToken(authToken)
    } else {
      setIsAuthenticating(false)
    }
  }, [fetchTrigger]) // eslint-disable-line

  useEffect(() => {
    setIsAuthenticated(Boolean(authToken) && !isAuthenticating)
  }, [authToken, isAuthenticating])

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        user,
        login,
        logout,
        revalidate,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

const useAuthContext = () => useContext(authContext)

export { AuthContextProvider, useAuthContext }
