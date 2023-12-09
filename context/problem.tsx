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
  problems: Problem[]
  setProblems: Dispatch<SetStateAction<Problem[]>>
  selectedProblemUrls: string[]
  // eslint-disable-next-line
  addProblem: (problem: string) => void
  // eslint-disable-next-line
  removeProblem: (problem: string) => void
}

const ProblemContext = createContext<ProblemContextValue | undefined>(undefined)

function ProblemContextProvider({ children }: { children: ReactNode }) {
  const [problemUrls, setProblemUrls] = useState<string[]>([])
  const [problems, setProblems] = useState<Problem[]>([])

  const addProblem = (problem: string) => {
    setProblemUrls([...problemUrls, problem])
  }

  const removeProblem = (problem: string) => {
    const newProblems = problemUrls.filter((p) => p !== problem)
    setProblemUrls(newProblems)
  }

  const contextValue: ProblemContextValue = useMemo(
    () => ({
      problems,
      setProblems,
      selectedProblemUrls: problemUrls,
      addProblem,
      removeProblem,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [problemUrls],
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
  type ProblemContextValue,
  ProblemContext,
  ProblemContextProvider,
  useProblemContext,
}
