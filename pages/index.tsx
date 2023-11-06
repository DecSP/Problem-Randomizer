import { Form, Select, Input, Row, Col } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header/Header";
import {
  DIFFICULTY_LOWER_BOUND,
  DIFFICULTY_UPPER_BOUND,
} from "../constants/difficulty";
// import useFetch from "../hooks/useFetch";
// import { client } from "../lib/apis";
import { QuestionSources, QUESTIONS_SOURCES } from "../types/questions-source";
import { Icon } from "@iconify/react";

const { Option } = Select;

type ProblemFormFields = {
  source?: QuestionSources;
  lowerDiff?: number;
  upperDiff?: number;
  minutes?: number;
  recentProportion?: number;
};

const Home: NextPage = () => {
  // const { data, isLoading } = useFetch({
  //   api: () => client.getUsers(),
  // });

  const onSubmit = (values: ProblemFormFields) => {
    console.log(values);
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
            <button className="form-submit-button" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>

      <div className="w-full flex justify-center p-6">
        <div className="animate-spin w-max">
          <Icon icon="vaadin:spinner-third" className="text-2xl" />
        </div>
      </div>
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
