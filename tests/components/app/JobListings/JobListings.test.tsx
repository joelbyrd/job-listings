import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { JobsContext } from "@hooks/useJobs";
import JobListings from "@components/app/JobListings/JobListings";
import { mockContext, mockJobs } from "@mocks/mockJobsData";

describe("JobListings component", () => {
  test("renders the list of jobs when jobs are present", () => {
    const mockValue = {
      ...mockContext,
      jobs: mockJobs,
      addFilter: vi.fn(),
    };

    render(
      <JobsContext.Provider value={mockValue}>
        <JobListings />
      </JobsContext.Provider>
    );

    mockJobs.forEach((job) => {
      expect(screen.getByText(job.company)).toBeInTheDocument();
      expect(screen.getByText(job.position)).toBeInTheDocument();
      expect(screen.getByText(job.location)).toBeInTheDocument();
    });
  });

  test("renders pills for job details (role, level, languages, tools)", () => {
    const mockValue = {
      ...mockContext,
      jobs: [mockJobs[0]],
      addFilter: vi.fn(),
    };

    render(
      <JobsContext.Provider value={mockValue}>
        <JobListings />
      </JobsContext.Provider>
    );

    const job = mockJobs[0];
    expect(screen.getByText(job.role)).toBeInTheDocument();
    expect(screen.getByText(job.level)).toBeInTheDocument();
    job.languages.forEach((language) => {
      expect(screen.getByText(language)).toBeInTheDocument();
    });
    job.tools.forEach((tool) => {
      expect(screen.getByText(tool)).toBeInTheDocument();
    });
  });

  test("calls addFilter when a pill is clicked", () => {
    const mockAddFilter = vi.fn();

    const mockValue = {
      ...mockContext,
      jobs: [mockJobs[0]],
      addFilter: mockAddFilter,
    };

    render(
      <JobsContext.Provider value={mockValue}>
        <JobListings />
      </JobsContext.Provider>
    );

    const roleSpan = screen.getByText(mockJobs[0].role);
    const roleButton = roleSpan.closest("button");
    expect(roleButton).not.toBeNull();

    fireEvent.click(roleButton!);

    expect(mockAddFilter).toHaveBeenCalledWith({
      type: "role",
      value: mockJobs[0].role,
    });
  });

  test("does not render the list when there are no jobs", () => {
    const mockValue = {
      ...mockContext,
      jobs: [],
    };

    render(
      <JobsContext.Provider value={mockValue}>
        <JobListings />
      </JobsContext.Provider>
    );

    const jobListingComponent = screen.queryByText("Frontend Developer");
    expect(jobListingComponent).not.toBeInTheDocument();
  });
});
