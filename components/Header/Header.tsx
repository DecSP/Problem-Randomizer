import { Icon } from '@iconify/react'
import Image from 'next/image'

import { GITHUB_ORG_URL } from '@/constants/urls'

export const Header = () => {
  return (
    <header className="w-screen bg-neutral-100/60 backdrop-blur-sm px-6 py-4 fixed top-0 z-40">
      <div className="section-container text-black flex justify-between items-center">
        <Image
          alt="Problem Randomizer Logo"
          className="select-none"
          height={44}
          src="/images/prob-rand-logo.png"
          width={44}
          priority
        />
        <div className="flex items-center">
          <a
            className="text-2xl text-black hover:text-neutral-600 transition-colors duration-[250]"
            data-testid="help-button"
            href={GITHUB_ORG_URL}
            rel="noreferrer"
            target="_blank"
          >
            <Icon icon="codicon:github-inverted" />
          </a>
        </div>
      </div>
    </header>
  )
}
