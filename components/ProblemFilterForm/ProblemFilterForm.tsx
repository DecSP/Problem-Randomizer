import { Icon } from '@iconify/react'
import { Form, Row, Col, Select, Input } from 'antd'
import cx from 'classnames'
import { Dispatch, SetStateAction } from 'react'
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

  return (
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
              'form-submit-button transition-opacity duration-300',
              {
                '!opacity-40 cursor-not-allowed': disabled,
              },
            )}
            type="submit"
            disabled={disabled}
          >
            Submit
          </button>
        </Col>
      </Row>
    </Form>
  )
}
