import type { NextPage } from 'next'
import Head from 'next/head'
import { ColumnsType } from 'antd/es/table'
import { Icon } from '@iconify/react'
import { Layout } from '@/components/Layout'
import { Empty } from '@/components/Empty'
import { Table, Tooltip } from 'antd'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { ContestResponseData } from '@/lib/schema'
import { useFetchContests } from '@/hooks/useFetchContests'
import { Button } from '@/components/Button'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const tableColumn: ColumnsType<ContestResponseData> = [
    {
      title: <span className="font-semibold tracking-[2px]">Title</span>,
      dataIndex: 'title',
      key: 'title',
      render: (value: string) => (
        <div className="w-[180px]">
          <span className="font-medium">{value || ''}</span>
        </div>
      ),
    },
    {
      title: <span className="font-semibold tracking-[2px]">Description</span>,
      dataIndex: 'description',
      key: 'description',
      render: (value: string) => (
        <div className="w-[180px]">
          <span className="block truncate">{value || ''}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="w-[100px]">
          <span className="font-semibold tracking-[2px]">Problems</span>
        </div>
      ),
      dataIndex: 'problems',
      key: 'problems',
      render: (value: number[]) => <span>{value.length}</span>,
      sorter: (a: ContestResponseData, b: ContestResponseData) => {
        return (a?.problems || []).length - (b?.problems || []).length
      },
    },
    {
      title: <span className="font-semibold tracking-[2px]">Start time</span>,
      dataIndex: 'start_time',
      key: 'start_time',
      render: (value: string) => (
        <span>{dayjs(new Date(value)).format('hh:mm A, YYYY/MM/DD')}</span>
      ),
      sorter: (a: ContestResponseData, b: ContestResponseData) => {
        return (
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        )
      },
    },
    {
      title: <span className="font-semibold tracking-[2px]">Time left</span>,
      dataIndex: 'duration',
      key: 'duration',
      render: (value: number, row: ContestResponseData) => {
        const startDateTime = new Date(row.start_time)
        const endTimestamp = value * 60 * 1000

        return (
          <div className="w-[200px]">
            {endTimestamp ? (
              <TimeLeft
                key={`contest-${row.id}-end-time-${endTimestamp}`}
                endTime={dayjs(startDateTime.getTime() + endTimestamp).format(
                  'hh:mm A, YYYY/MM/DD',
                )}
              />
            ) : (
              <span>Duration is not set</span>
            )}
          </div>
        )
      },
    },
    {
      key: 'actions',
      render: (row: ContestResponseData) => {
        const startDateTime = new Date(row.start_time)
        const endTimestamp = row.duration * 60 * 1000

        return endTimestamp ? (
          <Actions
            key={`contest-${row.id}-actions-${endTimestamp}`}
            endTime={dayjs(startDateTime.getTime() + endTimestamp).format(
              'hh:mm A, YYYY/MM/DD',
            )}
            id={row.id}
          />
        ) : (
          <Tooltip title="Join contest">
            <Link href={`${ROUTES.CONTEST}/${row.id}`}>
              <Icon
                className="shrink-0 text-lg text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
                icon="material-symbols:play-arrow-outline"
              />
            </Link>
          </Tooltip>
        )
      },
      fixed: 'right',
    },
  ]

  const { data, loading } = useFetchContests()

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
          <section className="section-container pt-[40px] pb-[88px] px-6 md:px-[90px]">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
              <h1 className="text-2xl font-medium leading-9">
                Running Contests
              </h1>
              <Link className="w-max" href={ROUTES.CREATE_CONTEST}>
                <Button
                  className="text-sm h-max"
                  color="primary"
                  variant="solid"
                >
                  <Icon className="text-lg" icon="ic:baseline-plus" />
                  Create contest
                </Button>
              </Link>
            </div>
            <div className="relative pb-[64px]">
              <Table
                columns={loading ? [] : tableColumn}
                dataSource={loading ? [] : [...(data?.data || [])].reverse()}
                locale={{
                  emptyText:
                    !loading && !data ? (
                      <div className="flex flex-col items-center">
                        <Empty message="No problems added" />
                        <Link href={ROUTES.RANDOMIZER}>
                          <Button color="black" variant="solid">
                            Pick some problems
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="h-[200px] flex justify-center items-center">
                        <Icon
                          className="text-2xl animate-spin"
                          icon="vaadin:spinner-third"
                        />
                      </div>
                    ),
                }}
                rootClassName="w-full overflow-auto border"
                rowKey="id"
              />
            </div>
          </section>
        </main>
      </Layout>
    </>
  )
}

interface TimeLeftProps {
  endTime: string
}

const TimeLeft = ({ endTime }: TimeLeftProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const endDateTime = new Date(endTime)
      const currentTime = new Date()
      const timeDifference = endDateTime.getTime() - currentTime.getTime()
      setTimeLeft(Math.max(0, timeDifference))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [endTime])

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / (1000 * 60 * 60))
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((time % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <p>
        {formatTime(timeLeft) === '00:00:00' ? (
          'Contest ended'
        ) : (
          <>
            Time left:{' '}
            <span className="font-semibold">{formatTime(timeLeft)}</span>
          </>
        )}
      </p>
    </div>
  )
}

interface ActionsProps {
  endTime: string
  id: number
}

const Actions = ({ endTime, id }: ActionsProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const endDateTime = new Date(endTime)
      const currentTime = new Date()
      const timeDifference = endDateTime.getTime() - currentTime.getTime()
      setTimeLeft(Math.max(0, timeDifference))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [endTime])

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / (1000 * 60 * 60))
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((time % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div>
      {formatTime(timeLeft) === '00:00:00' ? null : (
        <Tooltip title="Join contest">
          <Link href={`${ROUTES.CONTEST}/${id}`}>
            <Icon
              className="shrink-0 text-lg text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
              icon="material-symbols:play-arrow-outline"
            />
          </Link>
        </Tooltip>
      )}
    </div>
  )
}

export default Home
