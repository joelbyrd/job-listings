import { render, fireEvent, screen, within, act } from "@testing-library/react";
import { Filter, useJobsSource } from "@hooks/useJobsSource";
import { jobsReducer, JobsState, JobsAction } from "@hooks/useJobsSource";
import { mockContext, mockJobs, mockFilters } from "@mocks/mockJobsData";

// hijack fetch call to avoid network request
beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue(mockJobs),
  });
});

// Test Component for simulating the use of `useJobsSource`
const UseJobsSourceExample = ({
  exampleFilters,
}: {
  exampleFilters: Filter[];
}) => {
  const { jobs, filters, addFilter, removeFilter, clearFilters } =
    useJobsSource();
  const [filter1, filter2] = exampleFilters;

  const handleAddFilter1 = () => {
    addFilter(filter1);
  };

  const handleAddFilter2 = () => {
    addFilter(filter2);
  };

  const handleRemoveFilter1 = () => {
    removeFilter(filter1);
  };

  const handleRemoveFilter2 = () => {
    removeFilter(filter2);
  };

  return (
    <div>
      <div>
        <h3>Filters</h3>
        <ul data-testid="filters-list">
          {filters.map((filter) => (
            <li key={`${filter.type}-${filter.value}`}>
              {filter.type}: {filter.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Jobs</h3>
        <ul data-testid="jobs-list">
          {jobs.map((job) => (
            <li key={job.id} data-testid="job">
              {job.position}
            </li>
          ))}
        </ul>
      </div>
      <button data-testid="add-filter1" onClick={handleAddFilter1}>
        Add Filter 1
      </button>
      <button data-testid="add-filter2" onClick={handleAddFilter2}>
        Add Filter 2
      </button>
      <button data-testid="remove-filter1" onClick={handleRemoveFilter1}>
        Remove Filter 1
      </button>
      <button data-testid="remove-filter2" onClick={handleRemoveFilter2}>
        Remove Filter 2
      </button>
      <button data-testid="clear-filters" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

// Reducer only tests
describe("jobsReducer", () => {
  it("should not add duplicate filters", () => {
    // Initial state with one filter
    const mockFilter = mockContext.filters[0];
    const initialState: JobsState = {
      jobs: [],
      filters: [{ type: mockFilter.type, value: mockFilter.value }],
    };

    // Action to add a duplicate filter
    const action: JobsAction = {
      type: "ADD_FILTER",
      payload: { type: mockFilter.type, value: mockFilter.value },
    };

    // Dispatch the action
    const newState = jobsReducer(initialState, action);

    // Assert that the state remains unchanged
    expect(newState.filters).toHaveLength(1);
    expect(newState.filters).toEqual(initialState.filters);
  });

  it("should add a new filter if it is not a duplicate", () => {
    // Initial state with one filter
    const mockFilter1: Filter = { type: "role", value: "admin" };
    const initialState: JobsState = {
      jobs: [],
      filters: [mockFilter1],
    };

    // Action to add a new filter
    const mockFilter2: Filter = { type: "level", value: "senior" };
    const action: JobsAction = {
      type: "ADD_FILTER",
      payload: mockFilter2,
    };

    // Dispatch the action
    const newState = jobsReducer(initialState, action);

    // Assert that the new filter is added
    expect(newState.filters).toHaveLength(2);
    expect(newState.filters).toContainEqual(mockFilter2);
  });
});

// Tests for `useJobsSource` hook
describe("useJobsSource", () => {
  it("should add a filter when the add filter button is clicked", async () => {
    await act(async () =>
      render(<UseJobsSourceExample exampleFilters={mockFilters} />)
    );

    // Simulate adding a filter
    const addFilterButton = screen.getByTestId("add-filter1");
    fireEvent.click(addFilterButton);

    // Assert the filter was added
    const filtersContainer = screen.getByTestId("filters-list");
    const addedFilter = within(filtersContainer).getByText(
      `${mockFilters[0].type}: ${mockFilters[0].value}`
    );
    expect(addedFilter).toBeInTheDocument();

    // Assert only that filter was added (no other filters)
    const filterCount =
      within(filtersContainer).getAllByRole("listitem").length;
    expect(filterCount).toBe(1);
  });

  it("should not add duplicate filters when using addFilter", async () => {
    await act(async () =>
      render(<UseJobsSourceExample exampleFilters={mockFilters} />)
    );

    // Simulate adding a duplicate filter
    const addFilterButton = screen.getByTestId("add-filter1");
    fireEvent.click(addFilterButton); // First time
    fireEvent.click(addFilterButton); // Attempt duplicate

    const filtersContainer = screen.getByTestId("filters-list");

    // first check the specific filter exists
    const addedFilter = within(filtersContainer).queryAllByText(
      `${mockFilters[0].type}: ${mockFilters[0].value}`
    );
    expect(addedFilter).toHaveLength(1);

    // next assert no duplicates
    const allFilters = within(filtersContainer).getAllByRole("listitem");
    expect(allFilters).toHaveLength(1);
  });

  it("should remove a filter when the remove filter button is clicked", async () => {
    await act(async () =>
      render(<UseJobsSourceExample exampleFilters={mockFilters} />)
    );

    // first simulate adding filter1
    const addFilter1Button = screen.getByTestId("add-filter1");
    fireEvent.click(addFilter1Button);

    // Simulate removing filter1
    const removeFilter1Button = screen.getByTestId("remove-filter1");
    fireEvent.click(removeFilter1Button);

    // Assert the filter was removed
    const filtersContainer = screen.getByTestId("filters-list");
    const removedFilter = within(filtersContainer).queryAllByText(
      `${mockFilters[0].type}: ${mockFilters[0].value}`
    );
    expect(removedFilter).toHaveLength(0);
  });

  it("should clear all filters when the clear filters button is clicked", async () => {
    await act(async () =>
      render(<UseJobsSourceExample exampleFilters={mockFilters} />)
    );

    // first simulate adding both filters
    const addFilter1Button = screen.getByTestId("add-filter1");
    const addFilter2Button = screen.getByTestId("add-filter2");
    fireEvent.click(addFilter1Button);
    fireEvent.click(addFilter2Button);

    // Simulate clearing all filters
    const clearFiltersButton = screen.getByTestId("clear-filters");
    fireEvent.click(clearFiltersButton);

    // Assert all filters were removed
    const filtersContainer = screen.getByTestId("filters-list");
    const allFilters = within(filtersContainer).queryAllByRole("listitem");
    expect(allFilters).toHaveLength(0);
  });
});
