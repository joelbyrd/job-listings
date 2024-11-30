import { JobsProvider } from "@context/JobsProvider";
import JobFilters from "@components/app/JobFilters/JobFilters";
import JobListings from "@components/app/JobListings/JobListings";

function App() {
  return (
    <JobsProvider>
      <div className="min-h-screen flex flex-col">
        <header className="w-full bg-teal bg-header-mobile md:bg-header-desktop bg-cover bg-no-repeat bg-center h-32 flex items-center">
          <div className="container">
            <h1 className="px-6 text-4xl font-bold leading-tight">
              Job Listings
            </h1>
          </div>
        </header>
        <main className="flex-1 container px-4 relative">
          <JobFilters />
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
