import { Filter, Job, JobsSourceReturn } from "@hooks/useJobsSource";

export const mockJobs: Job[] = [
  {
    id: 1,
    company: "Company A",
    logo: "logo.png",
    new: true,
    featured: false,
    position: "Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "Remote",
    languages: ["JavaScript"],
    tools: ["React"],
  },
  {
    id: 2,
    company: "Company B",
    logo: "logo2.png",
    new: false,
    featured: true,
    position: "Backend Developer",
    role: "Backend",
    level: "Mid",
    postedAt: "3d ago",
    contract: "Part Time",
    location: "In-office",
    languages: ["Python"],
    tools: ["Django"],
  },
  {
    id: 3,
    company: "Company C",
    logo: "logo3.png",
    new: false,
    featured: false,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Senior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "Hybrid",
    languages: ["JavaScript", "Python"],
    tools: ["React", "Django"],
  },
];

export const mockFilters: Filter[] = [
  { type: "role", value: "Frontend" },
  { type: "level", value: "Junior" },
];

export const mockContext: JobsSourceReturn = {
  jobs: mockJobs,
  filters: mockFilters,
  addFilter: vi.fn(),
  removeFilter: vi.fn(),
  clearFilters: vi.fn(),
};
