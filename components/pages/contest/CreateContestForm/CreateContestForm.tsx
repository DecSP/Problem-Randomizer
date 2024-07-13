import { Icon } from '@iconify/react'
import { Col, Form, FormInstance, Input, Row, Table, Tooltip } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'
import { Checkbox } from '@/components/Checkbox'

import { Empty } from '@/components/Empty'
import { ProblemSourceBadge } from '@/components/ProblemSourceBadge'
import { ROUTES } from '@/constants/routes'
import { useProblemContext } from '@/context/problem'
import { Problem } from '@/lib/schema'
import { Button } from '@/components/Button'
import { PROBLEM_SOURCES } from '@/constants/problem-source'
import { ProblemSources } from '@/types/problem-source'

export type CreateContestFormFields = {
  title?: string
  description?: string
  isPublic?: boolean
  minutes?: number
  penalty?: number
  entry_times?: number
}

type ProblemFilterFormProps = {
  formInstance: FormInstance<CreateContestFormFields>
  isLoading?: boolean
  // eslint-disable-next-line
  onSubmit: (values: CreateContestFormFields) => Promise<void>
  disabled?: boolean
  handleValuesChange?: (
    // eslint-disable-next-line
    changedValues: any,
    // eslint-disable-next-line
    values: CreateContestFormFields,
  ) => void
  isContestValid?: boolean
}

export const CreateContestForm = (props: ProblemFilterFormProps) => {
  const {
    formInstance,
    isLoading = false,
    onSubmit,
    disabled = false,
    handleValuesChange,
    isContestValid = false,
  } = props
  const { selectedProblemIds, problems, removeProblem } = useProblemContext()

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
          <ProblemSourceBadge className="w-max" source={value} />
        </div>
      ),
      filters: Object.keys(PROBLEM_SOURCES).map((source) => ({
        text: PROBLEM_SOURCES[source as ProblemSources],
        value: source,
      })),
      onFilter: (value, row: Problem) =>
        row.source_type.includes(value as string),
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
      sorter: (a: Problem, b: Problem) => (a?.rating || 0) - (b?.rating || 0),
    },
    {
      key: 'actions',
      render: (row: Problem) => (
        <div className="flex items-center justify-end gap-2">
          <Tooltip title={`Remove ${row.name}`}>
            <button onClick={() => removeProblem(row.id)}>
              <Icon
                className="shrink-0 text-lg text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
                icon="la:trash"
              />
            </button>
          </Tooltip>
          <Tooltip title={`View ${row.name}`}>
            <a href={row.url} rel="noreferrer" target="_blank">
              <Icon
                className="shrink-0 text-lg text-neutral-500 hover:text-neutral-400 transition-colors duration-300"
                icon="la:external-link-alt"
              />
            </a>
          </Tooltip>
        </div>
      ),
      fixed: 'right',
    },
  ]

  return (
    <>
      <h2 className="text-xl w-max break-words leading-9 mb-6 font-medium">
        Problem Set
      </h2>

      <Table
        columns={selectedProblemIds.length ? tableColumn : []}
        dataSource={problems.filter((p) => selectedProblemIds.includes(p.id))}
        locale={{
          emptyText: (
            <div className="flex flex-col items-center">
              <Empty message="No problems added" />
              <Link href={ROUTES.RANDOMIZER}>
                <Button color="black" variant="solid">
                  Pick some problems
                </Button>
              </Link>
            </div>
          ),
        }}
        pagination={false}
        rootClassName="mb-14 w-full overflow-auto border"
        rowKey="id"
      />

      <h2 className="text-xl w-max break-words leading-9 mb-6 font-medium">
        Contest Info
      </h2>

      <Form
        autoComplete="off"
        className="p-6 border bg-white w-full lg:w-1/2"
        form={formInstance}
        initialValues={{
          title: '',
          description: '',
          isPublic: true,
          minutes: 0,
          penalty: 0,
          entry_times: 1,
        }}
        noValidate
        onFinish={onSubmit}
        onValuesChange={handleValuesChange}
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
              <Input
                className="!bg-transparent"
                disabled={isLoading}
                type="text"
                autoFocus
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<CreateContestFormFields>
              label="Contest description"
              name="description"
            >
              <Input
                className="!bg-transparent"
                disabled={isLoading}
                type="text"
              />
            </Form.Item>
          </Col>

          <Col lg={{ span: 12 }} span={24}>
            <Form.Item<CreateContestFormFields>
              label="Time (minutes)"
              name="minutes"
            >
              <Input
                className="!bg-transparent"
                disabled={disabled || isLoading}
                min={0}
                type="number"
              />
            </Form.Item>
          </Col>

          <Col lg={{ span: 12 }} span={24}>
            <Form.Item<CreateContestFormFields>
              label="Penalty (minutes)"
              name="penalty"
            >
              <Input
                className="!bg-transparent"
                disabled={disabled || isLoading}
                min={0}
                type="number"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item<CreateContestFormFields>
              label="Entry times (for each problem)"
              name="entry_times"
            >
              <Input
                className="!bg-transparent"
                disabled={disabled || isLoading}
                min={1}
                type="number"
              />
            </Form.Item>
          </Col>

          <Col className="!h-max" span={24}>
            <Form.Item<CreateContestFormFields>
              className="!mb-0 !h-14"
              label="Public state"
              name="isPublic"
              valuePropName="checked"
            >
              <Checkbox
                label={
                  <div className="h-6 overflow-hidden select-none">
                    Is public
                  </div>
                }
                disabled
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="fixed bottom-6 right-0 z-30 bg-white">
          <Button
            color="black"
            disabled={!isContestValid || isLoading}
            type="submit"
          >
            <Icon className="shrink-0 text-sm" icon="ri:code-s-slash-line" />
            Start Contest
          </Button>
        </div>
      </Form>
    </>
  )
}
