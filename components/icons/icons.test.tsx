import { render } from '@testing-library/react'
import {
  IconCheckFilled,
  IconClose,
  IconCopy,
  IconHelp,
  IconLoading,
  IconNotification,
} from '.'

describe('Icons component', () => {
  test.each([
    {
      Component: IconCheckFilled,
      name: 'IconCheckFilled',
      defaultSize: '24',
    },
    { Component: IconClose, name: 'IconClose', defaultSize: '24' },
    { Component: IconCopy, name: 'IconCopy', defaultSize: '24' },
    { Component: IconHelp, name: 'IconHelp', defaultSize: '24' },
    { Component: IconCopy, name: 'IconCopy', defaultSize: '24' },
    { Component: IconLoading, name: 'IconLoading', defaultSize: '64' },
    {
      Component: IconNotification,
      name: 'IconNotification',
      defaultSize: '24',
    },
  ])(
    'Renders $name with default height and width',
    ({ Component, defaultSize }) => {
      const { container } = render(<Component />)
      const svgElement = container.querySelector('svg')

      expect(svgElement).toHaveAttribute('height', defaultSize)
    },
  )

  test.each([
    { Component: IconCheckFilled, name: 'IconCheckFilled' },
    { Component: IconClose, name: 'IconClose' },
    { Component: IconCopy, name: 'IconCopy' },
    { Component: IconHelp, name: 'IconHelp' },
    { Component: IconCopy, name: 'IconCopy' },
    { Component: IconLoading, name: 'IconLoading' },
    { Component: IconNotification, name: 'IconNotification' },
  ])('Renders $name with specified height and width', ({ Component }) => {
    const { container } = render(<Component height={100} width={100} />)
    const svgElement = container.querySelector('svg')

    expect(svgElement).toHaveAttribute('height', '100')
  })
})
