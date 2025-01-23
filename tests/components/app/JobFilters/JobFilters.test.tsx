import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { JobsContext } from "@hooks/useJobs";
import JobFilters from "@components/app/JobFilters/JobFilters";
import { mockContext, mockFilters } from "@mocks/mockJobsData";

describe("JobFilters component", () => {
  test("renders the list of filters when filters are present", () => {
    render(
      <JobsContext.Provider value={mockContext}>
        <JobFilters />
      </JobsContext.Provider>
    );

    const filterElements = screen.getAllByRole("button", {
      name: /remove filter/i,
    });
    expect(filterElements.length).toBe(mockContext.filters.length);
    mockContext.filters.forEach((filter) => {
      expect(screen.getByText(filter.value)).toBeInTheDocument();
    });
  });

  test("removes a filter when the remove button is clicked", () => {
    const mockRemoveFilter = vi.fn();

    const mockValue = {
      ...mockContext,
      filters: [mockFilters[0]],
      removeFilter: mockRemoveFilter,
    };

    render(
      <JobsContext.Provider value={mockValue}>
        <JobFilters />
      </JobsContext.Provider>
    );

    const removeButton = screen.getByRole("button", { name: /remove filter/i });
    fireEvent.click(removeButton);

    expect(mockRemoveFilter).toHaveBeenCalledWith(mockFilters[0]);
  });

  test("clears all filters when the clear button is clicked", () => {
    const mockClearFilters = vi.fn();

    const mockValue = {
      ...mockContext,
      filters: mockFilters,
      clearFilters: mockClearFilters,
    };

    render(
      <JobsContext.Provider value={mockValue}>
        <JobFilters />
      </JobsContext.Provider>
    );

    const clearButton = screen.getByText("Clear");
    fireEvent.click(clearButton);

    expect(mockClearFilters).toHaveBeenCalledTimes(1);
  });

  test("does not render the component when no filters are present", () => {
    const mockValue = {
      ...mockContext,
      filters: [],
    };

    render(
      <JobsContext.Provider value={mockValue}>
        <JobFilters />
      </JobsContext.Provider>
    );

    const jobFiltersComponent = screen.queryByText("Clear");
    expect(jobFiltersComponent).not.toBeInTheDocument();
  });
});
