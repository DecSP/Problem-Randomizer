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
  title: 'Components/Avatar',
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

export const Size: Story = {
  render: () => {
    return (
      <div className="flex gap-5">
        <Avatar name="John Doe" size="small" />
        <Avatar name="John Doe" size="medium" />
        <Avatar name="John Doe" size="large" />
      </div>
    )
  },
}

export const Shape: Story = {
  render: () => {
    return (
      <div className="flex gap-5">
        <Avatar name="John Doe" shape="circle" />
        <Avatar name="John Doe" shape="square" />
      </div>
    )
  },
}

export const ImageAvatar: Story = {
  render: () => {
    return (
      <div className="flex gap-5">
        <Avatar name="John Doe" src="https://i.pravatar.cc/300" />
        <Avatar
          name="John Doe"
          src="https://i.pravatar.cc/300"
          shape="square"
        />
      </div>
    )
  },
}

export const colors: Story = {
  render: () => {
    return (
      <div className="flex gap-5">
        <Avatar name="John Doe" color="blue" />
        <Avatar name="John Doe" color="green" />
        <Avatar name="John Doe" color="red" />
        <Avatar name="John Doe" color="yellow" />
        <Avatar name="John Doe" color="black" />
        <Avatar name="John Doe" color="gray" />
      </div>
    )
  },
}

export const sideText: Story = {
  render: () => {
    return (
      <div className="flex gap-5">
        <Avatar
          name="John Doe"
          primaryText="John Doe"
          secondaryText="johndoe@mail.com"
        />
        <Avatar name="John Doe" primaryText="John Doe" />
        <Avatar name="John Doe" secondaryText="johndoe@mail.com" />
        <Avatar
          name="John Doe"
          primaryText="John Doe"
          secondaryText="johndoe@mail.com"
          shape="square"
        />
        <Avatar name="John Doe" primaryText="John Doe" shape="square" />
        <Avatar
          name="John Doe"
          secondaryText="johndoe@mail.com"
          shape="square"
        />
      </div>
    )
  },
}

export const presence: Story = {
  render: () => {
    return (
      <div className="flex gap-5">
        <Avatar name="John Doe" presence="online" />
        <Avatar name="John Doe" presence="offline" />
        <Avatar name="John Doe" presence="away" />
        <Avatar name="John Doe" presence="busy" />
      </div>
    )
  },
}
