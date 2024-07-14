import { ProblemSources } from '@/types/problem-source'
import fetcher from './fetcher'
import {
  BaseResponse,
  LoginPayload,
  LoginResponse,
  Problem,
  ProblemDetail,
  SignUpPayload,
  SignUpResponse,
  UserData,
  CreateContestPayload,
  ContestResponse,
  ListContestResponse,
  UpdateUserPayload,
} from './schema'

type Headers = Record<string, string>

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export class Client {
  headers: Headers = {
    'Content-Type': 'application/json',
  }

  privateHeaders: HeadersInit = {
    ...this.headers,
  }

  public async getProblems(source_type: ProblemSources) {
    return fetcher<Problem[]>(
      `${BASE_URL}/api/problems/by-source/${source_type}/`,
      {
        method: 'GET',
      },
    )
  }

  public async getProblem(problem_id: number) {
    return fetcher<ProblemDetail>(`${BASE_URL}/api/problems/${problem_id}/`, {
      method: 'GET',
    })
  }

  public async createContest(payload: CreateContestPayload) {
    return fetcher<ContestResponse>(`${BASE_URL}/api/contests/`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  public async getContest(contestId: number) {
    return fetcher<ContestResponse>(`${BASE_URL}/api/contests/${contestId}/`, {
      headers: this.privateHeaders,
      method: 'GET',
    })
  }

  public async getListContest() {
    return fetcher<ListContestResponse>(`${BASE_URL}/api/contests/`, {
      headers: this.privateHeaders,
      method: 'GET',
    })
  }

  public async getCFUserStatus(user: string) {
    const data = await fetcher<any>(
      `https://codeforces.com/api/user.status?handle=${user}`,
    )
    return data['result']
  }

  public setAuthToken(token: string) {
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Token ${token}`,
    }
  }

  public clearAuthToken() {
    this.privateHeaders = { ...this.headers }
  }

  public async signUp(payload: SignUpPayload) {
    return fetcher<SignUpResponse>(`${BASE_URL}/api/users/signup`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  public async login(payload: LoginPayload) {
    return fetcher<LoginResponse>(`${BASE_URL}/api/users/login`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  public async getUser() {
    return fetcher<BaseResponse<UserData>>(`${BASE_URL}/api/users/me`, {
      headers: this.privateHeaders,
      method: 'GET',
    })
  }

  public async updateUser(payload: UpdateUserPayload) {
    return fetcher<BaseResponse<UserData>>(`${BASE_URL}/api/users/me`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }
}

const client = new Client()

export { client }
