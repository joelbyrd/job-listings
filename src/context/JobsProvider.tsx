import { useJobsSource, JobsContext } from "../hooks/useJobs";

export function JobsProvider({ children }: { children: React.ReactNode }) {
  return (
    <JobsContext.Provider value={useJobsSource()}>
      {children}
    </JobsContext.Provider>
  );
}
