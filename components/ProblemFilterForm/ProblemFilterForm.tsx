import { Icon } from '@iconify/react'
import { Col, Form, Input, Row, Select } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'

import {
  DIFFICULTY_LOWER_BOUND,
  DIFFICULTY_UPPER_BOUND,
} from '@/constants/difficulty'
import { PROBLEM_SOURCES } from '@/constants/problem-source'
import { ProblemSources } from '@/types/problem-source'

import { Button } from '../Button'

export type ProblemFormFields = {
  source?: ProblemSources
  lowerDiff?: number
  upperDiff?: number
  minutes?: number
  user?: string
}

type ProblemFilterFormProps = {
  // eslint-disable-next-line
  onSubmit: (values: ProblemFormFields) => Promise<void>
  setProbType: Dispatch<SetStateAction<ProblemSources | undefined>>
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
      autoComplete="off"
      form={form}
      initialValues={{
        lowerDiff: DIFFICULTY_LOWER_BOUND,
        upperDiff: DIFFICULTY_UPPER_BOUND,
        minutes: 0,
      }}
      noValidate
      onFinish={onSubmit}
    >
      <Row gutter={24}>
        <Col span={24} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields>
            label="Choose a site"
            name="source"
            rules={[
              { required: true, message: 'Please select problem source' },
            ]}
          >
            <Select
              allowClear={{
                clearIcon: <Icon icon="ph:x-bold" />,
              }}
              disabled={disabled}
              placeholder="Choose a site"
              suffixIcon={<Icon icon="zondicons:arrow-down" />}
              onChange={(value) => {
                setProbType(value)
              }}
            >
              {Object.keys(PROBLEM_SOURCES).map((key) => (
                <Option key={key} value={key}>
                  {PROBLEM_SOURCES[key as ProblemSources]}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col className="mb-2 block md:hidden" span={24}>
          <span className="font-semibold tracking-[2px]">Difficulty</span>
        </Col>

        <Col className="hidden md:block" span={12} xl={{ span: 8 }}>
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
                    `Lower bound must be between ${DIFFICULTY_LOWER_BOUND} and ${DIFFICULTY_UPPER_BOUND}`,
                  )
                },
              },
            ]}
          >
            <Input
              className="!bg-transparent"
              type="number"
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

        <Col className="hidden md:block" span={12} xl={{ span: 8 }}>
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
                    `Upper bound must be between ${lowerBound} and ${DIFFICULTY_UPPER_BOUND}`,
                  )
                },
              },
            ]}
          >
            <Input
              className="!bg-transparent"
              type="number"
              onChange={revalidateDiffBound}
            />
          </Form.Item>
        </Col>

        <Col className="md:hidden block" span={12} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields>
            label="Lower bound"
            name="lowerDiff"
            rules={[
              {
                validator: (_rule, value, callback) => {
                  diffBoundValidator(
                    value,
                    DIFFICULTY_LOWER_BOUND,
                    DIFFICULTY_UPPER_BOUND,
                    callback,
                    `Must be between ${DIFFICULTY_LOWER_BOUND} and ${DIFFICULTY_UPPER_BOUND}`,
                  )
                },
              },
            ]}
          >
            <Input
              className="!bg-transparent"
              type="number"
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

        <Col className="md:hidden block" span={12} xl={{ span: 8 }}>
          <Form.Item<ProblemFormFields>
            label="Upper bound"
            name="upperDiff"
            rules={[
              {
                validator: (_rule, value, callback) => {
                  diffBoundValidator(
                    value,
                    lowerBound,
                    DIFFICULTY_UPPER_BOUND,
                    callback,
                    `Must be between ${lowerBound} and ${DIFFICULTY_UPPER_BOUND}`,
                  )
                },
              },
            ]}
          >
            <Input
              className="!bg-transparent"
              type="number"
              onChange={revalidateDiffBound}
            />
          </Form.Item>
        </Col>

        <Col lg={{ span: 12 }} span={24} xl={{ span: 16 }}>
          <Form.Item<ProblemFormFields>
            label="Users to exclude solved problems"
            name="user"
          >
            <Input className="!bg-transparent" type="text" />
          </Form.Item>
        </Col>

        <Col lg={{ span: 12 }} span={24} xl={{ span: 8 }}>
          <Button
            className="form-submit-button"
            disabled={disabled}
            type="submit"
            variant="outline"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
