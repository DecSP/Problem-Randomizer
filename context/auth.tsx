import { notification } from 'antd'
import {
  useCallback,
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from 'react'
import { client } from '@/lib/apis'
import { UserData } from '@/lib/schema'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'

interface AuthContextValues {
  isAuthenticated: boolean
  user?: UserData
  login: ({
    // eslint-disable-next-line no-unused-vars
    username,
    // eslint-disable-next-line no-unused-vars
    password,
  }: {
    username: string
    password: string
  }) => Promise<any>
  logout: () => void
  revalidate: () => void
}

const authContext = createContext<AuthContextValues | undefined>(undefined)

export const REFRESH_TOKEN_THRESHOLD_SECS = 9 * 60

export const AUTH_TOKEN_KEY = 'problem-randomizer-token'
export const LOGIN_REDIRECTION_KEY = 'problem-randomizer-redirection-key'

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState(() => {
    const value =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(AUTH_TOKEN_KEY)
        : undefined
    return value
  })

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

    const newAccessToken = window.localStorage.getItem(AUTH_TOKEN_KEY)
    if (newAccessToken) {
      setAuthToken(newAccessToken)
      client.setAuthToken(newAccessToken)

      try {
        getUser()
      } catch (error) {
        notification.error({ message: error as any })
        console.error(error)
      }
    }
  }, [])

  const [user, setUser] = useState<UserData>()
  const { push } = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  useEffect(() => setIsAuthenticated(Boolean(authToken)), [authToken])

  const login = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      try {
        const res = await client.login({ username, password })

        if (res?.data?.token) {
          window.localStorage.setItem(AUTH_TOKEN_KEY, res.data.token)
          setAuthToken(res.data.token)
          client.setAuthToken(res.data.token)

          try {
            const userInfoRes = await client.getUser()

            if (userInfoRes?.data) {
              notification.success({
                message: `Hi ${
                  userInfoRes?.data?.name || userInfoRes?.data.username
                }, great to see you!`,
              })
              setUser(userInfoRes.data)
            } else {
              notification.error({ message: 'Could not login' })
            }
          } catch (error) {
            notification.error({ message: error as any })
            console.error(error)
          }
        } else {
          if (res?.message) {
            notification.error({ message: res?.message })
          }
        }
      } catch (error) {
        notification.error({ message: error as any })
        console.error(error)
      }
    },
    [],
  )

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setUser(undefined)
    setAuthToken(undefined)
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    client.clearAuthToken()
    push(ROUTES.LOGIN)
  }, [push])

  const revalidate = async () => {
    try {
      const userInfoRes = await client.getUser()

      if (userInfoRes?.data) {
        setUser(userInfoRes.data)
      }
    } catch (error) {
      notification.error({ message: error as any })
      console.error(error)
    }
  }

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        revalidate,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

const useAuthContext = () => useContext(authContext) as AuthContextValues

export { AuthContextProvider, useAuthContext }
