import { render, screen, fireEvent } from "@testing-library/react";
import Pill from "./Pill";

describe("Pill component", () => {
  test("renders content inside the pill", () => {
    render(<Pill>Test Content</Pill>);
    const pillContent = screen.getByText("Test Content");
    expect(pillContent).toBeInTheDocument();
  });

  test("renders beforeElement and afterElement correctly", () => {
    render(
      <Pill
        beforeElement={<span data-testid="before-element">Before</span>}
        afterElement={<span data-testid="after-element">After</span>}
      >
        Main Content
      </Pill>
    );

    const beforeElement = screen.getByTestId("before-element");
    const afterElement = screen.getByTestId("after-element");
    expect(beforeElement).toBeInTheDocument();
    expect(afterElement).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
  });

  test("renders as a button when onClick is provided", () => {
    const handleClick = vi.fn();
    render(<Pill onClick={handleClick}>Clickable Pill</Pill>);
    const pillElement = screen.getByRole("button");
    expect(pillElement).toBeInTheDocument();

    fireEvent.click(pillElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders as a span when onClick is not provided", () => {
    render(<Pill data-testid="pill">Non-clickable Pill</Pill>);
    const pillElement = screen.getByTestId("pill");
    expect(pillElement.tagName.toLowerCase()).toBe("span");
  });

  test("applies hover and focus styles when clickable", () => {
    render(
      <Pill onClick={() => {}} data-testid="pill">
        Hoverable Pill
      </Pill>
    );
    const pillElement = screen.getByTestId("pill");

    expect(pillElement.className).toMatch(/hover:/);
    expect(pillElement.className).toMatch(/focus:/);
  });

  test("does not apply hover and focus styles when non-clickable", () => {
    render(<Pill>Non-hoverable Pill</Pill>);
    const pillElement = screen.getByText("Non-hoverable Pill");

    expect(pillElement.className).not.toMatch(/hover:/);
    expect(pillElement.className).not.toMatch(/focus:/);
  });

  test('renders with custom element type when "as" prop is provided', () => {
    render(
      <Pill as="li" data-testid="pill">
        List Item Pill
      </Pill>
    );
    const pillElement = screen.getByTestId("pill");
    expect(pillElement.tagName.toLowerCase()).toBe("li");
  });

  test("applies custom class names", () => {
    render(
      <Pill className="custom-class" data-testid="pill">
        Styled Pill
      </Pill>
    );
    const pillElement = screen.getByTestId("pill");
    expect(pillElement).toHaveClass("custom-class");
  });
});
