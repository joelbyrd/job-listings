import React from "react";
import { useJobs } from "@hooks/useJobs";
import RemovableFilter from "@components/ui/Pill/RemovableFilter";

const JobFilters: React.FC = () => {
  const { filters, removeFilter, clearFilters } = useJobs();

  return (
    <>
      {filters.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-lg rounded -translate-y-6 gap-1">
          {/* Filter pills */}
          <ul className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <RemovableFilter
                key={`${filter.type}-${filter.value}`}
                onRemove={() => removeFilter(filter)}
                className="custom-class"
              >
                {filter.value}
              </RemovableFilter>
            ))}
          </ul>

          {/* Clear link */}
          <div>
            <button onClick={clearFilters} className="text-link font-bold">
              Clear
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JobFilters;
