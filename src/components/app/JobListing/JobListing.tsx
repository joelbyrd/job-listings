import React from "react";
import { useJobs } from "@hooks/useJobs"; // Hook for job-related logic
import Pill from "@components/ui/Pill/Pill"; // Pill component

interface Job {
  id: number;
  logo: string;
  company: string;
  new: boolean;
  featured: boolean;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  role: string;
  level: string;
  languages: string[];
  tools: string[];
}

interface JobListingProps {
  job: Job;
}

const JobListing: React.FC<JobListingProps> = ({ job }) => {
  const { addFilter } = useJobs(); // Access addFilter directly from the hook

  return (
    <li className="relative flex flex-col sm:flex-row sm:items-center items-start min-h-32 px-6 sm:py-0 pt-6 pb-4 bg-white dark:bg-gray-dark shadow-lg rounded">
      {/* Left Section - logo */}
      <div className="w-10 sm:w-16 h-10 sm:h-16 flex-none mr-6 absolute sm:relative top-0 -translate-y-1/2 sm:translate-y-0">
        <img
          src={job.logo}
          alt={`${job.company} Logo`}
          className="object-cover w-full h-full rounded-full"
        />
      </div>

      {/* Middle Section - Details */}
      <div className="flex flex-col sm:gap-1.5 gap-2">
        <div className="flex items-center">
          <span className="text-teal text-sm font-bold">{job.company}</span>
          {job.new && (
            <Pill
              className="!ml-4 !rounded-full !text-xxs !bg-teal !text-white !uppercase"
              contentClassName="!px-2 !py-1 !leading-none"
            >
              New!
            </Pill>
          )}
          {job.featured && (
            <Pill
              className="!ml-2 !rounded-full !text-xxs !bg-gray-dark !text-white dark:!bg-gray-600 !uppercase"
              contentClassName="!px-2 !py-1 !leading-none"
            >
              Featured
            </Pill>
          )}
        </div>
        <h2 className="text-sm font-bold text-gray-dark">{job.position}</h2>
        <ul className="text-sm text-gray-500 dark:text-gray-lighter flex">
          <li className="after:content-['•'] after:mx-2 after:text-gray-400 whitespace-nowrap">
            {job.postedAt}
          </li>
          <li className="after:content-['•'] after:mx-2 after:text-gray-400 whitespace-nowrap">
            {job.contract}
          </li>
          <li className="whitespace-nowrap">{job.location}</li>
        </ul>
      </div>

      {/* Right Section - Pills */}
      <div className="flex grow gap-3 flex-wrap justify-start sm:justify-end pt-4 sm:pt-0 mt-4 sm:mt-0 border-t-gray border-t sm:border-t-0 w-full">
        <Pill onClick={() => addFilter({ type: "role", value: job.role })}>
          {job.role}
        </Pill>
        <Pill onClick={() => addFilter({ type: "level", value: job.level })}>
          {job.level}
        </Pill>
        {job.languages.map((language) => (
          <Pill
            key={language}
            onClick={() => addFilter({ type: "languages", value: language })}
          >
            {language}
          </Pill>
        ))}
        {job.tools.map((tool) => (
          <Pill
            key={tool}
            onClick={() => addFilter({ type: "tools", value: tool })}
          >
            {tool}
          </Pill>
        ))}
      </div>
    </li>
  );
};

export default JobListing;
