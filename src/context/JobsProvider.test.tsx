import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import React from "react";
import { JobsContext } from "../hooks/useJobs";
import { useJobsSource } from "../hooks/useJobsSource";
import { JobsProvider } from "./JobsProvider";

// Mock `useJobsSource` using Vitest's `vi` function
vi.mock("../hooks/useJobsSource", () => ({
  useJobsSource: vi.fn(),
}));

describe("JobsProvider", () => {
  it("should render children and provide JobsContext value", () => {
    // Mock return value for `useJobsSource`
    const mockValue = {
      jobs: [{ id: 1, title: "Job 1" }],
      filters: [{ type: "role", value: "Frontend" }],
      addFilter: vi.fn(),
      removeFilter: vi.fn(),
      clearFilters: vi.fn(),
    };

    // Set the mocked return value for `useJobsSource`
    (useJobsSource as ReturnType<typeof vi.fn>).mockReturnValue(mockValue);

    // Create a Test Consumer Component
    const TestConsumer = () => {
      const context = React.useContext(JobsContext);
      return (
        <div>
          <div data-testid="jobs">{JSON.stringify(context.jobs)}</div>
          <div data-testid="filters">{JSON.stringify(context.filters)}</div>
        </div>
      );
    };

    // Render the provider with the test consumer
    render(
      <JobsProvider>
        <TestConsumer />
      </JobsProvider>
    );

    // Assert that the context value matches the mock data
    const jobsElement = screen.getByTestId("jobs");
    expect(jobsElement).toHaveTextContent(JSON.stringify(mockValue.jobs));

    const filtersElement = screen.getByTestId("filters");
    expect(filtersElement).toHaveTextContent(JSON.stringify(mockValue.filters));
  });
});
