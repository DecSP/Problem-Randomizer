import { ProblemSources } from '@/types/problem-source'
export interface IconProps {
  height?: number
  width?: number
  className?: string
}

export interface BaseResponse<T> {
  statusCode?: number
  message?: any
  data: T
}

export interface Problem {
  id: number
  source_type: ProblemSources
  name: string
  contest_name: string
  url: string
  rating: number
}

export interface ProblemDetail extends Problem {
  content: Array<ProblemSection>
}

export interface ProblemSection {
  section: string
  children: Array<ProblemContentChild>
}

export const validProblemContentChildTagNames = [
  'p',
  'pre',
  'ul',
  'li',
  'center',
] as const
export type ProblemContentChildTagName =
  (typeof validProblemContentChildTagNames)[number]
export function isProblemContentChildTagName(
  str: string,
): str is ProblemContentChildTagName {
  return validProblemContentChildTagNames.includes(
    str as ProblemContentChildTagName,
  )
}
export interface ProblemContentChild {
  tag: ProblemContentChildTagName
  content: Array<ProblemContentChild | ProblemContentBaseChild>
}

export type ProblemContentBaseChild =
  | {
      tag: string
      content: string
    }
  | string

export interface SignUpPayload {
  name?: string
  username: string
  password: string
}

export interface SignUpResponse extends BaseResponse<boolean> {}

export interface LoginPayload {
  username: string
  password: string
}

export interface UserData {
  name?: string
  username: string
}

export interface LoginResponseData {
  token: string
  user: UserData
}

export interface ContestResponseData {
  id: number
  title: string
  description: string
  is_public: boolean
  duration: number
  start_time: string
  penalty: number
  owner: number
  participants: number[]
  problems: number[]
}

export interface CreateContestPayload {
  title: string
  description: string
  is_public: boolean
  duration: number
  start_time: string
  penalty: number
  problems: number[]
}

export interface ContestResponse extends BaseResponse<ContestResponseData> {}

export interface ListContestResponse
  extends BaseResponse<Array<ContestResponseData>> {}

export interface LoginResponse extends BaseResponse<LoginResponseData> {}
