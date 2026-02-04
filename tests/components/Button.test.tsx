import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/Button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByText("Click me").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText("Primary")).toBeInTheDocument();

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText("Outline")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });

  it("defaults to type button when not specified", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText("Submit")).toHaveAttribute("type", "button");
  });

  it("renders with type submit when specified", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByText("Submit")).toHaveAttribute("type", "submit");
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    screen.getByText("Disabled").click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
