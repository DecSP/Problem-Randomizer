import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Problem } from '../lib/schema'

export type SidebarVariant = 'main' | 'app-detail'

type ProblemContextValue = {
  problems: Problem[];
  setProblems: Dispatch<SetStateAction<Problem[]>>;
  selectedProblemIds: number[];
  // eslint-disable-next-line
  addProblem: (problem: number) => void
  // eslint-disable-next-line
  removeProblem: (problem: number) => void
}

const ProblemContext = createContext<ProblemContextValue | undefined>(undefined)

function ProblemContextProvider({ children }: { children: ReactNode }) {
  const [problemIds, setProblemIds] = useState<number[]>([])
  const [problems, setProblems] = useState<Problem[]>([])

  const addProblem = (problem: number) => {
    setProblemIds([...problemIds, problem])
  }

  const removeProblem = (problem: number) => {
    const newProblems = problemIds.filter((p) => p !== problem)
    setProblemIds(newProblems)
  }

  const contextValue: ProblemContextValue = useMemo(
    () => ({
      problems,
      setProblems,
      selectedProblemIds: problemIds,
      addProblem,
      removeProblem,
    }),
    [problemIds],
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
