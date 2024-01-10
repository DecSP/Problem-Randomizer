import cx from 'classnames'

import { PROBLEM_SOURCES } from '@/constants/problem-source'
import { ProblemSources } from '@/types/problem-source'

export type ProblemSourceBadgeProps = {
  source: ProblemSources
  className?: string
}

export const ProblemSourceBadge = (props: ProblemSourceBadgeProps) => {
  const { source, className } = props

  return (
    <div
      className={cx(
        'flex items-center gap-2 border py-[1px] px-1 transition-shadow bg-white hover:shadow',
        className,
      )}
    >
      <img
        alt={`${source} logo`}
        className="select-none h-5 w-5 object-contain"
        src={`/images/problem-source/${source}.png`}
      />
      <span className="!text-xs font-medium">{PROBLEM_SOURCES[source]}</span>
    </div>
  )
}
