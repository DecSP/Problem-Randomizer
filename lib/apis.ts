import fetcher from "./fetcher";
import { GetUsersData } from "./schema";

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
}

const client = new Client();

export { client };
