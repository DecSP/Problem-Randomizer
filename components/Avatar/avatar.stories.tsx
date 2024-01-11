import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import { Meta, StoryObj } from '@storybook/react'

import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Common/Avatar',
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
type Story = StoryObj<typeof Avatar>

export const Sizes: Story = {
  render: () => {
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-2.5 items-start">
          <Avatar name="John Doe" size="small" />
          <Avatar name="John Doe" size="medium" />
          <Avatar name="John Doe" size="large" />
        </div>
      </div>
    )
  },
}

export const Shapes: Story = {
  render: () => {
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-2.5 items-start">
          <Avatar name="John Doe" shape="circle" />
          <Avatar name="John Doe" shape="square" />
        </div>
      </div>
    )
  },
}

export const ImageAvatar: Story = {
  render: () => {
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-2.5 items-start">
          <Avatar name="John Doe" src="https://i.pravatar.cc/300" />
          <Avatar
            name="John Doe"
            shape="square"
            src="https://i.pravatar.cc/300"
          />
        </div>
      </div>
    )
  },
}

export const colors: Story = {
  render: () => {
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-2.5 items-start">
          <Avatar color="primary" name="John Doe" />
          <Avatar color="black" name="John Doe" />
          <Avatar color="white" name="John Doe" />
          <Avatar color="blue" name="John Doe" />
          <Avatar color="green" name="John Doe" />
          <Avatar color="red" name="John Doe" />
          <Avatar color="yellow" name="John Doe" />
        </div>
      </div>
    )
  },
}

export const showInfo: Story = {
  render: () => {
    return (
      <div className="overflow-x-auto space-y-2.5">
        <div className="grid grid-cols-2 grid-rows-2 w-max gap-2.5 justify-start">
          <Avatar description="johndoe@mail.com" name="John Doe" showInfo />
          <Avatar
            description="johndoe@mail.com"
            name="John Doe"
            shape="square"
            showInfo
          />
          <Avatar name="John Doe" showInfo />
          <Avatar name="John Doe" shape="square" showInfo />
          <Avatar description="johndoe@mail.com" showInfo />
          <Avatar description="johndoe@mail.com" shape="square" showInfo />
        </div>
      </div>
    )
  },
}

export const presences: Story = {
  render: () => {
    return (
      <div className="overflow-x-auto">
        <div className="flex gap-2.5 items-start">
          <Avatar name="John Doe" presence="online" />
          <Avatar name="John Doe" presence="offline" />
          <Avatar name="John Doe" presence="away" />
          <Avatar name="John Doe" presence="do-not-disturb" />
        </div>
      </div>
    )
  },
}
