import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#E5E7EB" />
        <meta name="title" content="Problem Randomizer" />
        <meta
          name="description"
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
        />
        <meta
          name="keywords"
          content="competitive coding, coding, competitive programming, programming, problem set, codeforces, atcoder, cses, algorithms, data structures"
        />

        {/* Social network */}
        <meta property="twitter:title" content="Problem Randomizer" />
        <meta
          property="twitter:description"
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://problem-randomizer.vercel.app/"
        />
        <meta property="twitter:image" content="/images/og.png" />

        {/* OG */}
        <meta property="og:title" content="Problem Randomizer" />
        <meta
          property="og:description"
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://problem-randomizer.vercel.app/"
        />
        <meta property="og:image" content="/images/og.png" />

        <link
          href="/images/prob-rand-logo.png"
          rel="icon"
          type="image/x-icon"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
