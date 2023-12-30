import '../styles/globals.css'

import type { AppProps } from 'next/app'

import { AuthContextProvider } from '../context/auth'
import { ProblemContextProvider } from '../context/problem'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProblemContextProvider>
        <Component {...pageProps} />
      </ProblemContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
