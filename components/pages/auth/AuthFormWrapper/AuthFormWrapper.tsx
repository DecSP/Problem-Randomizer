import Image from 'next/image';
import { ReactNode } from 'react';

export type AuthFormWrapperProps = {
  children: ReactNode;
};

export const AuthFormWrapper = (props: AuthFormWrapperProps) => {
  const { children } = props;

  return (
    <div className="flex flex-col items-center gap-6">
      <h1
        className="hidden md:block bg-clip-text text-xl w-max text-center font-medium bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600"
        style={{
          fontFamily: 'Space Grotesk',
        }}
      >
        Problem Randomizer
      </h1>
      <div className="flex flex-col-reverse md:flex-row shadow-lg">
        <div className="bg-white h-auto py-8 md:py-10 px-8 md:px-14 md:max-w-md">
          {children}
        </div>
        <div className="p-6 md:py-10 md:px-6 h-auto bg-neutral-100/40 backdrop-blur-md md:max-w-xs flex flex-row justify-center md:justify-start md:flex-col items-center gap-4 md:gap-8">
          <Image
            priority
            src="/images/prob-rand-logo.png"
            alt="Problem Randomizer Logo"
            width={80}
            height={80}
            className="select-none md:mt-14 hidden md:block"
          />
          <Image
            priority
            src="/images/prob-rand-logo-gradient.png"
            alt="Problem Randomizer Logo"
            width={52}
            height={52}
            className="select-none md:mt-14 block md:hidden"
          />

          <h1
            className="md:hidden block text-xl w-max font-medium text-neutral-900"
            style={{
              fontFamily: 'Space Grotesk',
            }}
          >
            Problem Randomizer
          </h1>

          <p className="text-sm text-neutral-600 text-center hidden md:inline">
            Create problem set and test your programming skills with various
            coding problems from Codeforces, AtCoder, etc.
          </p>
        </div>
      </div>
    </div>
  );
};
