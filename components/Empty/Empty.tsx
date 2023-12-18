import { Icon } from '@iconify/react'

export const Empty = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <Icon icon="carbon:code-hide" className="text-6xl" />
      <span className="font-semibold tracking-[2px]">{message}</span>
    </div>
  )
}
