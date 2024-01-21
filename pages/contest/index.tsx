import type { NextPage } from 'next'
import Head from 'next/head'
import { Icon } from '@iconify/react'
import { Layout } from '@/components/Layout'
import { Empty } from '@/components/Empty'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contest | Problem Randomizer</title>
        <meta
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          name="description"
        />
      </Head>

      <Layout>
        <main className="pt-[76px] bg-white">
          <div className="p-6">
            <section className="section-container min-h-[400px] flex justify-center items-center">
              <Empty
                icon={<Icon className="text-6xl" icon="ri:timer-flash-line" />}
                message="Coming soon..."
              />
            </section>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Home
