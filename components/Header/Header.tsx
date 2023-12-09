import { Icon } from '@iconify/react'
import Image from 'next/image'

export const Header = () => {
  return (
    <header className="w-screen bg-white/60 backdrop-blur-sm px-7 py-5 fixed top-0 z-40">
      <div className="section-container text-black flex justify-between items-center">
        <Image
          src="/images/prob-rand-logo.png"
          alt="Problem Randomizer Logo"
          width={44}
          height={44}
          priority
        />
        <div className="flex items-center">
          <a
            href="https://github.com/DecSP/Problem-Randomizer"
            target="_blank"
            rel="noreferrer"
            data-testid="help-button"
            className="text-2xl"
          >
            <Icon icon="codicon:github-inverted" />
          </a>
        </div>
      </div>
    </header>
  )
}
