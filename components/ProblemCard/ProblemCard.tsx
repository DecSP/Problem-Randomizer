import { Icon } from '@iconify/react'
import { Card, Checkbox } from 'antd'
import cx from 'classnames'
import { useEffect, useState } from 'react'

import { useProblemContext } from '@/context/problem'
import { Problem } from '@/lib/schema'

import { ProblemSourceBadge } from '../ProblemSourceBadge'

type ProblemCardProps = {
  problem: Problem
}

export const ProblemCard = ({ problem }: ProblemCardProps) => {
  const { addProblem, removeProblem, selectedProblemIds } = useProblemContext()

  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    setIsSelected((selectedProblemIds || []).includes(problem?.id))
  }, [problem?.id, selectedProblemIds])

  const onChange = () => {
    if (!isSelected) {
      addProblem(problem?.id)
    } else {
      removeProblem(problem?.id)
    }

    setIsSelected(!isSelected)
  }

  return (
    <Card
      className="!rounded-none border-neutral-200 bg-white"
      extra={
        <Checkbox
          checked={isSelected}
          className="flex-row-reverse"
          onChange={onChange}
        >
          <div className="h-6 overflow-hidden">
            <div
              className={cx('flex flex-col transition-all duration-[250]', {
                '-translate-y-[24px]': isSelected,
              })}
            >
              {['Include Problem', 'Include', 'Exclude Problem', 'Exclude'].map(
                (label, index) => (
                  <span
                    key={label}
                    className={cx(
                      'text-right h-6 items-center justify-end select-none text-neutral-800 hover:text-neutral-500 transition-colors duration-[250]',
                      {
                        'flex md:hidden': index % 2 !== 0,
                        'md:flex hidden': index % 2 === 0,
                      },
                    )}
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>
        </Checkbox>
      }
      headStyle={{
        borderColor: 'rgb(229, 231, 235)',
      }}
      title={
        <div className="flex gap-2 items-center justify-start">
          <span className="truncate">{problem?.name}</span>
          <a
            href={`problem/${problem.id}/submit`}
            // href={problem?.url}
            rel="noreferrer"
            target="_blank"
          >
            <Icon
              className="shrink-0 text-base text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
              icon="la:external-link-alt"
            />
          </a>
        </div>
      }
    >
      <ProblemSourceBadge
        className="mb-1.5 w-max"
        source={problem?.source_type}
      />
      <p>
        <b className="!font-bold !text-xs">Rating:</b> {problem?.rating}
      </p>
      <p>
        <b className="!font-bold !text-xs">Contest:</b> {problem?.contest_name}
      </p>
    </Card>
  )
}
