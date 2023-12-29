import { Icon } from '@iconify/react'
import cx from 'classnames'
import React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'text'
  color?: 'black' | 'white' | 'primary' | 'success' | 'danger' | 'warning'
  loading?: boolean
}

export const Button = (props: ButtonProps) => {
  const {
    variant = 'solid',
    color = 'primary',
    children,
    loading,
    className,
    ...rest
  } = props

  const baseClasses = cx(
    'duration-[250] h-10 flex justify-center items-center gap-2',
    {
      'p-0.5': variant === 'outline',
      'py-2 px-4': variant === 'solid',
      'p-0': variant === 'text',
    },
  )

  const hoverClasses = cx({
    'transition-[padding] hover:p-1': variant === 'outline',
    'transition-opacity hover:opacity-60': variant !== 'outline',
  })

  const disabledClasses =
    rest.disabled || loading ? '!opacity-40 cursor-not-allowed' : ''

  const colorClasses = cx({
    'text-white duration-[250] bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600':
      color === 'primary' && variant !== 'text',
    'bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600 bg-clip-text':
      color === 'primary' && variant === 'text',

    'text-white bg-neutral-900': color === 'black' && variant !== 'text',
    'text-neutral-900': color === 'black' && variant === 'text',

    'text-neutral-900 bg-neutral-100 border border-neutral-200':
      color === 'white' && variant !== 'text',
    'text-neutral-500': color === 'white' && variant === 'text',

    'text-white bg-emerald-500': color === 'success' && variant !== 'text',
    'text-emerald-500': color === 'success' && variant === 'text',

    'text-white bg-red-500': color === 'danger' && variant !== 'text',
    'text-red-500': color === 'danger' && variant === 'text',

    'text-neutral-900 bg-amber-300': color === 'warning' && variant !== 'text',
    'text-amber-400': color === 'warning' && variant === 'text',
  })

  const buttonClasses = cx(
    baseClasses,
    hoverClasses,
    colorClasses,
    disabledClasses,
    className,
  )

  if (loading) {
    return (
      <button className={buttonClasses} {...rest}>
        <Icon icon="svg-spinners:3-dots-scale" className="text-2xl" />
      </button>
    )
  }

  return (
    <button className={buttonClasses} {...rest}>
      {variant === 'outline' ? (
        <div
          className={cx(
            'w-full h-full flex items-center justify-center bg-white text-neutral-900 gap-2 px-4',
            {
              'bg-emerald-50': color === 'success',
              'bg-red-50': color === 'danger',
              'bg-amber-50': color === 'warning',
            },
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  )
}
