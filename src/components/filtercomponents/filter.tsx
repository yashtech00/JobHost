import { ChevronDown, ChevronUp, Clock, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { JobCard } from "./jobcard"; 

// Define the interface for the salary range

export function Jobs() {
  const [selectedSalaries, setSelectedSalaries] = useState<SalaryRange[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobTypeRange[]>([]);

  // Separate state variables for each filter
  const [isSalaryOpen, setIsSalaryOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);

  const [experience, setExperience] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [alljob, setAlljob] = useState<Jobtypeprop[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Jobtypeprop[]>([]);
  async function refreshjobs() {
    try {
      const res = await fetch("/api/jobstream", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application",
        },
      });
      const json = await res.json();

      console.log("API Response:", json.job); // Debugging log

      if (Array.isArray(json.job)) {
        setAlljob(json.job);
      } else {
        setAlljob([]); // Ensure it's always an array
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    refreshjobs();
  }, []);

  const salaryRanges: SalaryRange[] = [
    { label: "0 - 3 Lakh", min: 0, max: 3 },
    { label: "3 - 6 Lakh", min: 3, max: 6 },
    { label: "6 - 10 Lakh", min: 6, max: 10 },
    { label: "10 - 15 Lakh", min: 10, max: 15 },
  ];

  const jobTypeRanges: JobTypeRange[] = [
    { label: "Full-Time" },
    { label: "Part-Time" },
    { label: "Contract" },
    { label: "Freelance" },
  ];

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience(Number(e.target.value));
  };

  const formatExperience = (value: number) => {
    return value === 12 ? "12+" : value.toString();
  };

  const toggleJobType = (jobType: JobTypeRange) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jobType)
        ? prev.filter((s) => s !== jobType)
        : [...prev, jobType]
    );
  };

  const toggleSalary = (range: SalaryRange) => {
    setSelectedSalaries((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const filteredjobs = ()=>{
    let filtered=alljob;
    if(selectedSalaries.length>0){
      filtered = filtered.filter((job)=>
      selectedSalaries.some((range)=>job.salary >=range.min && job.salary< range.max)
      )
    }
    if(selectedJobTypes.length>0){
      filtered=filtered.filter((job)=>
      selectedJobTypes.some((type)=>job.jobtype===type.label)
      );
    }
    if(experience>0){
      filtered=filtered.filter((job)=> job.experience<=experience);
    }
    setFilteredJobs(filtered);

  }
  useEffect(()=>{
    filteredjobs();
  },[selectedJobTypes,selectedSalaries,experience,alljob])

  return (
    <div className=" flex justify-center">
    <div className="flex">
      <div>
        {/* Salary Filter */}
        <div className="relative w-full">  
      <button  
        type="button"  
        onClick={() => setIsSalaryOpen((prev) => !prev)} // Toggle salary filter  
        className="w-full px-3 sm:px-4 py-2 bg-white border border-emerald-200 rounded-lg shadow-sm flex items-center justify-between text-gray-700 hover:border-emerald-300 transition-colors duration-200"  
      >  
        <div className="flex items-center gap-2 truncate">  
          <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />  
          <span className="text-sm">  
            {selectedSalaries.length  
              ? `${selectedSalaries.length} Selected`  
              : "Salary Range"}  
          </span>  
        </div>  
        {isSalaryOpen ? (  
          <ChevronUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />  
        ) : (  
          <ChevronDown className="w-4 h-4 text-emerald-600 flex-shrink-0" />  
        )}  
      </button>  

      {isSalaryOpen && (  
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
                      <svg  
                        xmlns="http://www.w3.org/2000/svg"  
                        className="w-4 h-4 text-blue-600"  
                        fill="none"  
                        viewBox="0 0 24 24"  
                        stroke="currentColor"  
                      >  
                        <path  
                          strokeLinecap="round"  
                          strokeLinejoin="round"  
                          strokeWidth={2}  
                          d="M4 6L10 12L20 4"  
                        />  
                      </svg>  
                    </div>  
                  )}  
                </div>  
                <span className="text-sm text-gray-700 group-hover:text-emerald-700 transition-colors duration-200">  
                  {range.label}  
                </span>  
              </label>  
            ))}  
          </div>  
        </div>  
      )}  
    </div>  

        {/* Job Type Filter */}
        <div className="relative w-full mt-4">
          <button
            type="button"
            onClick={() => setIsJobTypeOpen(!isJobTypeOpen)} // Toggle job type filter
            className="w-full px-3 sm:px-4 py-2 bg-white border border-emerald-200 rounded-lg shadow-sm flex items-center justify-between text-gray-700 hover:border-emerald-300 transition-colors duration-200"
          >
            <div className="flex items-center gap-2 truncate">
              <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-sm">
                {selectedJobTypes.length
                  ? `${selectedJobTypes.length} Selected`
                  : "Job Type"}
              </span>
            </div>
            {isJobTypeOpen ? (
              <ChevronUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            )}
          </button>

          {isJobTypeOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-emerald-100 rounded-lg shadow-lg z-10">
              <div className="p-2">
                {jobTypeRanges.map((jobType) => (
                  <label
                    key={jobType.label}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-md cursor-pointer group"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedJobTypes.includes(jobType)}
                        onChange={() => toggleJobType(jobType)}
                        className="w-4 h-4 border-2 border-emerald-300 rounded text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 transition-colors duration-200"
                      />
                      {selectedJobTypes.includes(jobType) && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-2 h-2 bg-emerald-600 rounded-sm"></div>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-emerald-700 transition-colors duration-200">
                      {jobType.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Experience Filter */}
        <div className="w-full bg-white border border-emerald-200 rounded-lg p-3 sm:p-4 shadow-sm mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-sm text-gray-700 font-medium">
              Experience (Years)
            </span>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={experience}
                onChange={handleExperienceChange}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600  
                [&::-webkit-slider-thumb]:appearance-none  
                [&::-webkit-slider-thumb]:w-4  
                [&::-webkit-slider-thumb]:h-4  
                [&::-webkit-slider-thumb]:bg-emerald-600  
                [&::-webkit-slider-thumb]:rounded-full  
                [&::-webkit-slider-thumb]:border-2  
                [&::-webkit-slider-thumb]:border-white  
                [&::-webkit-slider-thumb]:shadow-md  
                [&::-webkit-slider-thumb]:transition-all  
                [&::-webkit-slider-thumb]:hover:scale-110  
                [&::-moz-range-thumb]:appearance-none  
                [&::-moz-range-thumb]:w-4  
                [&::-moz-range-thumb]:h-4  
                [&::-moz-range-thumb]:bg-emerald-600  
                [&::-moz-range-thumb]:rounded-full  
                [&::-moz-range-thumb]:border-2  
                [&::-moz-range-thumb]:border-white  
                [&::-moz-range-thumb]:shadow-md  
                [&::-moz-range-thumb]:transition-all  
                [&::-moz-range-thumb]:hover:scale-110"
              />

              {/* Tick marks */}
              <div className="flex justify-between px-1 mt-2">
                {[...Array(13)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-0.5 h-1 bg-emerald-200"></div>
                  </div>
                ))}
              </div>

              {/* Labels */}
              <div className="flex justify-between px-1 mt-1">
                <span className="text-xs text-gray-500">0</span>
                <span className="text-xs text-gray-500">12+</span>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                <span className="text-sm text-emerald-700 font-medium">
                  {formatExperience(experience)}{" "}
                  {experience === 1 ? "Year" : "Years"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* alljobs */}
      {/* Display all jobs or filtered jobs */}  
      <div className="ml-4">  
          {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (  
            filteredJobs.map((job) => (  
              <div key={job.id || job.title}>  
                <JobCard userjob={job} />  
              </div>  
            ))  
          ) : (  
            <div className="text-gray-500 mt-4">No jobs found.</div>  
          )}  
        </div>  
    </div>
    </div>
  );
}
