import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { JobsContext, useJobs } from "./useJobs";
import { mockContext } from "../__mocks__/mockJobsData";

describe("useJobs", () => {
  test("provides context value", () => {
    const JobsConsumerComponent = () => {
      const { jobs } = useJobs();
      return <div data-testid="job-count">{jobs.length}</div>;
    };

    render(
      <JobsContext.Provider value={mockContext}>
        <JobsConsumerComponent />
      </JobsContext.Provider>
    );

    const jobCountElement = screen.getByTestId("job-count");
    expect(jobCountElement.textContent).toBe(
      mockContext.jobs.length.toString()
    );
  });
});
