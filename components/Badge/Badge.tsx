import cx from 'classnames'
import React, { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  className?: string
  scheme?: 'black' | 'white' | 'info' | 'success' | 'danger' | 'warning'
}

export const Badge = (props: BadgeProps) => {
  const { scheme = 'info', children, className } = props

  const baseClasses = cx(
    'flex rounded-sm justify-center items-center text-sm py-0.5 px-2',
  )

  const colorClasses = cx({
    'text-neutral-900 bg-neutral-200': scheme === 'black',

    'text-neutral-500 bg-neutral-50 border border-neutral-200':
      scheme === 'white',

    'text-blue-600 bg-blue-100': scheme === 'info',

    'text-emerald-600 bg-emerald-100': scheme === 'success',

    'text-red-600 bg-red-100': scheme === 'danger',

    'text-amber-600 bg-amber-100': scheme === 'warning',
  })

  const buttonClasses = cx(baseClasses, colorClasses, className)

  return <div className={buttonClasses}>{children}</div>
}
