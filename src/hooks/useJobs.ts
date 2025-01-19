import { createContext, useContext } from "react";
import { JobsSourceReturn } from "./useJobsSource";

export const JobsContext = createContext<JobsSourceReturn>(
  {} as JobsSourceReturn
);

export function useJobs() {
  return useContext(JobsContext);
}
