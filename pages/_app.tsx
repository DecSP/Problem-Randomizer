import '../styles/globals.css'

import type { AppProps } from 'next/app'

import { ProblemContextProvider } from '@/context/problem'
import { AuthContextProvider } from '@/context/auth'
import { useEffect, useState } from 'react'
import { NProgressHandler } from '@/components/NProgressHandler'

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    <AuthContextProvider>
      <ProblemContextProvider>
        {!isSSR ? (
          <>
            <NProgressHandler />
            <Component {...pageProps} />
          </>
        ) : null}
      </ProblemContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
