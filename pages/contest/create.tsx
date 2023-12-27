import { Form } from 'antd'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import {
  CreateContestForm,
  CreateContestFormFields,
} from '@/components/pages/contest/CreateContestForm'
import { useProblemContext } from '@/context/problem'

const CreateContestPage = () => {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const [form] = Form.useForm()
  const { selectedProblemIds } = useProblemContext()

  const [isFieldFilled, setIsFieldFilled] = useState(false)
  const [isContestValid, setIsContestValid] = useState(false)

  const handleValuesChange = (_: any, values: CreateContestFormFields) => {
    const isFieldFilled = values.title !== ''

    setIsFieldFilled(isFieldFilled)
  }

  useEffect(() => {
    if (isFieldFilled && selectedProblemIds.length > 0) {
      setIsContestValid(true)
    } else {
      setIsContestValid(false)
    }
  }, [isFieldFilled, selectedProblemIds.length])

  const onSubmit = (value: CreateContestFormFields) => {
    if (isContestValid) {
      console.log(value)
      return Promise.resolve()
    } else {
      return Promise.resolve()
    }
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

        <main
          className="relative pt-[76px]"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, #FFF 200px, #F5F5F5 360px)',
          }}
        >
          <section>
            <div className="section-container">
              <div className="px-6 md:px-[90px] pt-[40px] pb-[88px]">
                <h1 className="text-2xl w-max break-words font-medium leading-9 mb-10">
                  <span className="bg-clip-text bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600">
                    Create Contest
                  </span>
                </h1>

                <CreateContestForm
                  formInstance={form}
                  onSubmit={onSubmit}
                  handleValuesChange={handleValuesChange}
                  isContestValid={isContestValid}
                />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  ) : null
}

export default CreateContestPage
