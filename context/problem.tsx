import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Problem } from '@/lib/schema'

export type SidebarVariant = 'main' | 'app-detail'

type ProblemContextValue = {
  problems: Problem[]
  setProblems: Dispatch<SetStateAction<Problem[]>>
  setProblemIds: Dispatch<SetStateAction<number[]>>
  selectedProblemIds: number[]
  // eslint-disable-next-line
  addProblem: (problem: number) => void
  // eslint-disable-next-line
  removeProblem: (problem: number) => void
  isEverOpened: boolean
  setIsEverOpened: Dispatch<SetStateAction<boolean>>
}

const ProblemContext = createContext<ProblemContextValue | undefined>(undefined)

function ProblemContextProvider({ children }: { children: ReactNode }) {
  const [problemIds, setProblemIds] = useState<number[]>([])
  const [problems, setProblems] = useState<Problem[]>([])
  const [isEverOpened, setIsEverOpened] = useState(false)

  const addProblem = useCallback(
    (problem: number) => {
      setProblemIds([...problemIds, problem])
    },
    [problemIds],
  )

  const removeProblem = useCallback(
    (problem: number) => {
      const newProblems = problemIds.filter((p) => p !== problem)
      setProblemIds(newProblems)
    },
    [problemIds],
  )

  const contextValue: ProblemContextValue = useMemo(
    () => ({
      problems,
      setProblems,
      selectedProblemIds: problemIds,
      setProblemIds,
      addProblem,
      removeProblem,
      isEverOpened,
      setIsEverOpened,
    }),
    [problems, problemIds, addProblem, removeProblem, isEverOpened],
  )

  return (
    <ProblemContext.Provider value={contextValue}>
      {children}
    </ProblemContext.Provider>
  )
}

const useProblemContext = () =>
  useContext(ProblemContext) as ProblemContextValue

export {
  ProblemContext,
  ProblemContextProvider,
  type ProblemContextValue,
  useProblemContext,
}
