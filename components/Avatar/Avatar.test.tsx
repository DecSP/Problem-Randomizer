import { render } from "@testing-library/react";
import { Avatar } from ".";

describe("Avatar component", () => {
  it("renders with default size (32px)", () => {
    const { container } = render(<Avatar />);
    const avatarElement = container.firstChild;

    expect(avatarElement).toHaveClass("w-[32px]");
  });
  it("renders with size 32px", () => {
    const { container } = render(<Avatar size="32" />);
    const avatarElement = container.firstChild;

    expect(avatarElement).toHaveClass("w-[32px]");
  });

  it("renders with size 100px", () => {
    const { container } = render(<Avatar size="100" />);
    const avatarElement = container.firstChild;

    expect(avatarElement).toHaveClass("w-[100px]");
  });
});
