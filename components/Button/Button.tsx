import cx from 'classnames'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline'
  color?: 'black' | 'white' | 'primary'
}

export const Button = (props: ButtonProps) => {
  const {
    variant = 'solid',
    color = 'primary',
    children,
    className,
    ...rest
  } = props

  const baseClasses = 'transition-all duration-[250] p-0.5'
  const hoverClasses =
    variant === 'solid' && color === 'primary'
      ? 'hover:p-1'
      : 'hover:opacity-80'

  let disabledClasses = ''

  if (rest.disabled) {
    if (color === 'black') {
      disabledClasses = '!opacity-40 cursor-not-allowed'
    } else {
      disabledClasses = '!opacity-100 cursor-not-allowed'
    }
  }

  let variantClasses =
    'form-submit-button transition-[padding] duration-[250] p-0.5 hover:p-1 bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600'
  if (variant === 'solid') {
    if (color === 'primary') {
      variantClasses =
        'form-submit-button transition-[padding] duration-[250] p-0.5 hover:p-1 bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600'
    } else {
      variantClasses =
        'text-white bg-black hover:bg-neutral-700 transition-colors duration-[250] px-4 py-2 border-l border-y border-neutral-600 z-30'
    }
  }

  const buttonClasses = cx(
    baseClasses,
    hoverClasses,
    variantClasses,
    disabledClasses,
    className,
  )

  return (
    <button className={buttonClasses} {...rest}>
      {variant === 'outline' ? (
        <div className="w-full h-full flex items-center justify-center bg-white text-black transition-colors duration-[250] gap-2">
          {children}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">{children}</div>
      )}
    </button>
  )
}
