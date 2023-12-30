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
      noValidate
      form={form}
      initialValues={{
        name: '',
        password: '',
        retypePassword: '',
      }}
      autoComplete="off"
      onFinish={onSubmit}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item<LoginFormFields>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input username' }]}
          >
            <Input autoFocus type="text" className="!bg-transparent" />
          </Form.Item>
        </Col>

        <Col span={24} className="flex gap-2 items-center">
          <Form.Item<LoginFormFields>
            label="Password"
            name="password"
            className="flex-1"
            rules={[{ required: true, message: 'Please choose a password' }]}
          >
            <Input
              type={isRevealingPassword ? 'text' : 'password'}
              className="!bg-transparent"
            />
          </Form.Item>
          <button
            className="w-5 h-5 flex justify-center items-center"
            type="button"
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
          <Button
            className="form-submit-button"
            type="submit"
            loading={isLoading}
          >
            Log In
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
