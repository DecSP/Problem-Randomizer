import '../styles/globals.css'

import type { AppProps } from 'next/app'

import { ProblemContextProvider } from '../context/problem'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProblemContextProvider>
      <Component {...pageProps} />
    </ProblemContextProvider>
  )
}

export default MyApp
