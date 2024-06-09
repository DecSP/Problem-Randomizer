import { Drawer } from 'antd'
import Image from 'next/image'
import { ReactNode } from 'react'
import { Icon } from '@iconify/react'
import { Button } from '../Button'

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
      className="!bg-neutral-50"
      open={open}
      placement="right"
      rootClassName={rootClassName}
      styles={{
        body: {
          padding: 0,
        },
        header: {
          display: 'none',
        },
      }}
      width={width}
      onClose={onClose}
    >
      <div className="h-[76px] flex items-center px-6 py-4 sticky top-0 z-50 bg-neutral-50">
        <Button color="black" variant="text" onClick={onClose}>
          <Icon className="text-2xl" icon="ant-design:close-outlined" />
        </Button>
      </div>
      <div className="px-6 pb-6 overflow-auto h-[calc(100%-76px)]">
        {children}
      </div>
    </Drawer>
  )
}

export const WalkthroughDrawer = (props: WalkthroughDrawerProps) => {
  const { open, onClose } = props

  const drawerInner = (
    <div className="flex flex-col items-center gap-4">
      <Image
        alt="Problem Randomizer Logo"
        className="pb-2 select-none"
        height={80}
        src="/images/prob-rand-logo.png"
        width={80}
        priority
      />
      <h2 className="font-medium text-xl pb-2 text-center">
        Welcome to
        <br />
        <span className="font-medium" style={{ fontFamily: 'Space Grotesk' }}>
          Problem Randomizer
        </span>
      </h2>
      <p className="w-full">
        Create problem set and test your programming skills with just a few
        steps:
      </p>
      <ul className="ml-6 list-decimal w-full">
        <li>
          Adjust your filter and click on &lsquo;Submit&rsquo; to pick problems.
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
        rootClassName="hidden md:block"
        onClose={onClose}
      >
        {drawerInner}
      </DrawerWrapper>

      <DrawerWrapper
        open={open}
        rootClassName="block md:hidden"
        width="100%"
        onClose={onClose}
      >
        {drawerInner}
      </DrawerWrapper>
    </>
  )
}
