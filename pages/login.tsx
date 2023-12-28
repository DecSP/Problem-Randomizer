import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Footer } from '../components/Footer';
import { AuthFormWrapper } from '../components/pages/auth/AuthFormWrapper';
import { LoginForm } from '../components/pages/auth/LoginForm';

const LoginPage = () => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return !isSSR ? (
    <>
      <Head>
        <title>Login | Problem Randomizer</title>
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
            Welcome back!
          </h2>
          <p className="text-xs text-neutral-500 mb-6 text-center">
            Log in to continue solving
          </p>
          <LoginForm />
        </AuthFormWrapper>
      </main>

      <Footer />
    </>
  ) : null;
};

export default LoginPage;
