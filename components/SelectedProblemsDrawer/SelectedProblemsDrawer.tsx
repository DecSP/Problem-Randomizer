import { Drawer, Form, Input } from 'antd'
import { ReactNode } from 'react'
import { useProblemContext } from '../../context/problem'
import { ProblemCard } from '../ProblemCard'
import { ProblemFormFields } from '../ProblemFilterForm'
import cx from 'classnames'

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
  selectedProblems: string[]
}

const DrawerWrapper = ({
  open,
  onClose,
  children,
  rootClassName,
  width,
  selectedProblems,
}: SelectedProblemsDrawerWrapperProps) => {
  const disabled = selectedProblems.length === 0

  const onSubmit = (values: { minutes: string }) => {
    console.log(JSON.stringify(values))
  }

  return (
    <Drawer
      placement="right"
      open={open}
      onClose={onClose}
      width={width}
      rootClassName={rootClassName}
      className="!bg-neutral-100"
      styles={{
        header: {
          backgroundColor: '#FFFFFF',
        },
        footer: {
          backgroundColor: '#FFFFFF',
          padding: '24px',
          transition: 'opacity 0.25s',
          ...(disabled
            ? {
                opacity: 0.4,
                cursor: 'not-allowed',
              }
            : {}),
        },
      }}
      footer={
        <Form autoComplete="off" onFinish={onSubmit}>
          <Form.Item<ProblemFormFields>
            label="Time (minutes)"
            name="minutes"
            className="!-mb-2"
          >
            <Input
              type="number"
              min={0}
              className="!bg-transparent"
              disabled={disabled}
            />
          </Form.Item>

          <button
            className={cx(
              'form-submit-button mt-4 hover:opacity-80 !h-12 transition-all duration-[250] bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600',
              {
                '!opacity-100 cursor-not-allowed': disabled,
              },
            )}
            type="submit"
            disabled={disabled}
          >
            {/* <div className="w-full h-full flex items-center justify-center bg-white text-black transition-colors duration-[250]"> */}
            Start Solving
            {/* </div> */}
          </button>
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
        selectedProblems={selectedProblemUrls}
        rootClassName="hidden md:block"
      >
        {drawerInner}
      </DrawerWrapper>

      <DrawerWrapper
        open={open}
        onClose={onClose}
        selectedProblems={selectedProblemUrls}
        width="100%"
        rootClassName="block md:hidden"
      >
        {drawerInner}
      </DrawerWrapper>
    </>
  )
}
