import { Icon } from '@iconify/react'
import React, { ImgHTMLAttributes, ReactNode } from 'react'
import cx from 'classnames'
import { Tooltip } from 'antd'

const sizeClassNames = {
  xs: 'w-7 h-7',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
}

const textClassNames = {
  xs: 'text-base font-medium',
  sm: 'text-xl font-semibold',
  md: 'text-3xl font-semibold',
  lg: 'text-4xl font-semibold',
}

const presenceClassNames = {
  xs: 'w-1.5 h-1.5 border-[1.5px]',
  sm: 'w-2 h-2 border-2',
  md: 'w-3 h-3 border-[3px]',
  lg: 'w-5 h-5 border-4',
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
  name?: string
  color?: 'primary' | 'blue' | 'green' | 'yellow' | 'red' | 'white' | 'black'
  src?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square'
  presence?: 'online' | 'offline' | 'away' | 'do-not-disturb'
  description?: ReactNode
  className?: string
  contentClassName?: string
  title?: ReactNode
  titleClassName?: string
  descriptionClassName?: string
  showInfo?: boolean
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
  loading?: boolean
}

export const Avatar = (props: AvatarProps) => {
  const {
    name = '',
    color = 'primary',
    src,
    size = 'md',
    shape = 'circle',
    presence,
    title,
    description,
    className,
    contentClassName,
    titleClassName,
    descriptionClassName,
    showInfo = false,
    imgProps,
    loading = false,
  } = props

  const firstLetter = (
    (typeof name === 'string' ? name?.[0] : '') ||
    (typeof description === 'string' ? description?.[0] : '') ||
    ''
  ).toUpperCase()

  const textClass = cx('text-center', textClassNames[size])
  const shapeClass = cx({
    'rounded-full': shape === 'circle',
    'rounded-sm': shape === 'square' && size === 'xs',
    'rounded-md': shape === 'square' && size === 'sm',
    'rounded-lg': shape === 'square' && size === 'md',
    'rounded-xl': shape === 'square' && size === 'lg',
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
        'text-center select-none',
        ['yellow', 'white'].includes(color) ? 'text-neutral-900' : 'text-white',
        textClass,
        contentClassName,
      )}
    >
      {firstLetter}
    </p>
  )

  let renderTitle = null
  if (title) {
    if (typeof title === 'string') {
      renderTitle = (
        <p
          className={cx(
            'text-lg font-semibold text-neutral-900 truncate',
            titleClassName,
          )}
        >
          <Tooltip title={title} trigger="hover">
            {title}
          </Tooltip>
        </p>
      )
    } else {
      renderTitle = title
    }
  } else {
    renderTitle = (
      <p
        className={cx(
          'text-lg font-semibold text-neutral-900 truncate',
          titleClassName,
        )}
      >
        <Tooltip title={name} trigger="hover">
          {name}
        </Tooltip>
      </p>
    )
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
        <Tooltip title={description} trigger="hover">
          {description}
        </Tooltip>
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
          className={cx('absolute w-full h-full', shapeClass, {
            'animate-pulse bg-neutral-200': src !== undefined || loading,
            [colorClassNames[color]]: src === undefined && !loading,
          })}
        />
        <div className="relative">{renderImage}</div>
        {presence && !loading ? (
          <div
            className={cx(
              'rounded-full box-content border-white flex justify-center items-center absolute shrink-0 bottom-0',
              presenceClassNames[size],
              {
                [presenceColorClassNames[presence]]: presence,
                'right-0': shape === 'circle',
                '-right-[2.5px]': shape !== 'circle' && size === 'xs',
                '-right-0.5': shape !== 'circle' && size === 'sm',
                '-right-1': shape !== 'circle' && size === 'md',
                '-right-1.5': shape !== 'circle' && size === 'lg',
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
