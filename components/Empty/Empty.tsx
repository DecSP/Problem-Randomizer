import { ReactNode } from 'react'
import { Icon } from '@iconify/react'

export type EmptyProps = {
  message: string
  icon?: ReactNode
}

export const Empty = ({ message, icon }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <div className="h-[60px] w-[60px] flex justify-center items-center">
        {icon ?? <Icon className="text-6xl" icon="carbon:code-hide" />}
      </div>
      <span className="font-semibold tracking-[2px] text-center">
        {message}
      </span>
    </div>
  )
}
