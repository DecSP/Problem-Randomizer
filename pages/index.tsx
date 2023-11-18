import { Form, Select, Input, Row, Col, Card } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header/Header";
import {
  DIFFICULTY_LOWER_BOUND,
  DIFFICULTY_UPPER_BOUND,
} from "../constants/difficulty";
import useFetch from "../hooks/useFetch";
import { client } from "../lib/apis";
import { QuestionSources, QUESTIONS_SOURCES } from "../types/questions-source";
import { Icon } from "@iconify/react";
import { useState } from "react";

const { Option } = Select;

type ProblemFormFields = {
  source?: QuestionSources;
  lowerDiff?: number;
  upperDiff?: number;
  minutes?: number;
  recentProportion?: number;
  user?: string;
};

interface Problem {
  type: QuestionSources;
  contestName: string;
  url: string;
  name: string;
  rating: number;
}

const Home: NextPage = () => {
  const [prob, setProb] = useState<Problem>();
  const { data, isLoading } = useFetch({
    api: () => client.getCF(),
  });

  const onSubmit = async (values: ProblemFormFields) => {
    if (!data) return;
    if (values.source == "codeforces") {
      const toProblemId = (problem: any) =>
        `${problem.contestId}/${problem.index}`;
      const getUserExcludedProblem = async (
        user_text: string
      ): Promise<Set<string>> => {
        const problemIds = new Set<string>();
        if (!user_text) return problemIds;
        const users = user_text.split(/\s+/);
        for (const user of users) {
          const subs = await client.getCFUserStatus(user).catch(() => []);
          for (const sub of subs) {
            sub.verdict === "OK" && problemIds.add(toProblemId(sub.problem));
          }
        }
        return problemIds;
      };

      const userExcludedProblem = await getUserExcludedProblem(
        values.user ?? ""
      );

      const list = data.problems.filter(
        (value: any) =>
          value.name &&
          value.rating &&
          (!values.lowerDiff || value.rating >= values.lowerDiff) &&
          (!values.upperDiff || value.rating <= values.upperDiff) &&
          !userExcludedProblem.has(toProblemId(value))
      );
      const problem = list[Math.floor(Math.random() * list.length)];
      const CF = "https://codeforces.com/problemset/problem/";
      const problemURL = `${CF}${problem.contestId + "/" + problem.index}`;
      setProb({
        type: "codeforces",
        rating: problem.rating,
        url: problemURL,
        name: problem.name,
        contestName:
          data.contests.find((value) => value.id === problem.contestId).name ??
          "Unknown contest",
      });
    } else if (values.source === "atcoder") {
      // TODO
    }
  };

  let content: JSX.Element | null = null;
  // if (isLoading) {
  //   content = (
  //     <div className="w-full flex justify-center p-6">
  //       <div className="animate-spin w-max">
  //         <IconLoading />
  //       </div>
  //     </div>
  //   );
  // } else if (!isLoading && (!data || !data?.length)) {
  //   content = <div className="w-full text-center p-6">No users found</div>;
  // } else if (data?.length) {
  //   content = (
  //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[42px]">
  //       {data.map((d) => (
  //         <UserCard key={d.id} data={d} className="!w-full" />
  //       ))}
  //     </div>
  //   );
  // }

  content = (
    <>
      <Form
        autoComplete="off"
        initialValues={{
          lowerDiff: DIFFICULTY_LOWER_BOUND,
          upperDiff: DIFFICULTY_UPPER_BOUND,
          minutes: 0,
          recentProportion: 0,
        }}
        onFinish={onSubmit}
      >
        <Row gutter={24}>
          <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
            <Form.Item<ProblemFormFields>
              label="Choose a site"
              name="source"
              rules={[
                { required: true, message: "Please select problem source" },
              ]}
            >
              <Select
                placeholder="Choose a site"
                allowClear={{
                  clearIcon: <Icon icon="ph:x-bold" />,
                }}
                suffixIcon={<Icon icon="zondicons:arrow-down" />}
              >
                {Object.keys(QUESTIONS_SOURCES).map((key) => (
                  <Option value={key} key={key}>
                    {QUESTIONS_SOURCES[key as QuestionSources]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
            <Form.Item<ProblemFormFields>
              label="Difficulty lower bound"
              name="lowerDiff"
            >
              <Input type="number" min={DIFFICULTY_LOWER_BOUND} />
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
            <Form.Item<ProblemFormFields>
              label="Difficulty upper bound"
              name="upperDiff"
            >
              <Input type="number" min={0} max={DIFFICULTY_UPPER_BOUND} />
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
            <Form.Item<ProblemFormFields>
              label="Timer (minutes)"
              name="minutes"
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
            <Form.Item<ProblemFormFields>
              label="Number of recent problems (0 for all)"
              name="recentProportion"
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
            <Form.Item<ProblemFormFields>
              label="Users to exclude solved problems"
              name="user"
            >
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
            <button className="form-submit-button" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>

      {isLoading && (
        <div className="w-full flex justify-center p-6">
          <div className="animate-spin w-max">
            <Icon icon="vaadin:spinner-third" className="text-2xl" />
          </div>
        </div>
      )}
      {prob && (
        <Card
          className="bg-slate-200"
          title={`${prob.name} - Rating ${prob.rating}`}
          extra={
            <a className="text-gray-600" href={prob.url}>
              Go to problem
            </a>
          }
        >
          <p>Source: {QUESTIONS_SOURCES[prob.type]}</p>
          <p>Contest: {prob.contestName}</p>
        </Card>
      )}
    </>
  );

  return (
    <div>
      <Head>
        <title>Users</title>
        <meta name="description" content="List user page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="bg-white min-h-screen pt-[72px]">
        <section>
          <div className="section-container px-10 md:px-[90px] py-[43px]">
            <h1 className="text-2xl leading-9 mb-10">Problem Randomizer</h1>
            {content}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
