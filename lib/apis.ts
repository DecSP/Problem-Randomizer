import { ProblemSources } from '../types/problem-source'
import fetcher from './fetcher'
import { Problem } from './schema'

type Headers = Record<string, string>

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export class Client {
  headers: Headers = {
    'Content-Type': 'application/json',
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
    return fetcher<any>(`${BASE_URL}/api/problems/${problem_id}/`, {
      method: 'GET',
    })
  }

  public async getCFUserStatus(user: string) {
    const data = await fetcher<any>(
      `https://codeforces.com/api/user.status?handle=${user}`,
    )
    return data['result']
  }
}

const client = new Client()

export { client }
