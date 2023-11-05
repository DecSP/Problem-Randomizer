import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header/Header";
import { IconLoading } from "../components/icons";
import { UserCard } from "../components/UserCard";
import useFetch from "../hooks/useFetch";
import { client } from "../lib/apis";

const Home: NextPage = () => {
  const { data, isLoading } = useFetch({
    api: () => client.getUsers(),
  });

  let content: JSX.Element | null = null;
  if (isLoading) {
    content = (
      <div className="w-full flex justify-center p-6">
        <div className="animate-spin w-max">
          <IconLoading />
        </div>
      </div>
    );
  } else if (!isLoading && (!data || !data?.length)) {
    content = <div className="w-full text-center p-6">No users found</div>;
  } else if (data?.length) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[42px]">
        {data.map((d) => (
          <UserCard key={d.id} data={d} className="!w-full" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Users</title>
        <meta name="description" content="List user page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="bg-blue--light min-h-screen pt-[72px]">
        <section>
          <div className="section-container px-10 md:px-[90px] py-[43px]">
            <h1 className="text-2xl leading-9 mb-10">List user page</h1>
            {content}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
