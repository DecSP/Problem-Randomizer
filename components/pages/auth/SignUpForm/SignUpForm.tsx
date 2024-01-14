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
          <Form.Item<SignUpFormFields> label="Name" name="name">
            <Input className="!bg-transparent" type="text" autoFocus />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item<SignUpFormFields>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input username' }]}
          >
            <Input className="!bg-transparent" type="text" />
          </Form.Item>
        </Col>

        <Col className="flex gap-2 items-center" span={24}>
          <Form.Item<SignUpFormFields>
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
            Sign Up
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
