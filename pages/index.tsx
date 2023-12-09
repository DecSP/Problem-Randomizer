import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/Header/Header'
import useFetch from '../hooks/useFetch'
import { client } from '../lib/apis'
import { QuestionSources } from '../types/questions-source'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { Counter } from '../components/Counter'
import { Problem } from '../lib/schema'
import {
  ProblemFilterForm,
  ProblemFormFields,
} from '../components/ProblemFilterForm'
import { SelectedProblemsDrawer } from '../components/SelectedProblemsDrawer'
import { ProblemCard } from '../components/ProblemCard'
import { useProblemContext } from '../context/problem'

const Home: NextPage = () => {
  const { problems, setProblems } = useProblemContext()
  const [prob, setProb] = useState<Problem[]>([])
  const [probType, setProbType] = useState<QuestionSources>('codeforces')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isEverOpened, setIsEverOpened] = useState(false)

  useEffect(() => {
    if (!isEverOpened && isDrawerOpen) {
      setIsEverOpened(true)
    }
  }, [isDrawerOpen, isEverOpened])

  useEffect(() => {
    if (!isEverOpened && problems.length > 0) {
      setIsDrawerOpen(true)
      setIsEverOpened(true)
    }
  }, [isEverOpened, problems.length])

  useEffect(() => {
    setProblems(prob)
  }, [prob, setProblems])

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }
  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const [timerConfig, setTimerConfig] = useState({
    show: false,
    minutes: 0,
    isCounting: false,
  })
  const { data, isLoading } = useFetch({
    api: () => client.getProblems(probType),
    keys: [probType],
  })
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  const startTimer = (minutes: number) => {
    setTimerConfig({
      show: true,
      minutes,
      isCounting: true,
    })
  }

  const onSubmit = async (values: ProblemFormFields) => {
    if (!data) return

    setTimerConfig({
      show: false,
      minutes: 0,
      isCounting: false,
    })

    const list = data.filter(
      (value: Problem) =>
        value.name &&
        value.rating &&
        (!values.lowerDiff || value.rating >= values.lowerDiff) &&
        (!values.upperDiff || value.rating <= values.upperDiff),
    )
    const problem = list[Math.floor(Math.random() * list.length)]
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

  return !isSSR ? (
    <>
      <div>
        <Head>
          <title>Problem Randomizer</title>
          <meta name="description" content="Problem Randomizer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />

        <main className="relative min-h-screen pt-[72px] bg-white">
          <section className="relative">
            <div className="section-container px-6 md:px-[90px] py-[40px]">
              <h1 className="text-2xl w-max leading-9 mb-10 bg-clip-text bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600">
                Problem Randomizer
              </h1>
              <ProblemFilterForm
                onSubmit={onSubmit}
                setProbType={setProbType}
                disabled={isLoading || isTimerRunning}
              />
            </div>
          </section>

          <section>
            <div className="section-container px-6 md:px-[90px] pb-[88px]">
              {isLoading && (
                <div className="w-full flex justify-center p-6">
                  <div className="animate-spin w-max">
                    <Icon icon="vaadin:spinner-third" className="text-2xl" />
                  </div>
                </div>
              )}

              {prob.length ? (
                <div className="flex flex-col items-stretch gap-6">
                  {prob.map((p) => (
                    <ProblemCard key={p.url} problem={p} />
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          {timerConfig.show ? (
            <Counter
              interval={1}
              minutes={timerConfig.minutes}
              className="fixed bottom-0 right-0"
              onStart={() => setIsTimerRunning(true)}
              onStop={() => setIsTimerRunning(false)}
            />
          ) : null}
        </main>

        <button
          className="fixed bottom-6 right-0 text-white bg-black px-4 py-2 border-l border-y border-gray-600"
          type="submit"
          onClick={openDrawer}
        >
          Selected Problems
        </button>
      </div>

      <SelectedProblemsDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </>
  ) : null
}

export default Home
