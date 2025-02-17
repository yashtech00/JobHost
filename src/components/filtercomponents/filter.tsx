"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import { JobCard } from "./jobcard";



import { Search, Filter, DollarSign, ChevronUp, ChevronDown } from "lucide-react";
import { SalaryFilter, SalaryFilterProps, SalaryRange } from "./filtercomponents/salary";
import { ExperienceSlider } from "./filtercomponents/experience";
import { Jobtype } from "./filtercomponents/jobtypefilter";


interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  jobtype: string;
  description: string;
  experience: number;
  createdAt: string;
}

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [alljob, setAlljob] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSalaries, setSelectedSalaries] = useState<SalaryFilterProps[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState(0);
  
  const [isOpen, setIsOpen] = useState(false);

  async function refreshjobs() {
    try {
      const res = await fetch("/api/jobstream", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application"
        }
      });
      const json = await res.json();

      if (Array.isArray(json.job)) {
        setAlljob(json.job);
        setFilteredJobs(json.job);
      } else {
        setAlljob([]);
        setFilteredJobs([]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    refreshjobs();
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = [...alljob];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    // Salary filter
  
    if (selectedSalaries.length > 0) {  
      filtered = filtered.filter(job =>   
        selectedSalaries.some(range => job.salary >= range.min && job.salary < range.max)  
      );  
    }  

    // Experience filter
    if (experienceLevel > 0) {
      filtered = filtered.filter(job => {
        const jobExperience = parseInt(job.experience.toString());
        return jobExperience <= experienceLevel;
      });
    }

    setFilteredJobs(filtered);
  }, [search, selectedSalaries, selectedJobTypes, experienceLevel, alljob]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CardContent className="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-4 sm:mb-8">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex gap-2 bg-white p-2 rounded-lg shadow-sm border border-emerald-100">
                <input
                  placeholder="Search for jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-4 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 flex items-center gap-2 whitespace-nowrap">
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
              <Button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 lg:flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-lg shadow-sm border border-emerald-100 p-4 sm:p-6 lg:sticky lg:top-8">
              <div className="flex justify-between items-center lg:block">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6 lg:pb-4 lg:border-b lg:border-emerald-100">
                  Filters
                </h2>
                <Button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                  variant="ghost"
                  size="sm"
                >
                  Close
                </Button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Salary Range
                  </h3>
                  <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 sm:px-4 py-2 bg-white border border-emerald-200 rounded-lg shadow-sm flex items-center justify-between text-gray-700 hover:border-emerald-300 transition-colors duration-200"
      >
        <div className="flex items-center gap-2 truncate">
          <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="text-sm">{selectedSalaries.length ? `${selectedSalaries.length} Selected` : "Salary Range"}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-emerald-100 rounded-lg shadow-lg z-10">
          <div className="p-2">
            {salaryRanges.map((range) => (
              <label
                key={range.label}
                className="flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-md cursor-pointer group"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSalaries.includes(range)}
                    onChange={() => toggleSalary(range)}
                    className="w-4 h-4 border-2 border-emerald-300 rounded text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 transition-colors duration-200"
                  />
                  {selectedSalaries.includes(range) && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2 h-2 bg-emerald-600 rounded-sm"></div>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-emerald-700 transition-colors duration-200">
                  {range}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Job Type
                  </h3>
                  <Jobtype
                    selectedJobTypes={selectedJobTypes}
                    setSelectedJobTypes={setSelectedJobTypes}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Experience Level
                  </h3>
                  <ExperienceSlider
                    experience={experienceLevel}
                    setExperience={setExperienceLevel}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-emerald-100 p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div key={job.id || job.title}>
                      <JobCard userjob={job} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500">No jobs found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}