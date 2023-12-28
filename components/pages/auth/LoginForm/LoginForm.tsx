import { Icon } from '@iconify/react'
import { Col, Form, Input, Row } from 'antd'
// import cx from 'classnames'
import { useState } from 'react'

export type LoginFormFields = {
  name: string;
  password: string;
}

// const { Option } = Select

export const LoginForm = () => {
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
      noValidate
      form={form}
      initialValues={{
        name: '',
        password: '',
        retypePassword: '',
      }}
      //   onFinish={}
      autoComplete="off"
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item<LoginFormFields> label="Username" name="name">
            <Input autoFocus type="text" className="!bg-transparent" />
          </Form.Item>
        </Col>

        <Col span={24} className="flex gap-2 items-center">
          <Form.Item<LoginFormFields>
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
            className="w-5 h-5 flex justify-center items-center"
            onClick={() => setIsRevealingPassword((open) => !open)}
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
            Log In
          </button>
        </Col>
      </Row>
    </Form>
  )
}
