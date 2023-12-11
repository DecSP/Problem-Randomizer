import { Icon } from '@iconify/react'
import { Form, Row, Col, Select, Input } from 'antd'
import cx from 'classnames'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  DIFFICULTY_LOWER_BOUND,
  DIFFICULTY_UPPER_BOUND,
} from '../../constants/difficulty'
import {
  QUESTIONS_SOURCES,
  QuestionSources,
} from '../../types/questions-source'

export type ProblemFormFields = {
  source?: QuestionSources
  lowerDiff?: number
  upperDiff?: number
  minutes?: number
  recentProportion?: number
  user?: string
}

type ProblemFilterFormProps = {
  // eslint-disable-next-line
  onSubmit: (values: ProblemFormFields) => Promise<void>
  setProbType: Dispatch<SetStateAction<QuestionSources>>
  disabled?: boolean
}

const { Option } = Select

export const ProblemFilterForm = (props: ProblemFilterFormProps) => {
  const { onSubmit, setProbType, disabled = false } = props
  const [form] = Form.useForm()

  const revalidateDiffBound = () => {
    form.validateFields(['lowerDiff', 'upperDiff'])
  }

  const diffBoundValidator = (
    value: string,
    left: number,
    right: number,
    // eslint-disable-next-line
    callback: (error?: string | undefined) => void,
    message: string,
  ) => {
    const intValue = parseInt(value)

    if (isNaN(intValue) || intValue < left || intValue > right) {
      callback(message)
    } else {
      callback()
    }
  }

  const [lowerBound, setLowerBound] = useState(DIFFICULTY_LOWER_BOUND)

  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{
        lowerDiff: DIFFICULTY_LOWER_BOUND,
        upperDiff: DIFFICULTY_UPPER_BOUND,
        minutes: 0,
        recentProportion: 0,
      }}
      onFinish={onSubmit}
      noValidate
    >
      <Row gutter={24}>
        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields>
            label="Choose a site"
            name="source"
            rules={[
              { required: true, message: 'Please select problem source' },
            ]}
          >
            <Select
              placeholder="Choose a site"
              allowClear={{
                clearIcon: <Icon icon="ph:x-bold" />,
              }}
              suffixIcon={<Icon icon="zondicons:arrow-down" />}
              onChange={(value) => {
                setProbType(value)
              }}
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
            rules={[
              {
                validator: (_rule, value, callback) => {
                  diffBoundValidator(
                    value,
                    DIFFICULTY_LOWER_BOUND,
                    DIFFICULTY_UPPER_BOUND,
                    callback,
                    `Upper bound must be between ${DIFFICULTY_LOWER_BOUND} and ${DIFFICULTY_UPPER_BOUND}`,
                  )
                },
              },
            ]}
          >
            <Input
              type="number"
              className="!bg-transparent"
              onChange={(event) => {
                setLowerBound(
                  event?.target?.value &&
                    typeof event.target.value === 'string' &&
                    Number(event.target.value) > DIFFICULTY_LOWER_BOUND &&
                    Number(event.target.value) <= DIFFICULTY_UPPER_BOUND
                    ? Number(event.target.value)
                    : DIFFICULTY_LOWER_BOUND,
                )
                revalidateDiffBound()
              }}
            />
          </Form.Item>
        </Col>

        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields>
            label="Difficulty upper bound"
            name="upperDiff"
            rules={[
              {
                validator: (_rule, value, callback) => {
                  diffBoundValidator(
                    value,
                    lowerBound,
                    DIFFICULTY_UPPER_BOUND,
                    callback,
                    `Lower bound must be between ${lowerBound} and ${DIFFICULTY_UPPER_BOUND}`,
                  )
                },
              },
            ]}
          >
            <Input
              type="number"
              className="!bg-transparent"
              onChange={revalidateDiffBound}
            />
          </Form.Item>
        </Col>

        {/* <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields> label="Time (minutes)" name="minutes">
            <Input type="number" min={0} className="!bg-transparent" />
          </Form.Item>
        </Col> */}

        <Col span={24} lg={{ span: 12 }} xl={{ span: 16 }}>
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
              'form-submit-button transition-[padding] duration-[250] p-0.5 hover:p-1 bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600',
              {
                '!opacity-40 cursor-not-allowed': disabled,
              },
            )}
            type="submit"
            disabled={disabled}
          >
            <div className="w-full h-full flex items-center justify-center bg-white text-black transition-colors duration-[250]">
              Submit
            </div>
          </button>
        </Col>
      </Row>
    </Form>
  )
}
