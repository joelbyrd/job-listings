import React from "react";
import { useJobs } from "@hooks/useJobs"; // Alias for hooks
import JobListing from "@components/app/JobListing/JobListing"; // The JobListing component

const JobListings: React.FC = () => {
  const { jobs } = useJobs();

  return (
    <ul className="flex flex-col sm:gap-4 gap-10 sm:my-6 my-10">
      {jobs.map((job) => (
        <JobListing key={job.id} job={job} />
      ))}
    </ul>
  );
};

export default JobListings;
