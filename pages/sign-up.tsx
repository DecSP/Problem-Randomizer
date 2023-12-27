import Head from 'next/head'
import { Footer } from '../components/Footer'
import { AuthFormWrapper } from '../components/pages/auth/AuthFormWrapper'
import { SignUpForm } from '../components/pages/auth/SignUpForm'

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign-up | Problem Randomizer</title>
        <meta
          name="description"
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
        />
        <link rel="icon" href="/images/prob-rand-logo.png" />
      </Head>

      <main
        className="min-h-[95vh] p-6 bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: 'url("/images/auth-bg.svg")',
        }}
      >
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
  )
}

export default SignUpPage
