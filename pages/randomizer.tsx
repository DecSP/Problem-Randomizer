import { useMemo, useState } from 'react'
import { notification } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Button } from '@/components/Button'
import { Counter } from '@/components/Counter'
import { ProblemCard } from '@/components/ProblemCard'
import {
  ProblemFilterForm,
  ProblemFormFields,
} from '@/components/ProblemFilterForm'
import { WalkthroughDrawer } from '@/components/WalkthroughDrawer'
import { useProblemContext } from '@/context/problem'
import useFetch from '@/hooks/useFetch'
import { client } from '@/lib/apis'
import { Problem } from '@/lib/schema'
import { ProblemSources } from '@/types/problem-source'
import { Layout } from '@/components/Layout'
import { ROUTES } from '@/constants/routes'

const Home: NextPage = () => {
  const {
    problems = [],
    addProblem,
    setProblems,
    selectedProblemIds,
  } = useProblemContext()
  const [prob, setProb] = useState<Problem[]>(problems)
  const [probType, setProbType] = useState<ProblemSources | undefined>(
    undefined,
  )
  const [isWalkthroughDrawerOpen, setIsWalkthroughDrawerOpen] = useState(false)

  const allSpawnedProblemsId = useMemo(
    () => prob.map((problem) => problem.id),
    [prob],
  )

  const { push } = useRouter()

  const [timerConfig, setTimerConfig] = useState({
    show: false,
    minutes: 0,
    isCounting: false,
  })
  const { data, isLoading } = useFetch(
    () => (probType ? client.getProblems(probType) : undefined),
    probType ? [probType] : undefined,
  )
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  const startTimer = (minutes: number) => {
    setTimerConfig({
      show: true,
      minutes,
      isCounting: true,
    })
  }

  const onSubmit = async (values: ProblemFormFields) => {
    if (!data || (data || []).length === 0) {
      return
    }

    setTimerConfig({
      show: false,
      minutes: 0,
      isCounting: false,
    })

    const problemsMeetingFilters = (data || [])
      .filter((problem) => !allSpawnedProblemsId.includes(problem.id))
      .filter(
        (value: Problem) =>
          value.name &&
          value.rating &&
          (!values.lowerDiff || value.rating >= values.lowerDiff) &&
          (!values.upperDiff || value.rating <= values.upperDiff),
      )

    if ((data || []).length > 0) {
      if (allSpawnedProblemsId.length >= (data || []).length) {
        notification.info({
          message: 'We have spawned all problems from this source',
        })

        return
      }

      if (problemsMeetingFilters.length === 0) {
        notification.info({
          message: 'No problems meet the filter conditions',
        })

        return
      }
    }

    const problem =
      problemsMeetingFilters[
        Math.floor(Math.random() * problemsMeetingFilters.length)
      ]

    addProblem(problem.id)
    setProblems([problem, ...prob])
    setProb([problem, ...prob])

    if (values?.minutes && values?.minutes > 0) {
      startTimer(values?.minutes)
    } else {
      setTimerConfig({
        show: false,
        minutes: 0,
        isCounting: false,
      })
    }
  }

  return (
    <>
      <Head>
        <title>Randomizer | Problem Randomizer</title>
        <meta
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
          name="description"
        />
      </Head>

      <Layout>
        <main className="pt-[76px] bg-white">
          <section className="section-container">
            <div className="px-6 md:px-[90px] py-[40px]">
              <div className="inline-flex max-w-full flex-wrap items-center gap-2">
                <h1 className="text-2xl w-max font-medium break-words leading-9">
                  <span
                    className="bg-clip-text bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600"
                    style={{
                      fontFamily: 'Space Grotesk',
                    }}
                  >
                    Problem Randomizer
                  </span>
                </h1>
                <button onClick={() => setIsWalkthroughDrawerOpen(true)}>
                  <Icon
                    className="!text-neutral-500 hover:!text-neutral-400 transition-colors duration-[250] text-sm"
                    icon="ant-design:question-circle-outlined"
                  />
                </button>
              </div>
            </div>
          </section>

          <section
            className="min-h-[160px]"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, #FFF, #F5F5F5 160px)',
            }}
          >
            <div className="section-container px-6 md:px-[90px] pb-[88px] flex flex-col lg:flex-row gap-6 items-stretch">
              <div className="w-full lg:w-[calc((100%-24px)/3)] lg:sticky lg:top-[100px] h-full">
                <ProblemFilterForm
                  disabled={isLoading || isTimerRunning}
                  setProbType={setProbType}
                  onSubmit={onSubmit}
                />
              </div>

              <div className="w-full lg:w-[calc((100%-24px)*2/3)]">
                {!isLoading && !prob.length ? (
                  <div className="w-full flex justify-center p-6">
                    Pick some problems by selecting a source and difficulty
                  </div>
                ) : null}

                {isLoading ? (
                  <div className="w-full flex justify-center p-6">
                    <div className="animate-spin w-max">
                      <Icon className="text-2xl" icon="vaadin:spinner-third" />
                    </div>
                  </div>
                ) : null}

                {prob.length ? (
                  <div className="flex flex-col items-stretch">
                    {prob.map((p) => (
                      <div key={p?.id} className="fade-down group">
                        <ProblemCard
                          className="mb-6 group-last:mb-0"
                          problem={p}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {timerConfig.show ? (
            <Counter
              className="fixed bottom-0 right-0"
              interval={1}
              minutes={timerConfig.minutes}
              onStart={() => setIsTimerRunning(true)}
              onStop={() => setIsTimerRunning(false)}
            />
          ) : null}

          <div className="fixed bottom-6 right-0 z-30 bg-white">
            <Button
              color="black"
              disabled={selectedProblemIds.length === 0}
              type="submit"
              onClick={() => push(ROUTES.CREATE_CONTEST)}
            >
              <Icon className="shrink-0" icon="ri:arrow-right-s-line" />
              Continue
            </Button>
          </div>

          <WalkthroughDrawer
            open={isWalkthroughDrawerOpen}
            onClose={() => setIsWalkthroughDrawerOpen(false)}
          />
        </main>
      </Layout>
    </>
  )
}

export default Home
