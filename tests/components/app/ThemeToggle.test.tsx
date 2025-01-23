import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@components/app/ThemeToggle";

describe("ThemeToggle component", () => {
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
  const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
  const clearSpy = vi.spyOn(Storage.prototype, "clear");

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    // Clear localStorage data and reset spies
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
    clearSpy.mockClear();
  });

  test("initializes with system theme by default", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Toggle Theme" });
    expect(button).toHaveAttribute("data-icon-button", "system");
  });

  test("applies theme based on localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Toggle Theme" });
    expect(button).toHaveAttribute("data-icon-button", "dark");
  });

  test("updates theme when a menu item is clicked", () => {
    render(<ThemeToggle />);
    const toggleButton = screen.getByRole("button", { name: "Toggle Theme" });

    // Open the menu and select 'Light' theme
    fireEvent.click(toggleButton);
    const lightButton = screen.getByText("Light");
    fireEvent.click(lightButton);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(toggleButton).toHaveAttribute("data-icon-button", "light");

    // Open the menu and select 'Dark' theme
    fireEvent.click(toggleButton);
    const darkButton = screen.getByText("Dark");
    fireEvent.click(darkButton);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(toggleButton).toHaveAttribute("data-icon-button", "dark");

    // Open the menu and select 'System' theme
    fireEvent.click(toggleButton);
    const systemButton = screen.getByText("System");
    fireEvent.click(systemButton);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "system");
    expect(toggleButton).toHaveAttribute("data-icon-button", "system");
  });

  test("handles system theme changes", () => {
    const matchMediaMock = vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    vi.stubGlobal("matchMedia", matchMediaMock);

    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  test("displays the correct icon for each theme", () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle Theme" });

    // Open the menu and select 'Light' theme
    fireEvent.click(toggleButton);
    const lightButton = screen.getByText("Light");
    fireEvent.click(lightButton);
    expect(toggleButton).toHaveAttribute("data-icon-button", "light");

    // Open the menu and select 'Dark' theme
    fireEvent.click(toggleButton);
    const darkButton = screen.getByText("Dark");
    fireEvent.click(darkButton);
    expect(toggleButton).toHaveAttribute("data-icon-button", "dark");

    // Open the menu and select 'System' theme
    fireEvent.click(toggleButton);
    const systemButton = screen.getByText("System");
    fireEvent.click(systemButton);
    expect(toggleButton).toHaveAttribute("data-icon-button", "system");
  });
});
