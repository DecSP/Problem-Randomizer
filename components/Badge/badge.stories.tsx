import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'

import { Badge, BadgeProps } from './Badge'

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Components/Badge',
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

const schemes: BadgeProps['scheme'][] = [
  'black',
  'white',
  'info',
  'success',
  'danger',
  'warning',
]

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: () => {
    return (
      <div className="flex gap-2.5 overflow-auto">
        {schemes.map((scheme) => (
          <Badge key={scheme} className="capitalize" scheme={scheme}>
            {scheme}
          </Badge>
        ))}
      </div>
    )
  },
}
