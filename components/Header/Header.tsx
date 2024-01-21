import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Drawer } from 'antd'
import { useAuthContext } from '@/context/auth'
import { ROUTES } from '@/constants/routes'
import { Icon } from '@iconify/react'
import { Avatar } from '../Avatar'
import { Button } from '../Button'

export const Header = () => {
  const { user } = useAuthContext()
  const { push, pathname } = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const openMenu = () => {
    setIsMenuOpen(true)
  }

  return (
    <>
      <header className="w-screen bg-neutral-100/65 backdrop-blur-sm px-6 py-4 fixed top-0 z-40">
        <div className="section-container text-black flex justify-between items-center gap-6">
          <div className="flex items-center gap-6 md:gap-5">
            <Button
              className="block md:hidden !h-max"
              color="black"
              variant="text"
              onClick={openMenu}
            >
              <Icon className="text-2xl" icon="ant-design:menu-outlined" />
            </Button>
            <Button
              className="h-[44px] shrink-0 md:mr-8"
              variant="text"
              onClick={() => push(ROUTES.LOBBY)}
            >
              <Image
                alt="Problem Randomizer Logo"
                className="select-none"
                height={44}
                src="/images/prob-rand-logo.png"
                width={44}
                priority
              />
            </Button>
            <Button
              className="h-8 text-sm shrink-0 hidden md:inline"
              color={pathname === ROUTES.LOBBY ? 'info' : 'black'}
              variant="text"
              onClick={() => push(ROUTES.LOBBY)}
            >
              Lobby
            </Button>
            <Button
              className="h-8 text-sm shrink-0 hidden md:inline"
              color={pathname.includes(ROUTES.RANDOMIZER) ? 'info' : 'black'}
              variant="text"
              onClick={() => push(ROUTES.RANDOMIZER)}
            >
              Randomizer
            </Button>
            <Button
              className="h-8 text-sm shrink-0 hidden md:inline"
              color={pathname.includes(ROUTES.CONTEST) ? 'info' : 'black'}
              variant="text"
              onClick={() => push(ROUTES.CONTEST)}
            >
              Contest
            </Button>
          </div>

          <Button
            color="black"
            variant="text"
            onClick={() => push(ROUTES.PROFILE)}
          >
            <Avatar
              className="gap-2 flex-row-reverse"
              loading={!user}
              name={user?.name || user?.username}
              shape="square"
              size="xs"
              title={<span>{user?.name || user?.username}</span>}
              showInfo
            />
          </Button>
        </div>
      </header>

      <Drawer
        className="!bg-neutral-100"
        open={isMenuOpen}
        placement="left"
        styles={{
          body: {
            padding: 0,
          },
          header: {
            display: 'none',
          },
        }}
        width="100%"
        onClose={closeMenu}
      >
        <div className="h-[76px] flex items-center px-6 py-4 sticky top-0 z-50 bg-neutral-100">
          <Button color="black" variant="text" onClick={closeMenu}>
            <Icon className="text-2xl" icon="ant-design:close-outlined" />
          </Button>
        </div>

        <div className="px-6 pb-6 overflow-auto h-[calc(100%-76px)] flex flex-col gap-4">
          <Button
            className="h-9 shrink-0 w-full text-base"
            color={pathname === ROUTES.LOBBY ? 'primary' : 'black'}
            variant={pathname === ROUTES.LOBBY ? 'solid' : 'text'}
            onClick={() => {
              closeMenu()
              setTimeout(() => push(ROUTES.LOBBY), 250)
            }}
          >
            Lobby
          </Button>
          <Button
            className="h-9 shrink-0 w-full text-base"
            color={pathname.includes(ROUTES.RANDOMIZER) ? 'primary' : 'black'}
            variant={pathname.includes(ROUTES.RANDOMIZER) ? 'solid' : 'text'}
            onClick={() => {
              closeMenu()
              setTimeout(() => push(ROUTES.RANDOMIZER), 250)
            }}
          >
            Randomizer
          </Button>
          <Button
            className="h-9 shrink-0 w-full text-base"
            color={pathname.includes(ROUTES.CONTEST) ? 'primary' : 'black'}
            variant={pathname.includes(ROUTES.CONTEST) ? 'solid' : 'text'}
            onClick={() => {
              closeMenu()
              setTimeout(() => push(ROUTES.CONTEST), 250)
            }}
          >
            Contest
          </Button>
        </div>
      </Drawer>
    </>
  )
}
