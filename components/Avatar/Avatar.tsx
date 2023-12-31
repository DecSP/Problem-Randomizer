//create avatar component from scratch
import { Icon } from '@iconify/react'
import React from 'react'

const SIZE_CLASSES = {
  small: 'w-12 h-12',
  medium: 'w-16 h-16',
  large: 'w-20 h-20',
}

const TEXT_CLASSES = {
  small: 'text-[24px]',
  medium: 'text-[30px]',
  large: 'text-[36px]',
}

const PRESENCE_SIZE_CLASSES = {
  small: 'w-4 h-4 bottom-[-17px] right-[17px] text-[14px]',
  medium: 'w-6 h-6 bottom-[-21px] right-[24px] text-[16px]',
  large: 'w-7 h-7 bottom-[-26px] right-[28px] text-[18px]',
}

const PRESENCE_CLASSES = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  away: 'bg-white',
  busy: 'bg-red-500',
  none: '',
}

const COLOR_CLASSES = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  gray: 'bg-gray-500',
  black: 'bg-black',
  transparent: 'bg-transparent',
}

interface IAvatarProps {
  name: string
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'black' | 'transparent'
  src?: string
  size?: 'small' | 'medium' | 'large'
  shape?: 'circle' | 'square'
  presence?: 'online' | 'offline' | 'away' | 'busy' | 'none'
  primaryText?: string
  secondaryText?: string
  tooltipText?: string // Add tooltipText prop
}

const Avatar = (props: IAvatarProps) => {
  const {
    name,
    color = 'blue',
    src,
    size = 'medium',
    shape = 'circle',
    presence = 'online',
    primaryText,
    secondaryText,
    tooltipText,
  } = props

  const firstLetter = name[0].toUpperCase()
  let tooltip
  if (tooltipText === undefined) {
    if (presence !== 'none') {
      tooltip = name + ' (' + presence + ') '
    } else {
      tooltip = name
    }
  } else {
    tooltip = tooltipText
  }

  const sizeClass = SIZE_CLASSES[size]
  const textClass = `${TEXT_CLASSES[size]} text-center font-semibold`
  const presenceClass = `rounded-full border-2 border-white ${PRESENCE_SIZE_CLASSES[size]} ${PRESENCE_CLASSES[presence]} || ''`
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded'
  const colorClass = `${COLOR_CLASSES[color]} || ''`
  const textColorClass = 'text-white'
  const presenceIcon = () => {
    if (presence === 'away') {
      return (
        <Icon
          icon="fluent-mdl2:away-status"
          className="text-yellow-500 h-full w-full"
        />
      )
    } else {
      return null
    }
  }

  const renderImage = () => {
    if (src) {
      return (
        <img src={src} alt={name} className={`w-full h-full ${shapeClass}`} />
      )
    } else {
      return (
        <p
          className={`${textClass} ${textColorClass} text-center  font-semibold`}
        >
          {firstLetter}
        </p>
      )
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClass} ${shapeClass} ${colorClass} flex items-center justify-center shrink-0 hover:opacity-80 hover:cursor-pointer`}
        title={tooltip}
      >
        {renderImage()}
      </div>
      {presence !== 'none' && (
        <div
          className={`flex justify-center items-center relative ${presenceClass} shrink-0`}
        >
          {presenceIcon()}
        </div>
      )}

      {primaryText || secondaryText ? (
        <div>
          {primaryText && <p className={`  font-semibold`}>{primaryText}</p>}

          {secondaryText && <p className={` text-xs`}>{secondaryText}</p>}
        </div>
      ) : null}
    </div>
  )
}

export default Avatar
