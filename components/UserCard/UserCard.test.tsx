import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { UserCard } from '.'
import { GetUsersData } from '../../lib/schema'

jest.useFakeTimers()

const mockData: GetUsersData = {
  id: 123,
  name: 'Random name',
  username: 'random-name',
  email: 'random@gmail.com',
  address: {
    street: 'Douglas Extension',
    suite: 'Suite 847',
    city: 'McKenziehaven',
    zipcode: '59590-4157',
    geo: { lat: '-68.6102', lng: '-47.0653' },
  },
  phone: '1-463-123-4447',
  website: 'ramiro.info',
  company: {
    name: 'Romaguera-Jacobson',
    catchPhrase: 'Face to face bifurcated interface',
    bs: 'e-enable strategic applications',
  },
}

const mockUndefinedData: Partial<GetUsersData> = {}

describe('UserCard component', () => {
  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }))

  const writeText = jest.fn()

  Object.assign(navigator, {
    clipboard: {
      writeText,
    },
  })

  it('renders user information correctly', () => {
    render(<UserCard data={mockData} />)

    expect(screen.getByText(mockData.name)).toBeInTheDocument()
    expect(screen.getByText(mockData.email)).toBeInTheDocument()
  })

  it('renders user with missing information', () => {
    const { container } = render(<UserCard data={mockUndefinedData} />)

    expect(container.querySelector('h2')).toBeNull()
  })

  it('UserInfoModal component > opens, copies and closes the modal', async () => {
    const { container } = render(<UserCard data={mockData} />)

    /* opens modal */

    const button = container.querySelector('button')
    if (button) {
      fireEvent.click(button)
    }

    await act(async () => {
      const modal = await waitFor(() =>
        screen.getByTestId(`${mockData.username}-modal-content`),
      )
      expect(modal).toBeInTheDocument()
    })

    /* copies info */

    const copyButton = screen.getByTestId(`${mockData.username}-copy-button`)
    if (copyButton) {
      fireEvent.click(copyButton)
    }

    expect(navigator.clipboard.writeText).toHaveBeenCalled()

    /* closes modal */

    const closeButton = screen.getByTestId(`${mockData.username}-close-button`)
    if (closeButton) {
      fireEvent.click(closeButton)
    }

    const modalData = screen.queryByText(`"${mockData.username}",`)
    expect(modalData).toBeNull()
  })
})
