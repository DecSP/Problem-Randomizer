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
import { useMemo, useState } from "react";
import cx from "classnames";
import { Counter } from "../components/Counter";

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
  const [prob, setProb] = useState<Problem[]>([]);
  const [timerConfig, setTimerConfig] = useState({
    show: false,
    minutes: 0,
    isCounting: false,
  });
  const { data, isLoading } = useFetch({
    api: async () => {
      const proms = [client.getCF(), client.getAC()];
      return await Promise.all(proms);
    },
  });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const startTimer = (minutes: number) => {
    setTimerConfig({
      show: true,
      minutes,
      isCounting: true,
    });
  };

  const onSubmit = async (values: ProblemFormFields) => {
    if (!data) return;

    setTimerConfig({
      show: false,
      minutes: 0,
      isCounting: false,
    });

    if (values.source == "codeforces") {
      const dataCF = data[0];
      const toProblemId = (problem: any) =>
        `${problem.contestId}/${problem.index}`;
      const getUserExcludedProblem = async (
        user_text: string
      ): Promise<Set<string>> => {
        const problemIds = new Set<string>();
        if (!user_text) return problemIds;
        const users = user_text.split(/\s+/);
        const proms = users.map((user) =>
          client.getCFUserStatus(user).catch(() => [])
        );
        const userSubs = await Promise.all(proms);
        for (const userSub of userSubs) {
          for (const sub of userSub) {
            sub.verdict === "OK" && problemIds.add(toProblemId(sub.problem));
          }
        }
        return problemIds;
      };

      const userExcludedProblem = await getUserExcludedProblem(
        values.user ?? ""
      );

      const list = dataCF.problems.filter(
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
      setProb([
        {
          type: "codeforces",
          rating: problem.rating,
          url: problemURL,
          name: problem.name,
          contestName:
            dataCF.contests.find((value: any) => value.id === problem.contestId)
              .name ?? "Unknown contest",
        },
        ...prob,
      ]);
    } else if (values.source === "atcoder") {
      const dataAC = data[1];
      const list = dataAC.filter(
        (value: any) =>
          value.title &&
          value.rating &&
          (!values.lowerDiff || value.rating >= values.lowerDiff) &&
          (!values.upperDiff || value.rating <= values.upperDiff)
      );
      const problem = list[Math.floor(Math.random() * list.length)];
      const AC = "https://atcoder.jp/contests/";
      const problemURL = `${AC}${problem.contest_id + "/tasks/" + problem.id}`;
      setProb([
        {
          type: "atcoder",
          rating: problem.rating,
          url: problemURL,
          name: problem.name,
          contestName: problem.contestName,
        },
        ...prob,
      ]);
    }

    if (values?.minutes && values?.minutes > 0) {
      startTimer(values?.minutes);
    } else {
      setTimerConfig({
        show: false,
        minutes: 0,
        isCounting: false,
      });
    }
  };

  let filter: JSX.Element | null = null;

  filter = (
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
            <Input
              type="number"
              min={DIFFICULTY_LOWER_BOUND}
              className="!bg-transparent"
            />
          </Form.Item>
        </Col>

        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields>
            label="Difficulty upper bound"
            name="upperDiff"
          >
            <Input
              type="number"
              min={0}
              max={DIFFICULTY_UPPER_BOUND}
              className="!bg-transparent"
            />
          </Form.Item>
        </Col>

        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields> label="Timer (minutes)" name="minutes">
            <Input type="number" min={0} className="!bg-transparent" />
          </Form.Item>
        </Col>

        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields>
            label="Number of recent problems (0 for all)"
            name="recentProportion"
          >
            <Input type="number" min={0} className="!bg-transparent" />
          </Form.Item>
        </Col>

        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields>
            label="Users to exclude solved problems"
            name="user"
          >
            <Input type="text" className="!bg-transparent" />
          </Form.Item>
        </Col>

        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <button
            className={cx(
              "form-submit-button transition-opacity duration-300",
              {
                "!opacity-40 cursor-not-allowed": isLoading || isTimerRunning,
              }
            )}
            type="submit"
            disabled={isLoading || isTimerRunning}
          >
            Submit
          </button>
        </Col>
      </Row>
    </Form>
  );

  return (
    <div>
      <Head>
        <title>Problem Randomizer</title>
        <meta name="description" content="List user page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative min-h-screen pt-[72px]">
        <div className="absolute top-0 left-0 w-screen h-full">
          <div className="sticky top-0 w-full h-screen bg-gradient-to-b from-white via-white to-gray-300" />
        </div>

        <section className="relative">
          <div className="section-container px-6 md:px-[90px] py-[40px]">
            <h1 className="text-2xl leading-9 mb-10">Problem Randomizer</h1>
            {filter}
          </div>
        </section>

        <section>
          <div className="section-container px-6 md:px-[90px] pb-[80px]">
            {isLoading && (
              <div className="w-full flex justify-center p-6">
                <div className="animate-spin w-max">
                  <Icon icon="vaadin:spinner-third" className="text-2xl" />
                </div>
              </div>
            )}

            {prob.length ? (
              <div className="flex flex-col items-stretch gap-4">
                {prob.map((p, index) => (
                  <Card
                    key={p.url}
                    className={cx("!rounded-none border-gray-200", {
                      "bg-white": index === 0,
                      "bg-gray-100 opacity-50 hover:bg-white hover:opacity-100":
                        index > 0,
                    })}
                    title={`${p.name} - Rating ${p.rating}`}
                    extra={
                      <a
                        className="text-gray-600 hover:text-gray-500"
                        href={p.url}
                        target="_blank"
                      >
                        <span className="!text-xs md:!text-sm">
                          Go to problem
                        </span>
                      </a>
                    }
                    headStyle={{
                      borderColor: "rgb(229, 231, 235)",
                    }}
                  >
                    <p>Source: {QUESTIONS_SOURCES[p.type]}</p>
                    <p>Contest: {p.contestName}</p>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {timerConfig.show ? (
          <Counter
            interval={1}
            minutes={timerConfig.minutes}
            className="fixed bottom-0 right-0"
            onStart={() => setIsTimerRunning(true)}
            onStop={() => setIsTimerRunning(false)}
          />
        ) : null}
      </main>
    </div>
  );
};

export default Home;
