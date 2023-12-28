import cx from 'classnames'
import React from 'react'

type ButtonProps = {
  variant?: 'solid' | 'outline'
  color?: 'black' | 'white'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const PrButton = (props: ButtonProps) => {
  const {
    variant = 'solid',
    color = 'white',
    leftIcon,
    rightIcon,
    children,
    className,
    ...rest
  } = props

  const baseClasses = 'transition-all duration-[250] p-0.5'
  const hoverClasses =
    variant === 'solid' && color === 'white' ? 'hover:p-1' : 'hover:opacity-80'
  const disabledClasses = rest.disabled
    ? color === 'black'
      ? '!opacity-40 cursor-not-allowed'
      : '!opacity-100 cursor-not-allowed'
    : ''

  const variantClasses =
    variant === 'solid'
      ? color === 'white'
        ? 'form-submit-button transition-[padding] duration-[250] p-0.5 hover:p-1 bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600' //solid white
        : 'text-white bg-black hover:bg-neutral-700 transition-colors duration-[250] px-4 py-2 border-l border-y border-neutral-600 z-30' //solid black
      : 'form-submit-button transition-[padding] duration-[250] p-0.5 hover:p-1 bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600'

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
        <div className="w-full h-full flex items-center justify-center bg-white text-black transition-colors duration-[250]">
          {leftIcon && <div className="mr-2">{leftIcon}</div>}
          {children}
          {rightIcon && <div className="ml-2">{rightIcon}</div>}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          {leftIcon && <div className="mr-2">{leftIcon}</div>}
          {children}
          {rightIcon && <div className="ml-2">{rightIcon}</div>}
        </div>
      )}
    </button>
  )
}
