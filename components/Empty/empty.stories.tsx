import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'
import { Empty } from './Empty'

const meta: Meta<typeof Empty> = {
  component: Empty,
  title: 'Common/Empty',
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
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => {
    return (
      <div className="overflow-auto">
        <Empty message="No problems added" />
      </div>
    )
  },
}
