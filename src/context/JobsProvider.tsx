import { JobsContext } from "../hooks/useJobs";
import { useJobsSource } from "../hooks/useJobsSource";

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <JobsContext.Provider value={useJobsSource()}>
      {children}
    </JobsContext.Provider>
  );
};
