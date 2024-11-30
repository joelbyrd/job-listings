import {
  useReducer,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from "react";

export interface Job {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
}

export interface Filter {
  type: "role" | "level" | "languages" | "tools";
  value: string;
}

export interface JobsState {
  jobs: Job[];
  filters: Filter[];
}

export type JobsAction =
  | { type: "ADD_FILTER"; payload: Filter }
  | { type: "REMOVE_FILTER"; payload: Filter }
  | { type: "SET_JOBS"; payload: Job[] }
  | { type: "CLEAR_FILTERS" };

function jobsReducer(state: JobsState, action: JobsAction): JobsState {
  switch (action.type) {
    case "ADD_FILTER":
      // Avoid duplicate filters - if filter already exists, do nothing
      if (
        state.filters.some(
          (filter) =>
            filter.type === action.payload.type &&
            filter.value === action.payload.value
        )
      ) {
        return state;
      }
      return {
        ...state,
        filters: [...state.filters, action.payload],
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        filters: state.filters.filter(
          (filter) =>
            filter.type !== action.payload.type ||
            filter.value !== action.payload.value
        ),
      };
    case "SET_JOBS":
      return {
        ...state,
        jobs: action.payload,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: [],
      };
    default:
      return state;
  }
}

export interface JobsSourceReturn {
  jobs: Job[];
  filters: Filter[];
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
  clearFilters: () => void;
}

export function useJobsSource(): JobsSourceReturn {
  const [{ jobs, filters }, dispatch] = useReducer(jobsReducer, {
    jobs: [],
    filters: [],
  });

  // fetch jobs data
  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_JOBS", payload: data }));
  }, []);

  const addFilter = useCallback((filter: Filter) => {
    dispatch({ type: "ADD_FILTER", payload: filter });
  }, []);

  const removeFilter = useCallback((filter: Filter) => {
    dispatch({ type: "REMOVE_FILTER", payload: filter });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      return filters.every((filter) => {
        if (filter.type === "role") return job.role === filter.value;
        if (filter.type === "level") return job.level === filter.value;
        if (filter.type === "languages")
          return job.languages.includes(filter.value);
        if (filter.type === "tools") return job.tools.includes(filter.value);
        return true;
      });
    });
  }, [jobs, filters]);

  return {
    jobs: filteredJobs,
    filters,
    addFilter,
    removeFilter,
    clearFilters,
  };
}

export const JobsContext = createContext<JobsSourceReturn>(
  {} as JobsSourceReturn
);

export function useJobs() {
  return useContext(JobsContext);
}
