import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Footer } from '@/components/Footer'
import { AuthFormWrapper } from '@/components/pages/auth/AuthFormWrapper'
import { SignUpForm } from '@/components/pages/auth/SignUpForm'
import { useRouter } from 'next/router'
import { ROUTES } from '@/constants/routes'
import { useAuthContext, LOGIN_REDIRECTION_KEY } from '@/context/auth'

const SignUpPage = () => {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])
  const { isAuthenticated, user } = useAuthContext()
  const { push } = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectUrl = window.localStorage.getItem(LOGIN_REDIRECTION_KEY)

      push(redirectUrl || ROUTES.RANDOMIZER).then(() => {
        window.localStorage.removeItem(LOGIN_REDIRECTION_KEY)
      })
    }
  }, [push, isAuthenticated, user])

  return !isSSR ? (
    <>
      <Head>
        <title>Sign Up | Problem Randomizer</title>
        <meta
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          name="description"
        />
      </Head>

      <main className="min-h-[95vh]">
        <AuthFormWrapper>
          <h2 className="text-lg font-medium text-center mb-2">
            Sign up with us today
          </h2>
          <p className="text-xs text-neutral-500 mb-6 text-center">
            Enter your username and choose a password to setup your account
          </p>
          <SignUpForm />
        </AuthFormWrapper>
      </main>

      <Footer />
    </>
  ) : null
}

export default SignUpPage
