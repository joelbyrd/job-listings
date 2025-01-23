import { render, screen, fireEvent } from "@testing-library/react";
import RemovableFilter from "@components/ui/Pill/RemovableFilter";

describe("RemovableFilter component", () => {
  test("renders content inside the removable filter", () => {
    render(<RemovableFilter>Filter Content</RemovableFilter>);
    const filterContent = screen.getByText("Filter Content");
    expect(filterContent).toBeInTheDocument();
  });

  test("renders the remove button", () => {
    render(<RemovableFilter>Filter with Remove Button</RemovableFilter>);
    const removeButton = screen.getByRole("button", { name: /remove filter/i });
    expect(removeButton).toBeInTheDocument();
  });

  test("calls onRemove when the remove button is clicked", () => {
    const handleRemove = vi.fn();
    render(
      <RemovableFilter onRemove={handleRemove}>
        Removable Filter
      </RemovableFilter>
    );
    const removeButton = screen.getByRole("button", { name: /remove filter/i });

    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  test("renders with default warning when onRemove is not provided", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});
    render(<RemovableFilter>Default Remove Warning</RemovableFilter>);

    const removeButton = screen.getByRole("button", { name: /remove filter/i });
    fireEvent.click(removeButton);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "onRemove is not defined. The remove button does nothing."
    );

    consoleWarnSpy.mockRestore();
  });

  test("renders as a list item by default", () => {
    render(
      <RemovableFilter data-testid="removable-filter">
        List Item Filter
      </RemovableFilter>
    );
    const removableFilterElement = screen.getByTestId("removable-filter");
    expect(removableFilterElement).toBeInTheDocument();
    expect(removableFilterElement.tagName.toLowerCase()).toBe("li");
  });

  test('renders with a custom element type when "as" prop is provided', () => {
    render(
      <RemovableFilter as="div" data-testid="removable-filter">
        Div Filter
      </RemovableFilter>
    );
    const removableFilterElement = screen.getByTestId("removable-filter");
    expect(removableFilterElement).toBeInTheDocument();
    expect(removableFilterElement.tagName.toLowerCase()).toBe("div");
  });

  test("passes additional props to the Pill", () => {
    render(
      <RemovableFilter className="custom-class" data-testid="removable-filter">
        Styled Removable Filter
      </RemovableFilter>
    );
    const removableFilterElement = screen.getByTestId("removable-filter");
    expect(removableFilterElement).toBeInTheDocument();
    expect(removableFilterElement).toHaveClass("custom-class");
  });
});
