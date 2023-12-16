import Image from 'next/image'
import { useState } from 'react'
import { WalkthroughDrawer } from '../WalkthroughDrawer'

export const Footer = () => {
  const [isWalkthroughDrawerOpen, setIsWalkthroughDrawerOpen] = useState(false)

  return (
    <>
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600" />
      <footer className="w-screen bg-white/60 backdrop-blur-sm px-7 pt-12 md:pt-16 pb-[88px]">
        <div className="section-container flex justify-between items-start w-full gap-12 flex-wrap">
          <div className="flex flex-col sm:flex-row gap-6 md:gap-12 items-start">
            <Image
              src="/images/prob-rand-logo.png"
              alt="Problem Randomizer Logo"
              width={44}
              height={44}
              priority
              className="select-none"
            />

            <div>
              <h3 className="font-semibold tracking-[2px] text-sm">
                Resources
              </h3>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <a href="#" rel="noreferrer" target="_blank">
                    Organization
                  </a>
                </li>
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <button onClick={() => setIsWalkthroughDrawerOpen(true)}>
                    Walkthrough
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold tracking-[2px] text-sm">
                Problem sources
              </h3>
              <ul className="mt-2 flex flex-col gap-1">
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <a
                    href="https://codeforces.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Codeforces
                  </a>
                </li>
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <a
                    href="https://atcoder.jp/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    AtCoder
                  </a>
                </li>
                <li className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors duration-[250]">
                  <a href="https://cses.fi/" rel="noreferrer" target="_blank">
                    CSES
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-sm text-neutral-600 text-center">
            Copyright &copy; 2023{' '}
            <span className="font-bold" style={{ fontFamily: 'Space Mono' }}>
              Problem Randomizer
            </span>
            , All rights reserved.
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
