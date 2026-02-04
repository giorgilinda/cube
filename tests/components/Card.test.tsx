import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/Card";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders with optional title", () => {
    render(
      <Card title="Section Title">
        <span>Body</span>
      </Card>
    );
    expect(screen.getByText("Section Title")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("renders without title when not provided", () => {
    render(<Card>Only body</Card>);
    expect(screen.getByText("Only body")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Card className="custom-class">Content</Card>
    );
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("custom-class");
  });
});
