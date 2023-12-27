import { Icon } from '@iconify/react'
import Image from 'next/image'
import { GITHUB_ORG_URL } from '@/constants/urls'

export const Header = () => {
  return (
    <header className="w-screen bg-neutral-100/60 backdrop-blur-sm px-6 py-4 fixed top-0 z-40">
      <div className="section-container text-black flex justify-between items-center">
        <Image
          src="/images/prob-rand-logo.png"
          alt="Problem Randomizer Logo"
          width={44}
          height={44}
          priority
          className="select-none"
        />
        <div className="flex items-center">
          <a
            href={GITHUB_ORG_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="help-button"
            className="text-2xl text-black hover:text-neutral-600 transition-colors duration-[250]"
          >
            <Icon icon="codicon:github-inverted" />
          </a>
        </div>
      </div>
    </header>
  )
}
