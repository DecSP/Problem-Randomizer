import { Icon } from '@iconify/react'
import { Form, Row, Col, Input, Checkbox, Table, FormInstance } from 'antd'
import { useProblemContext } from '../../../../context/problem'
import { ColumnsType } from 'antd/es/table'
import { Problem } from '../../../../lib/schema'
import { ProblemSourceBadge } from '../../../ProblemSourceBadge'
import cx from 'classnames'

export type CreateContestFormFields = {
  title?: string
  description?: string
  isPublic?: boolean
  minutes?: number
}

type ProblemFilterFormProps = {
  formInstance: FormInstance<CreateContestFormFields>
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
    onSubmit,
    disabled = false,
    handleValuesChange,
    isContestValid = false,
  } = props
  const { selectedProblemUrls, problems, removeProblem } = useProblemContext()

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
          <button onClick={() => removeProblem(row.url)}>
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
  ]

  return (
    <>
      <h2 className="text-xl w-max break-words leading-9 mb-6 font-medium">
        <span className="">Contest Info</span>
      </h2>

      <Form
        onValuesChange={handleValuesChange}
        form={formInstance}
        autoComplete="off"
        initialValues={{
          title: '',
          description: '',
          isPublic: false,
          minutes: 0,
        }}
        onFinish={onSubmit}
        noValidate
        className="mb-14"
      >
        <Row gutter={24}>
          <Col span={24} lg={{ span: 12 }}>
            <Form.Item<CreateContestFormFields>
              label="Contest title"
              name="title"
              rules={[
                { required: true, message: 'Please define contest title' },
              ]}
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

          <Col span={24}>
            <Form.Item<CreateContestFormFields>
              label="Contest description"
              name="description"
            >
              <Input type="text" className="!bg-transparent" />
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
                <div className="h-6 overflow-hidden">Is public</div>
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <button
          className={cx(
            'fixed flex items-center gap-1 bottom-6 right-0 text-white bg-black hover:bg-neutral-700 transition-colors duration-[250] px-4 py-2 border-l border-y border-neutral-600 z-30',
            {
              'cursor-not-allowed !bg-neutral-700': !isContestValid,
            },
          )}
          type="submit"
        >
          <Icon
            icon="material-symbols-light:arrow-right"
            className="shrink-0 text-3xl"
          />{' '}
          Start Contest
        </button>
      </Form>

      <h2 className="text-xl w-max break-words leading-9 mb-6 font-medium">
        <span className="">Problem Set</span>
      </h2>

      <Table
        columns={tableColumn}
        dataSource={problems.filter((p) => selectedProblemUrls.includes(p.url))}
        pagination={false}
        locale={{
          emptyText: (
            <div className="flex flex-col items-center p-4 gap-4">
              <Icon icon="carbon:code-hide" className="text-6xl" />
              <span className="font-semibold tracking-[2px]">
                No problem added
              </span>
            </div>
          ),
        }}
        rowKey="url"
        rootClassName="w-full overflow-auto border"
      />
    </>
  )
}
