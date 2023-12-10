import { Card, Checkbox } from 'antd'
import { useEffect, useState } from 'react'
import { useProblemContext } from '../../context/problem'
import { Problem } from '../../lib/schema'
import { QUESTIONS_SOURCES } from '../../types/questions-source'
import cx from 'classnames'

type ProblemCardProps = {
  problem: Problem
  showCheckbox?: boolean
}

export const ProblemCard = ({
  problem,
  showCheckbox = true,
}: ProblemCardProps) => {
  const { addProblem, removeProblem, selectedProblemUrls } = useProblemContext()

  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    setIsSelected((selectedProblemUrls || []).includes(problem?.url))
  }, [problem?.url, selectedProblemUrls])

  const onChange = () => {
    if (!isSelected) {
      addProblem(problem?.url)
    } else {
      removeProblem(problem?.url)
    }

    setIsSelected(!isSelected)
  }

  return (
    <Card
      className="!rounded-none border-neutral-200 bg-white"
      title={problem?.name}
      extra={
        showCheckbox ? (
          <>
            {/* <a
            className="text-neutral-600 hover:text-neutral-500"
            href={problem?.url}
            target="_blank"
          >
            <span className="!text-xs md:!text-sm">Go to problem</span>
          </a> */}
            <Checkbox
              onChange={onChange}
              className="flex-row-reverse"
              checked={isSelected}
            >
              <div className="h-6 overflow-hidden">
                <div
                  className={cx(
                    'flex flex-col gap-1 transition-all duration-[250]',
                    {
                      '-translate-y-[26px]': isSelected,
                    },
                  )}
                >
                  {[
                    'Include Problem',
                    'Include',
                    'Exclude Problem',
                    'Exclude',
                  ].map((label, index) => (
                    <span
                      key={label}
                      className={cx(
                        'text-right select-none text-neutral-800 hover:text-neutral-500 transition-colors duration-[250]',
                        {
                          'inline md:hidden': index % 2 !== 0,
                          'md:inline hidden': index % 2 === 0,
                        },
                      )}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </Checkbox>
          </>
        ) : null
      }
      headStyle={{
        borderColor: 'rgb(229, 231, 235)',
      }}
    >
      <p>Rating: {problem?.rating}</p>
      <p>Source: {QUESTIONS_SOURCES[problem?.source_type]}</p>
      <p>Contest: {problem?.contest_name}</p>
    </Card>
  )
}
