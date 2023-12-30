// import { notification } from 'antd'
// import {
//   createContext,
//   ReactNode,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from 'react'

// import { ROUTES } from '@/constants/routes'
// import { client } from '@/lib/apis'
// import { UserData } from '@/lib/schema'
// import { useRouter } from 'next/router'

// interface AuthContextValues {
//   isAuthenticated: boolean
//   isAuthenticating: boolean
//   user?: UserData
//   login: ({
//     // eslint-disable-next-line no-unused-vars
//     username,
//     // eslint-disable-next-line no-unused-vars
//     password,
//   }: {
//     username: string
//     password: string
//   }) => Promise<any>
//   logout: () => void
//   revalidate: () => void
// }

// export const AUTH_TOKEN_KEY = 'problem-randomizer-token'
// export const LOGIN_REDIRECTION_KEY = 'problem-randomizer-redirection-key'

// const authContext = createContext<AuthContextValues | undefined>(undefined)

// const AuthContextProvider = ({ children }: { children: ReactNode }) => {
//   const [authToken, setAuthToken] = useState('')
//   const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)
//   const [user, setUser] = useState<UserData>()
//   const [fetchTrigger, setFetchTrigger] = useState(Date.now())
//   const { push } = useRouter()

//   const login = useCallback(
//     async ({ username, password }: { username: string; password: string }) => {
//       try {
//         const { data, message } = await client.login({
//           username,
//           password,
//         })
//         const token = data?.token

//         if (token) {
//           client.setAuthToken(token)
//           window.localStorage.setItem(AUTH_TOKEN_KEY, token)

//           const getUser = async () => {
//             try {
//               const resp = await client.getUser()
//               setUser(resp.data)
//             } catch (error: any) {
//               notification.error({
//                 message: error?.message || 'Could not fetch user',
//               })
//             }
//           }

//           if (token) {
//             client.setAuthToken(token)
//             setAuthToken(token)
//             await getUser()
//           } else {
//             setIsAuthenticating(false)
//           }
//         } else {
//           notification.error({ message })
//         }
//       } catch (error: any) {
//         console.error(error)
//         notification.error({ message: error?.message })
//       }
//     },
//     [],
//   )

//   const logout = () => {
//     setAuthToken('')
//     setUser(undefined)
//     client.clearAuthToken()
//     localStorage.removeItem(AUTH_TOKEN_KEY)
//     push(ROUTES.LOGIN)
//   }

//   const revalidate = () => setFetchTrigger(Date.now())

//   useEffect(() => {
//     if (!window.location.href.includes(ROUTES.LOGIN)) {
//       window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
//     }
//   }, [authToken])

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const resp = await client.getUser()
//         setUser(resp.data)
//       } catch (error: any) {
//         notification.error({
//           message: error?.message || 'Could not fetch user',
//         })
//       }
//     }

//     const authToken = localStorage.getItem(AUTH_TOKEN_KEY)

//     if (authToken) {
//       client.setAuthToken(authToken)
//       getUser()
//       setAuthToken(authToken)
//     } else {
//       logout()
//       setIsAuthenticating(false)
//     }
//   }, [fetchTrigger]) // eslint-disable-line

//   const isAuthenticated = Boolean(authToken) && !isAuthenticating

//   return (
//     <authContext.Provider
//       value={{
//         isAuthenticated,
//         isAuthenticating,
//         user,
//         login,
//         logout,
//         revalidate,
//       }}
//     >
//       {children}
//     </authContext.Provider>
//   )
// }

// const useAuthContext = () => useContext(authContext) as AuthContextValues

// export { AuthContextProvider, useAuthContext }

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
import { ROUTES } from '../constants/routes'

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
              setUser(userInfoRes.data)
            } else {
              notification.error({ message: 'Could not login' })
            }
          } catch (error) {
            notification.error({ message: error as any })
            console.error(error)
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
      const userInfoRes = await await client.getUser()

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
