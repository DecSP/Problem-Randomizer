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
      className="!bg-neutral-100"
      open={open}
      placement="right"
      rootClassName={rootClassName}
      styles={{
        header: {
          backgroundColor: '#FFFFFF',
        },
      }}
      width={width}
      onClose={onClose}
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
