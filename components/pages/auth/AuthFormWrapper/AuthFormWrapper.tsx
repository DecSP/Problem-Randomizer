import Image from 'next/image'
import { ReactNode } from 'react'

export type AuthFormWrapperProps = {
  children: ReactNode
}

export const AuthFormWrapper = (props: AuthFormWrapperProps) => {
  const { children } = props

  return (
    <div className="flex min-h-[95vh] w-full">
      <div
        className="bg-cover hidden md:flex bg-center relative max-w-[40%] w-[520px] flex-col justify-center items-start gap-6 p-8"
        style={{
          backgroundImage: 'url("/images/auth-bg.svg")',
        }}
      >
        <Image
          alt="Problem Randomizer Logo"
          className="select-none absolute top-6 left-8"
          height={56}
          src="/images/prob-rand-logo.png"
          width={56}
          priority
        />
        <div className="text-3xl lg:text-4xl">
          Welcome to{' '}
          <span
            className="bg-clip-text w-max text-center font-medium bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600"
            style={{
              fontFamily: 'Space Grotesk',
            }}
          >
            Problem Randomizer
          </span>
        </div>
        <div>
          <p className="text-xs lg:text-sm text-neutral-600 text-center hidden md:inline">
            Create problem set and test your programming skills with various
            coding problems from Codeforces, AtCoder, etc.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row flex-1 justify-center items-center relative">
        <Image
          alt="Problem Randomizer Logo"
          className="select-none block md:hidden absolute top-6 left-6 sm:top-8 sm:left-8"
          height={48}
          src="/images/prob-rand-logo-gradient.png"
          width={48}
          priority
        />
        <div className="bg-white h-auto p-6 sm:p-8 md:px-14 md:max-w-lg">
          {children}
        </div>
      </div>
    </div>
  )
}
