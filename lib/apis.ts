import fetcher from "./fetcher";
import { GetUsersData, CFProblemData } from "./schema";

type Headers = Record<string, string>;

export class Client {
  headers: Headers = {
    "Content-Type": "application/json",
  };

  public getUsers() {
    return fetcher<GetUsersData[]>(
      "https://jsonplaceholder.typicode.com/users",
      {
        method: "GET",
        headers: this.headers,
      }
    );
  }

  public async getCF(): Promise<CFProblemData> {
    const problemData = await fetcher<any>(
      "https://codeforces.com/api/problemset.problems",
      {
        method: "GET",
      }
    );
    const contestData = await fetcher<any>(
      "https://codeforces.com/api/contest.list",
      {
        method: "GET",
      }
    );
    return {
      problems: problemData["result"]["problems"],
      contests: contestData["result"],
    };
  }

  public async getCFUserStatus(user: string) {
    const data = await fetcher<any>(
      `https://codeforces.com/api/user.status?handle=${user}`
    );
    return data["result"];
  }

  public async getAC(user: string) {
    const data = await fetcher<any>(
      `https://codeforces.com/api/user.status?handle=${user}`
    );
    return data["result"];
  }
}

const client = new Client();

export { client };
