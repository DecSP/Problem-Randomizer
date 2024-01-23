import { Form } from 'antd'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  CreateContestForm,
  CreateContestFormFields,
} from '@/components/pages/contest/CreateContestForm'
import { useProblemContext } from '@/context/problem'
import { Layout } from '@/components/Layout'
import { client } from '@/lib/apis'

const CreateContestPage = () => {
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

  const onSubmit = async (value: CreateContestFormFields) => {
    if (isContestValid) {
      const response = await client.createContest({
        title: value.title ?? '', // should not be empty
        description: value.description ?? '',
        duration: value.minutes ?? 0, // should be required
        is_public: value.isPublic ?? true,
        penalty: value.penalty ?? 0,
        start_time: new Date().toISOString(), // where to get this?
      })
      console.log(response)
      // TODO: what next? go to contest page?
      return Promise.resolve()
    } else {
      return Promise.resolve()
    }
  }

  return (
    <>
      <Head>
        <title>Create Contest | Problem Randomizer</title>
        <meta
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          name="description"
        />
      </Head>

      <Layout>
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
                  handleValuesChange={handleValuesChange}
                  isContestValid={isContestValid}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  )
}

export default CreateContestPage
