import { Icon } from '@iconify/react'
import { Col, Form, Input, Row, notification } from 'antd'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/Button'
import { client } from '@/lib/apis'
import { ROUTES } from '@/constants/routes'

export type SignUpFormFields = {
  name?: string
  username: string
  password: string
}

export const SignUpForm = () => {
  const [form] = Form.useForm()
  const [isRevealingPassword, setIsRevealingPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  const onSubmit = async (values: SignUpFormFields) => {
    try {
      setIsLoading(true)

      const res = await client.signUp(values)
      if (res?.data) {
        notification.success({ message: 'Sign up successfully' })
        push(ROUTES.LOGIN)
      } else {
        if (res?.message) {
          notification.error({ message: res?.message })
        }
      }
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
          <Form.Item<SignUpFormFields> label="Name" name="name">
            <Input autoFocus type="text" className="!bg-transparent" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item<SignUpFormFields>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input username' }]}
          >
            <Input type="text" className="!bg-transparent" />
          </Form.Item>
        </Col>

        <Col span={24} className="flex gap-2 items-center">
          <Form.Item<SignUpFormFields>
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
            Sign Up
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
