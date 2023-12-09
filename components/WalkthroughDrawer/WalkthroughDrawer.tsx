import { Drawer } from 'antd'
import Image from 'next/image'
import { ReactNode } from 'react'

type WalkthroughDrawerProps = {
  open?: boolean
  onClose: () => void
}

type WalkthroughDrawerWrapperProps = {
  children: ReactNode
  open?: boolean
  onClose: () => void
  rootClassName?: string
  width?: string | number
}

const DrawerWrapper = ({
  open,
  onClose,
  children,
  rootClassName,
  width,
}: WalkthroughDrawerWrapperProps) => {
  return (
    <Drawer
      placement="right"
      open={open}
      onClose={onClose}
      width={width}
      rootClassName={rootClassName}
      className="!bg-gray-100"
      styles={{
        header: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      {children}
    </Drawer>
  )
}

export const WalkthroughDrawer = (props: WalkthroughDrawerProps) => {
  const { open, onClose } = props

  const drawerInner = (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/images/prob-rand-logo.png"
        alt="Problem Randomizer Logo"
        width={80}
        height={80}
        priority
        className="pb-2"
      />
      <h2 className="font-medium text-xl pb-2">
        Welcome to Problem Randomizer
      </h2>
      <p className="w-full">
        Create problem set and test your programming skills with just a few
        steps:
      </p>
      <ul className="ml-6 list-decimal w-full">
        <li>
          Adjust your filter and click on &lsquo;Submit&rsquo; to spawn
          problems.
        </li>
        <li>Either include or exclude problems to create the problem set.</li>
        <li>Set your timer (optional) and start solving the problem set.</li>
      </ul>
    </div>
  )

  return (
    <>
      <DrawerWrapper
        open={open}
        onClose={onClose}
        rootClassName="hidden md:block"
      >
        {drawerInner}
      </DrawerWrapper>

      <DrawerWrapper
        open={open}
        onClose={onClose}
        width="100%"
        rootClassName="block md:hidden"
      >
        {drawerInner}
      </DrawerWrapper>
    </>
  )
}
