import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="#E5E7EB" name="theme-color" />
        <meta content="Problem Randomizer" name="title" />
        <meta
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          name="description"
        />
        <meta
          content="competitive coding, coding, competitive programming, programming, problem set, codeforces, atcoder, cses, algorithms, data structures"
          name="keywords"
        />

        {/* Social network */}
        <meta content="Problem Randomizer" property="twitter:title" />
        <meta
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          property="twitter:description"
        />
        <meta content="summary_large_image" property="twitter:card" />
        <meta
          content="https://problem-randomizer.vercel.app/"
          property="twitter:url"
        />
        <meta content="/images/og.png" property="twitter:image" />

        {/* OG */}
        <meta content="Problem Randomizer" property="og:title" />
        <meta
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          property="og:description"
        />
        <meta content="website" property="og:type" />
        <meta
          content="https://problem-randomizer.vercel.app/"
          property="og:url"
        />
        <meta content="/images/og.png" property="og:image" />

        <link
          href="/images/prob-rand-logo.png"
          rel="icon"
          type="image/x-icon"
        />

        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" />
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
