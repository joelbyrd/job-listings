import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import JobListing from "@components/app/JobListing/JobListing";
import { useJobs } from "@hooks/useJobs";

// Mock the `useJobs` hook
vi.mock("@hooks/useJobs");

const mockAddFilter = vi.fn();

beforeEach(() => {
  // Reset mocks before each test
  vi.clearAllMocks();
  (useJobs as ReturnType<typeof vi.fn>).mockReturnValue({
    addFilter: mockAddFilter,
  });
});

describe("JobListing Component", () => {
  const mockJob = {
    id: 1,
    logo: "logo.png",
    company: "Company",
    new: true,
    featured: true,
    position: "Frontend Developer",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "Remote",
    role: "Frontend",
    level: "Mid",
    languages: ["JavaScript", "TypeScript"],
    tools: ["React", "Tailwind"],
  };

  it("renders job details correctly", () => {
    render(<JobListing job={mockJob} />);

    // Check that company, position, and other details are rendered
    expect(screen.getByText(mockJob.company)).toBeInTheDocument();
    expect(screen.getByText(mockJob.position)).toBeInTheDocument();
    expect(screen.getByText(mockJob.location)).toBeInTheDocument();
    expect(screen.getByText(mockJob.postedAt)).toBeInTheDocument();
    expect(screen.getByText(mockJob.contract)).toBeInTheDocument();
  });

  it("renders 'New!' and 'Featured' pills when applicable", () => {
    render(<JobListing job={mockJob} />);

    expect(screen.getByText("New!")).toBeInTheDocument();
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("calls addFilter when role Pill is clicked", () => {
    render(<JobListing job={mockJob} />);

    const rolePill = screen.getByText(mockJob.role);
    fireEvent.click(rolePill);

    expect(mockAddFilter).toHaveBeenCalledWith({
      type: "role",
      value: mockJob.role,
    });
  });

  it("calls addFilter when level Pill is clicked", () => {
    render(<JobListing job={mockJob} />);

    const levelPill = screen.getByText(mockJob.level);
    fireEvent.click(levelPill);

    expect(mockAddFilter).toHaveBeenCalledWith({
      type: "level",
      value: mockJob.level,
    });
  });

  it("calls addFilter for each language Pill", () => {
    render(<JobListing job={mockJob} />);

    mockJob.languages.forEach((language) => {
      const languagePill = screen.getByText(language);
      fireEvent.click(languagePill);

      expect(mockAddFilter).toHaveBeenCalledWith({
        type: "languages",
        value: language,
      });
    });
  });

  it("calls addFilter for each tool Pill", () => {
    render(<JobListing job={mockJob} />);

    mockJob.tools.forEach((tool) => {
      const toolPill = screen.getByText(tool);
      fireEvent.click(toolPill);

      expect(mockAddFilter).toHaveBeenCalledWith({
        type: "tools",
        value: tool,
      });
    });
  });
});
