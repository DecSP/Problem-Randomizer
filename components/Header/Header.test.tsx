import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from ".";
import { mockNextUseRouter } from "../../utils/mock";

describe("Header component", () => {
  // mock push function to test onclick events
  const mockPush = jest.fn();

  it("renders header with correct content", () => {
    // mock useRouter
    mockNextUseRouter({
      route: "/counter",
      pathname: "/counter",
      push: mockPush,
    });

    render(<Header />);

    const headerElement = document.querySelector("header");

    expect(headerElement).toBeInTheDocument();
  });

  it("fire onclick events", () => {
    // mock useRouter
    mockNextUseRouter({
      route: "/counter",
      pathname: "/counter",
      push: mockPush,
    });

    render(<Header />);

    const notificationButton = screen.getByTestId("notification-button");
    const helpButton = screen.getByTestId("help-button");

    if (notificationButton && helpButton) {
      fireEvent.click(notificationButton);
      fireEvent.click(helpButton);
    }

    expect(mockPush).toBeCalledTimes(2);
  });
});
