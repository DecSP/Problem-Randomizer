import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'
import { useState } from 'react'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Common/Checkbox',
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
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false)

    return (
      <div className="overflow-auto">
        <Checkbox
          checked={isSelected}
          label="Checkbox"
          onChange={() => setIsSelected(!isSelected)}
        />
      </div>
    )
  },
}

export const CheckedLabel: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false)

    return (
      <div className="overflow-auto">
        <Checkbox
          checked={isSelected}
          checkedLabel="Checked"
          label="Check me"
          onChange={() => setIsSelected(!isSelected)}
        />
      </div>
    )
  },
}

export const Responsive: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false)

    return (
      <div className="overflow-auto">
        <Checkbox
          checked={isSelected}
          label="Large screen (Try resizing the window)"
          mobileLabel="Small screen (Try resizing the window)"
          onChange={() => setIsSelected(!isSelected)}
        />
      </div>
    )
  },
}

export const Rtl: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false)

    return (
      <div className="overflow-auto">
        <Checkbox
          checked={isSelected}
          label="Checkbox"
          rtl
          onChange={() => setIsSelected(!isSelected)}
        />
      </div>
    )
  },
}
