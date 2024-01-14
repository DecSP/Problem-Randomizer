import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuthContext } from '@/context/auth'
import { ROUTES } from '@/constants/routes'
import { Avatar } from '../Avatar'
import { Button } from '../Button'

export const Header = () => {
  const { user } = useAuthContext()
  const { push } = useRouter()

  return (
    <header className="w-screen bg-neutral-100/60 backdrop-blur-sm px-6 py-4 fixed top-0 z-40">
      <div className="section-container text-black flex justify-between items-center gap-6">
        <Button
          className="h-[44px] shrink-0"
          variant="text"
          onClick={() => push(ROUTES.RANDOMIZER)}
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
  )
}
