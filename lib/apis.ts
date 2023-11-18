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

  public async getAC() {
    const problemDataProm = fetcher<any>(
      "https://kenkoooo.com/atcoder/resources/problems.json",
      {
        method: "GET",
        headers: this.headers,
      }
    );
    const problemModelDataProm = fetcher<any>(
      "https://kenkoooo.com/atcoder/resources/problem-models.json",
      {
        method: "GET",
        headers: this.headers,
      }
    );
    const contestDataProm = fetcher<any>(
      "https://kenkoooo.com/atcoder/resources/contests.json",
      {
        method: "GET",
        headers: this.headers,
      }
    );
    const contestMap = new Map<string, string>();
    (await contestDataProm).forEach((element: any) => {
      contestMap.set(element.id, element.title);
    });
    const problemModelData = await problemModelDataProm;
    return (await problemDataProm)
      .filter((item: any) => problemModelData.hasOwnProperty(item.id))
      .map((item: any) => ({
        ...item,
        rating: problemModelData[item.id].difficulty,
        contestName: contestMap.get(item.contest_id),
      }));
  }
}

const client = new Client();

export { client };
