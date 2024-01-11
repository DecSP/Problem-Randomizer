import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'
import { TabContent, TabTrigger, Tabs, TabsList } from './Tabs'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Common/Tabs',
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
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => {
    return (
      <div className="overflow-auto">
        <Tabs value="problems">
          <TabsList>
            <TabTrigger value="problems">Problems</TabTrigger>
            <TabTrigger value="submissions">Submissions</TabTrigger>
            <TabTrigger value="editorials">Editorials</TabTrigger>
          </TabsList>

          <TabContent className="p-4" value="problems">
            Problems
          </TabContent>
          <TabContent className="p-4" value="submissions">
            Submissions
          </TabContent>
          <TabContent className="p-4" value="editorials">
            Editorials
          </TabContent>
        </Tabs>
      </div>
    )
  },
}
