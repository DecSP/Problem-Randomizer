import { Drawer } from 'antd'
import { useProblemContext } from '../../context/problem'
import { ProblemCard } from '../ProblemCard'

type SelectedProblemsDrawerProps = {
  open?: boolean
  onClose: () => void
}

export const SelectedProblemsDrawer = (props: SelectedProblemsDrawerProps) => {
  const { open, onClose } = props
  const { selectedProblemUrls, problems } = useProblemContext()

  const drawerInner = (
    <div>
      {selectedProblemUrls.length > 0 ? (
        <div className="flex flex-col gap-4">
          {selectedProblemUrls.map((p) => {
            const currentProblem = problems.find((problem) => problem.url === p)

            return currentProblem ? (
              <ProblemCard
                key={currentProblem?.url}
                problem={currentProblem}
                // showCheckbox={false}
              />
            ) : null
          })}
        </div>
      ) : (
        <div>No problem added</div>
      )}
    </div>
  )

  return (
    <>
      <Drawer
        placement="right"
        open={open}
        onClose={onClose}
        rootClassName="hidden md:block"
      >
        {drawerInner}
      </Drawer>

      <Drawer
        placement="right"
        open={open}
        onClose={onClose}
        width="100%"
        rootClassName="block md:hidden"
      >
        {drawerInner}
      </Drawer>
    </>
  )
}
