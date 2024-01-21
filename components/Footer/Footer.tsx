import Image from 'next/image'
import { useState } from 'react'

import {
  AT_CODER_URL,
  CODEFORCES_URL,
  CSES_URL,
  GITHUB_ORG_URL,
  EMAIL_URL,
  DESIGN_SYSTEM_URL,
} from '@/constants/urls'

import { Button } from '../Button'
import { WalkthroughDrawer } from '../WalkthroughDrawer'
import { Icon } from '@iconify/react'

export const Footer = () => {
  const [isWalkthroughDrawerOpen, setIsWalkthroughDrawerOpen] = useState(false)

  return (
    <>
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600" />
      <footer className="w-screen bg-white/60 backdrop-blur-sm px-6 pt-12 md:pt-16 pb-[88px]">
        <div className="section-container flex justify-between items-start w-full gap-12 flex-wrap">
          <div className="flex flex-col sm:flex-row gap-6 md:gap-12 items-start">
            <Image
              alt="Problem Randomizer Logo"
              className="select-none"
              height={44}
              src="/images/prob-rand-logo.png"
              width={44}
              priority
            />

            <div>
              <h3 className="font-semibold tracking-[2px] text-sm">
                Resources
              </h3>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <Button
                    className="!h-max"
                    color="black"
                    variant="text"
                    onClick={() => setIsWalkthroughDrawerOpen(true)}
                  >
                    Walkthrough
                  </Button>
                </li>
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <a href={DESIGN_SYSTEM_URL} rel="noreferrer" target="_blank">
                    <Button className="!h-max" color="black" variant="text">
                      Design System
                    </Button>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold tracking-[2px] text-sm">
                Problem sources
              </h3>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <a href={CODEFORCES_URL} rel="noreferrer" target="_blank">
                    <Button className="!h-max" color="black" variant="text">
                      Codeforces
                    </Button>
                  </a>
                </li>
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <a href={AT_CODER_URL} rel="noreferrer" target="_blank">
                    <Button className="!h-max" color="black" variant="text">
                      AtCoder
                    </Button>
                  </a>
                </li>
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <a href={CSES_URL} rel="noreferrer" target="_blank">
                    <Button className="!h-max" color="black" variant="text">
                      CSES
                    </Button>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-col items-center sm:items-end gap-2 w-full sm:w-max text-neutral-600 text-center">
            <p className="text-sm">
              Copyright &copy; 2023{' '}
              <span
                className="font-medium"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                Problem Randomizer
              </span>
              . All rights reserved.
            </p>
            <div className="flex gap-2 items-center">
              <a
                className="h-6"
                href={GITHUB_ORG_URL}
                rel="noreferrer"
                target="_blank"
              >
                <Button className="!h-max" color="black" variant="text">
                  <Icon
                    className="text-2xl text-neutral-900"
                    icon="ant-design:github-outlined"
                  />
                </Button>
              </a>
              <a className="h-6" href={EMAIL_URL}>
                <Button className="!h-max" color="black" variant="text">
                  <Icon
                    className="text-2xl text-neutral-900"
                    icon="mdi:email-edit-outline"
                  />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <WalkthroughDrawer
        open={isWalkthroughDrawerOpen}
        onClose={() => setIsWalkthroughDrawerOpen(false)}
      />
    </>
  )
}
