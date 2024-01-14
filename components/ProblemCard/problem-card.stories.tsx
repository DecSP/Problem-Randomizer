import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'
import { ProblemContextProvider } from '@/context/problem'
import { ProblemCard } from './ProblemCard'

const meta: Meta<typeof ProblemCard> = {
  component: ProblemCard,
  title: 'Problem/ProblemCard',
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
type Story = StoryObj<typeof ProblemCard>

export const Default: Story = {
  render: () => {
    return (
      <div className="overflow-auto">
        <ProblemContextProvider>
          <div className="space-y-4">
            <ProblemCard
              problem={{
                name: 'Reading Books',
                contest_name: 'Sorting and Searching',
                id: 42,
                rating: 1000,
                source_type: 'cses',
                url: 'https://cses.fi/problemset/task/1631',
              }}
            />
            <ProblemCard
              problem={{
                name: 'Sleep in Class',
                contest_name: 'Codeforces Round 378 (Div. 2)',
                id: 270023,
                rating: 2400,
                source_type: 'codeforces',
                url: 'https://codeforces.com/problemset/problem/733/E',
              }}
            />
            <ProblemCard
              problem={{
                name: 'Daydream',
                contest_name: 'AtCoder Beginner Contest 049',
                id: 11749,
                rating: 930,
                source_type: 'atcoder',
                url: 'https://atcoder.jp/contests/abc049/tasks/arc065_a',
              }}
            />
          </div>
        </ProblemContextProvider>
      </div>
    )
  },
}
