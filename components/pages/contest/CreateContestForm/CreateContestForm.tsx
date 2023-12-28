import { Icon } from '@iconify/react';
import { Checkbox, Col, Form, FormInstance, Input, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import cx from 'classnames';
import Link from 'next/link';

import { Empty } from '@/components/Empty';
import { ProblemSourceBadge } from '@/components/ProblemSourceBadge';
import { ROUTES } from '@/constants/routes';
import { useProblemContext } from '@/context/problem';
import { Problem } from '@/lib/schema';

export type CreateContestFormFields = {
  title?: string;
  description?: string;
  isPublic?: boolean;
  minutes?: number;
  penalty?: number;
};

type ProblemFilterFormProps = {
  formInstance: FormInstance<CreateContestFormFields>;
  // eslint-disable-next-line
  onSubmit: (values: CreateContestFormFields) => Promise<void>
  disabled?: boolean;
  handleValuesChange?: (
    // eslint-disable-next-line
    changedValues: any,
    // eslint-disable-next-line
    values: CreateContestFormFields,
  ) => void;
  isContestValid?: boolean;
};

export const CreateContestForm = (props: ProblemFilterFormProps) => {
  const {
    formInstance,
    onSubmit,
    disabled = false,
    handleValuesChange,
    isContestValid = false,
  } = props;
  const { selectedProblemIds, problems, removeProblem } = useProblemContext();

  const tableColumn: ColumnsType<Problem> = [
    {
      title: <span className="font-semibold tracking-[2px]">Name</span>,
      dataIndex: 'name',
      key: 'name',
      render: (value: any) => (
        <div className="w-[200px]">
          <span>{value || ''}</span>
        </div>
      ),
    },
    {
      title: (
        <span className="font-semibold tracking-[2px]">Problem source</span>
      ),
      dataIndex: 'source_type',
      key: 'source_type',
      render: (value: any) => (
        <div className="min-w-[160px]">
          <ProblemSourceBadge source={value} className="w-max" />
        </div>
      ),
    },
    {
      title: <span className="font-semibold tracking-[2px]">Contest</span>,
      dataIndex: 'contest_name',
      key: 'contest_name',
      render: (value: any) => (
        <div className="w-[200px]">
          <span className="block truncate">{value || ''}</span>
        </div>
      ),
    },
    {
      title: <span className="font-semibold tracking-[2px]">Rating</span>,
      dataIndex: 'rating',
      key: 'rating',
      render: (value: any) => <span>{value || ''}</span>,
    },
    {
      key: 'actions',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => removeProblem(row.id)}>
            <Icon
              icon="la:trash"
              className="shrink-0 text-lg text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
            />
          </button>
          <a href={row.url} target="_blank" rel="noreferrer">
            <Icon
              icon="la:external-link-alt"
              className="shrink-0 text-lg text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
            />
          </a>
        </div>
      ),
      fixed: 'right',
    },
  ];

  return (
    <>
      <h2 className="text-xl w-max break-words leading-9 mb-6 font-medium">
        <span className="">Contest Info</span>
      </h2>

      <Form
        noValidate
        form={formInstance}
        autoComplete="off"
        initialValues={{
          title: '',
          description: '',
          isPublic: false,
          minutes: 0,
          penalty: 0,
        }}
        className="mb-14 p-6 border bg-white w-full lg:w-2/3"
        onValuesChange={handleValuesChange}
        onFinish={onSubmit}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item<CreateContestFormFields>
              label="Contest title"
              name="title"
              rules={[
                { required: true, message: 'Please input contest title' },
              ]}
            >
              <Input type="text" className="!bg-transparent" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<CreateContestFormFields>
              label="Contest description"
              name="description"
            >
              <Input type="text" className="!bg-transparent" />
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 12 }}>
            <Form.Item<CreateContestFormFields>
              label="Time (minutes)"
              name="minutes"
            >
              <Input
                type="number"
                min={0}
                className="!bg-transparent"
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={24} lg={{ span: 12 }}>
            <Form.Item<CreateContestFormFields>
              label="Penalty (minutes)"
              name="penalty"
            >
              <Input
                type="number"
                min={0}
                className="!bg-transparent"
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={24} className="!h-max">
            <Form.Item<CreateContestFormFields>
              label="Public state"
              name="isPublic"
              valuePropName="checked"
              className="!mb-0 !h-14"
            >
              <Checkbox className="">
                <div className="h-6 overflow-hidden select-none">Is public</div>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <button
          className={cx(
            'text-base fixed flex items-center gap-2 bottom-6 right-0 text-white bg-black hover:bg-neutral-700 transition-colors duration-[250] px-4 py-2 border-l border-y border-neutral-600 z-30',
            {
              'cursor-not-allowed !bg-neutral-700': !isContestValid,
            },
          )}
          type="submit"
        >
          <Icon icon="ri:code-s-slash-line" className="shrink-0 text-sm" />{' '}
          Start Contest
        </button>
      </Form>

      <h2 className="text-xl w-max break-words leading-9 mb-6 font-medium">
        <span className="">Problem Set</span>
      </h2>

      <Table
        columns={selectedProblemIds.length ? tableColumn : []}
        dataSource={problems.filter((p) => selectedProblemIds.includes(p.id))}
        pagination={false}
        locale={{
          emptyText: (
            <div>
              <Empty message="No problems added" />
              <Link href={ROUTES.RANDOMIZER}>
                <button className="bg-black text-white px-4 py-2 hover:opacity-60 transition-opacity duration-300">
                  Spawn some problems
                </button>
              </Link>
            </div>
          ),
        }}
        rowKey="id"
        rootClassName="w-full overflow-auto border"
      />
    </>
  );
};
