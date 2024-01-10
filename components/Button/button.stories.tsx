import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'
import cx from 'classnames'

import { Button, ButtonProps } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <div className="overflow-auto pr-0.5">
            <Controls />
          </div>
          <Stories />
        </>
      ),
    },
  },
}

const colors: ButtonProps['color'][] = [
  'primary',
  'black',
  'white',
  'info',
  'success',
  'danger',
  'warning',
]
const variants: ButtonProps['variant'][] = ['solid', 'outline', 'text']

export default meta
type Story = StoryObj<typeof Button>

export const Variants: Story = {
  render: () => {
    return (
      <div className="space-y-2.5 overflow-auto">
        {variants.map((variant) => (
          <div key={variant} className="flex gap-2.5">
            {colors.map((color) => (
              <Button
                key={`${color}-${variant}`}
                className={cx('capitalize', {
                  'w-12 !h-max': variant === 'text',
                  'w-[88px]': variant !== 'text',
                })}
                color={color}
                variant={variant}
              >
                {variant}
              </Button>
            ))}
          </div>
        ))}
      </div>
    )
  },
}

export const Colors: Story = {
  render: () => {
    return (
      <div className="space-y-2.5 overflow-auto">
        <div className="flex gap-2.5">
          {colors.map((color) => (
            <Button key={color} className="capitalize" color={color}>
              {color}
            </Button>
          ))}
        </div>
        <div className="flex gap-2.5">
          {colors.map((color) => (
            <Button
              key={`${color}-disabled`}
              className="capitalize"
              color={color}
              disabled
            >
              {color}
            </Button>
          ))}
        </div>
      </div>
    )
  },
}

export const Loading: Story = {
  render: () => {
    return (
      <div className="flex gap-2.5 overflow-auto">
        {colors.map((color) => (
          <Button
            key={`${color}-disabled`}
            className="w-16"
            color={color}
            loading
          >
            {color}
          </Button>
        ))}
      </div>
    )
  },
}
