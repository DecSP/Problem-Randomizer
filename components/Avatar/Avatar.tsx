import { Icon } from '@iconify/react'
import React, { ImgHTMLAttributes, ReactNode } from 'react'
import cx from 'classnames'

const sizeClassNames = {
  small: 'w-10 h-10',
  medium: 'w-14 h-14',
  large: 'w-20 h-20',
}

const textClassNames = {
  small: 'text-xl',
  medium: 'text-3xl',
  large: 'text-4xl',
}

const presenceClassNames = {
  small: 'w-2 h-2 border-2',
  medium: 'w-3 h-3 border-[3px]',
  large: 'w-5 h-5 border-4',
}

const presenceColorClassNames = {
  online: 'bg-emerald-500',
  offline: 'bg-neutral-400',
  away: 'bg-white',
  'do-not-disturb': 'bg-white',
}

const colorClassNames = {
  primary: 'bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600',
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  yellow: 'bg-amber-300',
  red: 'bg-red-500',
  white: 'bg-neutral-200',
  black: 'bg-black',
}

interface AvatarProps {
  name?: ReactNode
  color?: 'primary' | 'blue' | 'green' | 'yellow' | 'red' | 'white' | 'black'
  src?: string
  size?: 'small' | 'medium' | 'large'
  shape?: 'circle' | 'square'
  presence?: 'online' | 'offline' | 'away' | 'do-not-disturb'
  description?: ReactNode
  className?: string
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  showInfo?: boolean
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
}

const Avatar = (props: AvatarProps) => {
  const {
    name = '',
    color = 'primary',
    src,
    size = 'medium',
    shape = 'circle',
    presence = 'online',
    description,
    className,
    contentClassName,
    titleClassName,
    descriptionClassName,
    showInfo = false,
    imgProps,
  } = props

  const firstLetter = (
    (typeof name === 'string' ? name?.[0] : '') ||
    (typeof description === 'string' ? description?.[0] : '') ||
    ''
  ).toUpperCase()

  const textClass = cx('text-center font-semibold', textClassNames[size])
  const shapeClass = cx({
    'rounded-full': shape === 'circle',
    'rounded-md': shape === 'square' && size === 'small',
    'rounded-lg': shape === 'square' && size === 'medium',
    'rounded-xl': shape === 'square' && size === 'large',
  })

  let presenceIcon = null
  if (presence === 'away') {
    presenceIcon = (
      <Icon className="text-amber-500 w-full h-full shrink-0" icon="ion:moon" />
    )
  }
  if (presence === 'do-not-disturb') {
    presenceIcon = (
      <Icon
        className="text-red-500 w-full h-full shrink-0 scale-[1.2]"
        icon="ic:do-not-disturb-on"
      />
    )
  }

  const renderImage = src ? (
    <img
      className={cx('w-full h-full', shapeClass, contentClassName)}
      src={src}
      {...imgProps}
      alt={typeof name === 'string' ? name : imgProps?.alt}
    />
  ) : (
    <p
      className={cx(
        'text-center font-semibold',
        ['yellow', 'white'].includes(color) ? 'text-neutral-900' : 'text-white',
        textClass,
        contentClassName,
      )}
    >
      {firstLetter}
    </p>
  )

  let renderTitle = null
  if (name && typeof name === 'string') {
    renderTitle = (
      <p
        className={cx(
          'text-lg font-semibold text-neutral-900 truncate',
          titleClassName,
        )}
      >
        {name}
      </p>
    )
  } else {
    renderTitle = name
  }

  let renderDescription = null
  if (description && typeof description === 'string') {
    renderDescription = (
      <p
        className={cx(
          'text-xs text-neutral-600 truncate',
          descriptionClassName,
        )}
      >
        {description}
      </p>
    )
  } else {
    renderDescription = description
  }

  return (
    <div className={cx('flex items-center gap-2.5', className)}>
      <div
        className={cx(
          'relative flex items-center justify-center shrink-0',
          sizeClassNames[size],
          shapeClass,
        )}
      >
        <div
          className={cx(
            'absolute w-full h-full',
            shapeClass,
            {
              'animate-pulse bg-neutral-200': src !== undefined,
            },
            src === undefined ? colorClassNames[color] : '',
          )}
        />
        <div className="relative">{renderImage}</div>
        {presence ? (
          <div
            className={cx(
              'rounded-full box-content border-white flex justify-center items-center absolute shrink-0 bottom-0',
              presenceClassNames[size],
              presence ? presenceColorClassNames[presence] : '',
              {
                'right-0': shape === 'circle',
                '-right-0.5': shape !== 'circle' && size === 'small',
                '-right-1': shape !== 'circle' && size === 'medium',
                '-right-1.5': shape !== 'circle' && size === 'large',
              },
            )}
          >
            {presenceIcon}
          </div>
        ) : null}
      </div>

      {showInfo ? (
        <div className="relative shrink-0 max-w-[120px] truncate">
          {renderTitle}
          {renderDescription}
        </div>
      ) : null}
    </div>
  )
}

export default Avatar
