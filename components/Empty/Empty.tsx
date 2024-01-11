import { Icon } from '@iconify/react'

export type EmptyProps = {
  message: string
}

export const Empty = ({ message }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <Icon className="text-6xl" icon="carbon:code-hide" />
      <span className="font-semibold tracking-[2px] text-center">
        {message}
      </span>
    </div>
  )
}
