import { Drawer, Form, Input } from 'antd'
import { ReactNode } from 'react'
import { useProblemContext } from '../../context/problem'
import { ProblemCard } from '../ProblemCard'
import { ProblemFormFields } from '../ProblemFilterForm'

type SelectedProblemsDrawerProps = {
  open?: boolean
  onClose: () => void
}

type SelectedProblemsDrawerWrapperProps = {
  children: ReactNode
  open?: boolean
  onClose: () => void
  rootClassName?: string
  width?: string | number
}

const DrawerWrapper = ({
  open,
  onClose,
  children,
  rootClassName,
  width,
}: SelectedProblemsDrawerWrapperProps) => {
  return (
    <Drawer
      placement="right"
      open={open}
      onClose={onClose}
      width={width}
      rootClassName={rootClassName}
      className="!bg-gray-100"
      styles={{
        header: {
          backgroundColor: '#FFFFFF',
        },
        footer: {
          backgroundColor: '#FFFFFF',
          padding: '24px',
        },
      }}
      footer={
        <Form autoComplete="off">
          <Form.Item<ProblemFormFields>
            label="Time (minutes)"
            name="minutes"
            className="!-mb-2"
          >
            <Input type="number" min={0} className="!bg-transparent" />
          </Form.Item>
        </Form>
      }
    >
      {children}
    </Drawer>
  )
}

export const SelectedProblemsDrawer = (props: SelectedProblemsDrawerProps) => {
  const { open, onClose } = props
  const { selectedProblemUrls, problems } = useProblemContext()

  const drawerInner =
    selectedProblemUrls.length > 0 ? (
      <div className="flex flex-col gap-4">
        {selectedProblemUrls.map((p) => {
          const currentProblem = problems.find((problem) => problem.url === p)

          return currentProblem ? (
            <ProblemCard key={currentProblem?.url} problem={currentProblem} />
          ) : null
        })}
      </div>
    ) : (
      <div className="w-full h-full flex justify-center items-center font-semibold tracking-[2px]">
        No problems added
      </div>
    )

  return (
    <>
      <DrawerWrapper
        open={open}
        onClose={onClose}
        rootClassName="hidden md:block"
      >
        {drawerInner}
      </DrawerWrapper>

      <DrawerWrapper
        open={open}
        onClose={onClose}
        width="100%"
        rootClassName="block md:hidden"
      >
        {drawerInner}
      </DrawerWrapper>
    </>
  )
}
