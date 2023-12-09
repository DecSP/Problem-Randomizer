import { Card, Checkbox } from 'antd'
import { useEffect, useState } from 'react'
import { useProblemContext } from '../../context/problem'
import { Problem } from '../../lib/schema'
import { QUESTIONS_SOURCES } from '../../types/questions-source'

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
    setIsSelected((selectedProblemUrls || []).includes(problem.url))
  }, [problem.url, selectedProblemUrls])

  const onChange = () => {
    if (!isSelected) {
      addProblem(problem.url)
    } else {
      removeProblem(problem.url)
    }

    setIsSelected(!isSelected)
  }

  return (
    <Card
      className="!rounded-none border-gray-200 bg-white"
      title={`${problem.name} - Rating ${problem.rating}`}
      extra={
        showCheckbox ? (
          <>
            {/* <a
            className="text-gray-600 hover:text-gray-500"
            href={problem.url}
            target="_blank"
          >
            <span className="!text-xs md:!text-sm">Go to problem</span>
          </a> */}
            <Checkbox
              onChange={onChange}
              className=" flex-row-reverse"
              checked={isSelected}
            >
              <span className="select-none">
                {isSelected ? 'Exclude Problem' : 'Include Problem'}
              </span>
            </Checkbox>
          </>
        ) : null
      }
      headStyle={{
        borderColor: 'rgb(229, 231, 235)',
      }}
    >
      <p>Source: {QUESTIONS_SOURCES[problem.source_type]}</p>
      <p>Contest: {problem.contest_name}</p>
    </Card>
  )
}
