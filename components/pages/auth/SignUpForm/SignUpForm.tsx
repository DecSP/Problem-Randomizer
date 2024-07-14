import { Icon } from '@iconify/react'
import { Col, Form, Input, Row, notification } from 'antd'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/Button'
import { client } from '@/lib/apis'
import { ROUTES } from '@/constants/routes'
import { PASSWORD_REGEX, USERNAME_REGEX } from '@/constants/regex'

export type SignUpFormFields = {
  name?: string
  username: string
  password: string
  confirm_password: string
}

export const SignUpForm = () => {
  const [form] = Form.useForm()
  const [isRevealingPassword, setIsRevealingPassword] = useState(false)
  const [isRevealingConfirmPassword, setIsRevealingConfirmPassword] =
    useState(false)
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
            rules={[
              { required: true, message: 'Please input username' },
              {
                pattern: USERNAME_REGEX,
                message:
                  'Username must only contain alphabets and digits, without spaces or special characters',
              },
            ]}
          >
            <Input className="!bg-transparent" type="text" />
          </Form.Item>
        </Col>

        <Col className="flex gap-2 items-center" span={24}>
          <Form.Item<SignUpFormFields>
            className="flex-1"
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please choose a password' },
              {
                pattern: PASSWORD_REGEX,
                message:
                  'Password must be at least 8-character long, contain at least 1 uppercase letter, 1 digit, and 1 special character',
              },
            ]}
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

        <Col className="flex gap-2 items-center" span={24}>
          <Form.Item<SignUpFormFields>
            className="flex-1"
            label="Confirm Password"
            name="confirm_password"
            rules={[
              { required: true, message: 'Please choose a password' },
              {
                pattern: PASSWORD_REGEX,
                message:
                  'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 digit, and 1 special character',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match'))
                },
              }),
            ]}
          >
            <Input
              className="!bg-transparent"
              type={isRevealingConfirmPassword ? 'text' : 'password'}
            />
          </Form.Item>
          <button
            className="w-5 h-5 flex justify-center items-center"
            type="button"
            onClick={() => setIsRevealingConfirmPassword((open) => !open)}
          >
            {isRevealingConfirmPassword ? (
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
