import Head from "next/head";
import { Counter } from "../components/Counter";
import { Header } from "../components/Header";

const CounterPage = () => {
  return (
    <div>
      <Head>
        <title>Counter</title>
        <meta name="description" content="Counter page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="bg-blue--light min-h-screen pt-[72px]">
        <section>
          <div className="section-container px-10 md:px-[90px] py-[43px]">
            <h1 className="text-2xl leading-9 mb-10">Counter</h1>
            <div className="w-full flex justify-center p-6">
              <Counter interval={5} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CounterPage;
