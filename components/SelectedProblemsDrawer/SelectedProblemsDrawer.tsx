import { Drawer } from 'antd'
// import { ProblemFormFields } from '../ProblemFilterForm'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { ROUTES } from '@/constants/routes'
import { useProblemContext } from '@/context/problem'

import { Button } from '../Button'
import { Empty } from '../Empty'
import { ProblemCard } from '../ProblemCard'

type SelectedProblemsDrawerProps = {
  open?: boolean;
  onClose: () => void
}

type SelectedProblemsDrawerWrapperProps = {
  children: ReactNode;
  open?: boolean;
  onClose: () => void;
  rootClassName?: string;
  width?: string | number;
  selectedProblems: number[]
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
  const { push } = useRouter()

  // const onSubmit = (values: { minutes: string }) => {
  //   console.log(JSON.stringify(values))
  // }

  return (
    <Drawer
      placement="right"
      open={open}
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
        <>
          {/* <Form autoComplete="off" onFinish={onSubmit}>
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
              Start Solving
            </button>
          </Form> */}

          <Button
            disabled={disabled}
            onClick={() => push(ROUTES.CREATE_CONTEST)}
          >
            Continue
          </Button>
        </>
      }
      onClose={onClose}
    >
      {children}
    </Drawer>
  )
}

export const SelectedProblemsDrawer = (props: SelectedProblemsDrawerProps) => {
  const { open, onClose } = props
  const { selectedProblemIds, problems } = useProblemContext()

  const drawerInner =
    selectedProblemIds.length > 0 ? (
      <div className="flex flex-col gap-4">
        {selectedProblemIds.map((p) => {
          const currentProblem = problems.find((problem) => problem.id === p)

          return currentProblem ? (
            <ProblemCard key={currentProblem?.id} problem={currentProblem} />
          ) : null
        })}
      </div>
    ) : (
      <div className="flex items-center h-full justify-center">
        <Empty message="No problems added" />
      </div>
    )

  return (
    <>
      <DrawerWrapper
        open={open}
        selectedProblems={selectedProblemIds}
        rootClassName="hidden md:block"
        onClose={onClose}
      >
        {drawerInner}
      </DrawerWrapper>

      <DrawerWrapper
        open={open}
        selectedProblems={selectedProblemIds}
        width="100%"
        rootClassName="block md:hidden"
        onClose={onClose}
      >
        {drawerInner}
      </DrawerWrapper>
    </>
  )
}
