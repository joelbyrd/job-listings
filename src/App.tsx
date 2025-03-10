import { JobsProvider } from "@context/JobsProvider";
import JobFilters from "@components/app/JobFilters/JobFilters";
import JobListings from "@components/app/JobListings/JobListings";
import ThemeToggle from "@components/app/ThemeToggle";

function App() {
  return (
    <JobsProvider>
      <div className="min-h-screen flex flex-col">
        <header className="w-full bg-teal dark:bg-teal-dark bg-header-mobile md:bg-header-desktop bg-cover bg-no-repeat bg-center h-32 flex items-center">
          <div className="container flex justify-between">
            <h1 className="px-6 text-4xl font-bold leading-tight">
              Job Listings
            </h1>
            <div className="flex gap-6 items-center pr-6">
              <ThemeToggle />
              <a
                href="https://github.com/joelbyrd/job-listings"
                target="blank"
                className="relative block w-6 h-6 
                  bg-contain bg-no-repeat 
                  bg-[url('/images/github-mark.svg')]
                  dark:bg-[url('/images/github-mark-white.svg')] 
                  hover:opacity-80 hover:brightness-125 
                  transition-all duration-200"
                aria-label="GitHub Repository"
              ></a>
            </div>
          </div>
        </header>
        <main className="flex-1 container px-4 relative">
          <div className="sticky top-6 z-10">
            <JobFilters />
          </div>
          <JobListings />
        </main>

        {/* Frontend Mentor attribution: */}
        <footer className="container py-2">
          <div className="text-center text-xs">
            Challenge by{" "}
            <a
              href="https://www.frontendmentor.io?ref=challenge"
              target="_blank"
              className="text-link"
            >
              Frontend Mentor
            </a>
            . Coded by Joel Byrd.
          </div>
        </footer>
      </div>
    </JobsProvider>
  );
}

export default App;
