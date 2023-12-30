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

export interface LoginResponse extends BaseResponse<LoginResponseData> {}
