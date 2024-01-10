import { Icon } from '@iconify/react'
import { Col, Form, Input, Row, notification } from 'antd'
import { useState } from 'react'

import { Button } from '@/components/Button'
import { useAuthContext } from '@/context/auth'

export type LoginFormFields = {
  username: string
  password: string
}

export const LoginForm = () => {
  const [form] = Form.useForm()
  const [isRevealingPassword, setIsRevealingPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuthContext()

  const onSubmit = async (values: LoginFormFields) => {
    try {
      setIsLoading(true)
      await login(values)
    } catch (error: any) {
      notification.error({ message: error?.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form
      autoComplete="off"
      form={form}
      initialValues={{
        name: '',
        password: '',
        retypePassword: '',
      }}
      noValidate
      onFinish={onSubmit}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item<LoginFormFields>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input username' }]}
          >
            <Input className="!bg-transparent" type="text" autoFocus />
          </Form.Item>
        </Col>

        <Col className="flex gap-2 items-center" span={24}>
          <Form.Item<LoginFormFields>
            className="flex-1"
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please choose a password' }]}
          >
            <Input
              className="!bg-transparent"
              type={isRevealingPassword ? 'text' : 'password'}
            />
          </Form.Item>
          <button
            className="w-5 h-5 flex justify-center items-center"
            type="button"
            onClick={() => setIsRevealingPassword((open) => !open)}
          >
            {isRevealingPassword ? (
              <Icon className="text-base" icon="bi:eye" />
            ) : (
              <Icon className="text-base" icon="bi:eye-slash" />
            )}
          </button>
        </Col>

        <Col span={24}>
          <Button
            className="form-submit-button"
            loading={isLoading}
            type="submit"
          >
            Log In
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
