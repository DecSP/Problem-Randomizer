import { Icon } from '@iconify/react'
import { Col, Form, Input, Row, Select, Slider } from 'antd'
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
  const [upperBound, setUpperBound] = useState(DIFFICULTY_UPPER_BOUND)

  return (
    <div className="bg-white p-6 border border-neutral-200">
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
          <Col span={24}>
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

          <Col className="" span={24}>
            <div className="pb-2">
              <span className="font-semibold tracking-[2px]">Difficulty</span>
            </div>

            <div>
              <Slider
                max={DIFFICULTY_UPPER_BOUND}
                min={DIFFICULTY_LOWER_BOUND}
                value={[lowerBound, upperBound]}
                range
                onChange={(values: number[]) => {
                  form.setFieldValue('lowerDiff', values[0])
                  form.setFieldValue('upperDiff', values[1])
                  setLowerBound(
                    values[0] &&
                      values[0] > DIFFICULTY_LOWER_BOUND &&
                      values[0] <= DIFFICULTY_UPPER_BOUND
                      ? values[0]
                      : DIFFICULTY_LOWER_BOUND,
                  )
                  setUpperBound(
                    values[1] &&
                      values[1] > DIFFICULTY_LOWER_BOUND &&
                      values[1] <= DIFFICULTY_UPPER_BOUND
                      ? values[1]
                      : DIFFICULTY_LOWER_BOUND,
                  )
                  revalidateDiffBound()
                }}
              />
            </div>

            <div className="flex justify-between gap-6">
              <Form.Item<ProblemFormFields>
                className="w-[calc((100%-24px)/2)] shrink-0 !h-[50px]"
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

              <Form.Item<ProblemFormFields>
                className="w-[calc((100%-24px)/2)] shrink-0 !h-[50px]"
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
                  onChange={(event) => {
                    setUpperBound(
                      event?.target?.value &&
                        typeof event.target.value === 'string' &&
                        Number(event.target.value) > DIFFICULTY_LOWER_BOUND &&
                        Number(event.target.value) <= DIFFICULTY_UPPER_BOUND
                        ? Number(event.target.value)
                        : DIFFICULTY_UPPER_BOUND,
                    )
                    revalidateDiffBound()
                  }}
                />
              </Form.Item>
            </div>
          </Col>

          <Col span={24}>
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
    </div>
  )
}
