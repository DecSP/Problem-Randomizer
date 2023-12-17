import { Icon } from '@iconify/react'
import { Form } from 'antd'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import {
  CreateContestForm,
  CreateContestFormFields,
} from '../../components/pages/contest/CreateContestForm'

const CreateContestPage = () => {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const [form] = Form.useForm()

  const onSubmit = (value: CreateContestFormFields) => {
    console.log(value)
    return Promise.resolve()
  }

  return !isSSR ? (
    <>
      <div>
        <Head>
          <title>Create Contest | Problem Randomizer</title>
          <meta
            name="description"
            content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          />
          <link rel="icon" href="/images/prob-rand-logo.png" />
        </Head>

        <Header />

        <main className="relative pt-[76px] bg-white">
          <section>
            <div className="section-container">
              <div className="px-6 md:px-[90px] pt-[40px] pb-[88px] md:pb-[40px]">
                <h1 className="text-2xl w-max break-words font-semibold leading-9 mb-10">
                  <span className="bg-clip-text bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600">
                    Create Contest
                  </span>
                </h1>

                <CreateContestForm formInstance={form} onSubmit={onSubmit} />
              </div>
            </div>
          </section>
        </main>

        <button
          className="fixed flex items-center gap-1 bottom-6 right-0 text-white bg-black hover:bg-neutral-700 transition-colors duration-[250] px-4 py-2 border-l border-y border-neutral-600 z-30"
          type="submit"
        >
          <Icon
            icon="material-symbols-light:arrow-right"
            className="shrink-0 text-3xl"
          />{' '}
          Start Contest
        </button>

        <Footer />
      </div>
    </>
  ) : null
}

export default CreateContestPage
