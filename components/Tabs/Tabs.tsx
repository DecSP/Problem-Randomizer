import { Button } from '../Button'
import { TabsContextProvider, useTabsContext } from './context'
import cx from 'classnames'

interface TabsProps {
  children: React.ReactNode
  value?: string
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value?: string) => void
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

interface TabTriggerProps {
  children: React.ReactNode
  value: string
  className?: string
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void
}

interface TabContentProps {
  children: React.ReactNode
  value: string
  className?: string
}

const Tabs = (props: TabsProps) => {
  const { children, value, onValueChange } = props

  return (
    <TabsContextProvider value={value} onValueChange={onValueChange}>
      {children}
    </TabsContextProvider>
  )
}

const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div
      className={cx(
        'flex items-center w-full border-b border-neutral-200 overflow-auto py-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

const TabTrigger = ({
  children,
  value: propValue,
  className,
  onValueChange,
}: TabTriggerProps) => {
  const {
    value,
    setValue,
    onValueChange: contextOnValueChange,
  } = useTabsContext()

  return (
    <Button
      className={cx(
        '!flex shrink-0 rounded-sm overflow-hidden h-9 text-sm',
        {
          '!p-0': propValue === value,
          '!px-4': propValue !== value,
        },
        className,
      )}
      color={propValue === value ? 'info' : 'white'}
      hasBorderAnimation={false}
      variant={propValue === value ? 'outline' : 'text'}
      onClick={() => {
        if (propValue !== value) {
          setValue(propValue)
          onValueChange?.(propValue)
          contextOnValueChange?.(propValue)
        }
      }}
    >
      {children}
    </Button>
  )
}

const TabContent = ({
  children,
  value: propValue,
  className,
}: TabContentProps) => {
  const { value } = useTabsContext()

  return (
    <div
      className={cx(
        {
          hidden: propValue !== value,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

export {
  Tabs,
  TabsList,
  TabTrigger,
  TabContent,
  type TabsProps,
  type TabsListProps,
  type TabTriggerProps,
  type TabContentProps,
}
