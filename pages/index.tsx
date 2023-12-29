import { Icon } from '@iconify/react'
import { notification } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/Button'

import { Counter } from '../components/Counter'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header/Header'
import { ProblemCard } from '../components/ProblemCard'
import {
  ProblemFilterForm,
  ProblemFormFields,
} from '../components/ProblemFilterForm'
import { SelectedProblemsDrawer } from '../components/SelectedProblemsDrawer'
import { WalkthroughDrawer } from '../components/WalkthroughDrawer'
import { useProblemContext } from '../context/problem'
import useFetch from '../hooks/useFetch'
import { client } from '../lib/apis'
import { Problem } from '../lib/schema'
import { ProblemSources } from '../types/problem-source'

const Home: NextPage = () => {
  const { problems = [], setProblems } = useProblemContext()
  const [prob, setProb] = useState<Problem[]>(problems)
  const [probType, setProbType] = useState<ProblemSources | undefined>(
    undefined,
  )
  const [isProblemsDrawerOpen, setIsProblemsDrawerOpen] = useState(false)
  const [isWalkthroughDrawerOpen, setIsWalkthroughDrawerOpen] = useState(false)
  const [isEverOpened, setIsEverOpened] = useState(false)

  const allSpawnedProblemsId = useMemo(
    () => prob.map((problem) => problem.id),
    [prob],
  )

  useEffect(() => {
    if (!isEverOpened && isProblemsDrawerOpen) {
      setIsEverOpened(true)
    }
  }, [isProblemsDrawerOpen, isEverOpened])

  useEffect(() => {
    if (!isEverOpened && problems.length > 0) {
      setIsProblemsDrawerOpen(true)
      setIsEverOpened(true)
    }
  }, [isEverOpened, problems.length])

  const openDrawer = () => {
    setIsProblemsDrawerOpen(true)
  }
  const closeDrawer = () => {
    setIsProblemsDrawerOpen(false)
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

  return !isSSR ? (
    <>
      <Head>
        <title>Problem Randomizer</title>
        <meta
          name="description"
          content="Create problem set and test your programming skills with various coding problems from Codeforces, AtCoder, etc."
        />
        <link rel="icon" href="/images/prob-rand-logo.png" />
      </Head>

      <Header />

      <main className="relative pt-[76px] bg-white">
        <section className="relative">
          <div className="section-container px-6 md:px-[90px] pt-[40px] pb-[88px] md:pb-[40px]">
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 mb-10">
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
                  icon="ant-design:question-circle-outlined"
                  className="!text-neutral-500 hover:!text-neutral-400 transition-colors duration-[250] text-sm"
                />
              </button>
            </div>
            <ProblemFilterForm
              setProbType={setProbType}
              disabled={isLoading || isTimerRunning}
              onSubmit={onSubmit}
            />
          </div>
        </section>

        <section
          className="min-h-[160px]"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #FFF, #F5F5F5 160px)',
          }}
        >
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
                  <ProblemCard key={p?.id} problem={p} />
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

        <Button
          color="black"
          className="fixed bottom-6 right-0 z-30"
          type="submit"
          onClick={openDrawer}
        >
          <Icon icon="ri:arrow-right-s-line" className="shrink-0" />
          View Selected
        </Button>

        <SelectedProblemsDrawer
          open={isProblemsDrawerOpen}
          onClose={closeDrawer}
        />

        <WalkthroughDrawer
          open={isWalkthroughDrawerOpen}
          onClose={() => setIsWalkthroughDrawerOpen(false)}
        />
      </main>

      <Footer />
    </>
  ) : null
}

export default Home
