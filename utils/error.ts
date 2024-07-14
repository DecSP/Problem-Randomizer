import { notification } from 'antd'

export const notifyError = (error: Object | string) => {
  if (typeof error === 'string') {
    notification.error({ message: error })
  } else if (typeof error === 'object') {
    Object.values(error).forEach((message) => {
      notification.error({ message: (message as string[])[0] })
    })
  }
}
