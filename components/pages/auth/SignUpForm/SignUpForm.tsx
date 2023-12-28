import { Icon } from '@iconify/react'
import { Form, Row, Col, Input } from 'antd'
// import cx from 'classnames'
import { useState } from 'react'

export type SignUpFormFields = {
  name: string
  password: string
}

// const { Option } = Select

export const SignUpForm = () => {
  const [form] = Form.useForm()
  const [isRevealingPassword, setIsRevealingPassword] = useState(false)

  //   const revalidateDiffBound = () => {
  //     form.validateFields(['lowerDiff', 'upperDiff'])
  //   }

  //   const diffBoundValidator = (
  //     value: string,
  //     left: number,
  //     right: number,
  //     // eslint-disable-next-line
  //     callback: (error?: string | undefined) => void,
  //     message: string,
  //   ) => {
  //     const intValue = parseInt(value)

  //     if (isNaN(intValue) || intValue < left || intValue > right) {
  //       callback(message)
  //     } else {
  //       callback()
  //     }
  //   }

  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{
        name: '',
        password: '',
        retypePassword: '',
      }}
      //   onFinish={}
      noValidate
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item<SignUpFormFields> label="Username" name="name">
            <Input type="text" className="!bg-transparent" autoFocus />
          </Form.Item>
        </Col>

        <Col span={24} className="flex gap-2 items-center">
          <Form.Item<SignUpFormFields>
            label="Password"
            name="password"
            className="flex-1"
          >
            <Input
              type={isRevealingPassword ? 'text' : 'password'}
              className="!bg-transparent"
            />
          </Form.Item>
          <button
            onClick={() => setIsRevealingPassword((open) => !open)}
            className="w-5 h-5 flex justify-center items-center"
          >
            {isRevealingPassword ? (
              <Icon icon="bi:eye" className="text-base" />
            ) : (
              <Icon icon="bi:eye-slash" className="text-base" />
            )}
          </button>
        </Col>

        <Col span={24}>
          <button
            className="form-submit-button transition-opacity duration-[250] p-0.5 hover:opacity-80 bg-gradient-to-r from-blue-500 via-blue-700 to-violet-600"
            type="submit"
          >
            Sign Up
          </button>
        </Col>
      </Row>
    </Form>
  )
}
