import fetcher from './fetcher'
import { GetUsersData, Problem } from './schema'
import { QuestionSources } from '../types/questions-source'

type Headers = Record<string, string>

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export class Client {
  headers: Headers = {
    'Content-Type': 'application/json',
  }

  public getUsers() {
    return fetcher<GetUsersData[]>(
      'https://jsonplaceholder.typicode.com/users',
      {
        method: 'GET',
        headers: this.headers,
      },
    )
  }

  public async getProblems(source_type: QuestionSources) {
    return fetcher<Problem[]>(`${BASE_URL}/api/problems/${source_type}/`, {
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
