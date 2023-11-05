import { render, act } from "@testing-library/react";
import { Counter } from ".";

jest.useFakeTimers();

describe("Counter component", () => {
  it("renders with initial count of 0", () => {
    const { getByText } = render(<Counter interval={5} />);
    const counterElement = getByText("0");

    expect(counterElement).toBeInTheDocument();
  });

  it("increments the count every 5 seconds", () => {
    const { getByText } = render(<Counter interval={5} />);
    const counterElement = getByText("0");

    // fast-forward time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(counterElement).toHaveTextContent("1");

    // fast-forward time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(counterElement).toHaveTextContent("2");
  });
});
