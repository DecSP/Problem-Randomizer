import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'
import { ProblemSourceBadge } from './ProblemSourceBadge'

const meta: Meta<typeof ProblemSourceBadge> = {
  component: ProblemSourceBadge,
  title: 'Problem/ProblemSourceBadge',
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

export default meta
type Story = StoryObj<typeof ProblemSourceBadge>

export const Default: Story = {
  render: () => {
    return (
      <div className="overflow-auto">
        <div className="flex gap-2.5 pb-1">
          <ProblemSourceBadge source="codeforces" />
          <ProblemSourceBadge source="atcoder" />
          <ProblemSourceBadge source="cses" />
        </div>
      </div>
    )
  },
}
