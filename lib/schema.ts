import { ProblemSources } from '../types/problem-source'
export interface IconProps {
  height?: number;
  width?: number;
  className?: string
}

export interface Problem {
  id: number;
  source_type: ProblemSources;
  name: string;
  contest_name: string;
  url: string;
  rating: number
}
