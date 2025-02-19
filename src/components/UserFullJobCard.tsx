import { useEffect, useState } from "react";

export function UserFullJobCard({ job }: { job: Jobprop }) {
    const [applyjob,setApplyjob] = useState<ApplicantProp[]>([])
    useEffect(()=>{
        const applyfunction = async()=>{
            try{
                const res = await fetch('/api/applicant/',{
                    method:"POST",
                    credentials:"include",
                    headers:{
                        "Content-Type":"Application/json"
                    }
                })
                const json = await res.json();
                console.log(json);
                setApplyjob(json);
            }catch(e){
                console.error(e);
            }
        }
        applyfunction();
    },[])
  return (
    <div>
      Job Details
      <div>
        <div>
          <div>
            <div>
              <h3>{job.title}</h3>
              <h3>{job.company}</h3>
            </div>
            <div>
              <h3>Job Type</h3>
              <h4>{job.jobtype}</h4>
            </div>
            <div>
              <h3>Salary</h3>
              <h4>{job.salary}</h4>
            </div>
            <div>
              <h3>Experience</h3>
              <h4>{job.experience}</h4>
            </div>
            <div>
              <h3>Job Description</h3>
              <h4>{job.description}</h4>
            </div>
            <div>
              <h3>Job Location</h3>
              <h4>{job.location}</h4>
            </div>
            <h2>Apply</h2>
            <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Resume <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 hover:border-gray-400 transition-colors duration-200">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                           
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600 mt-1">
                          PDF, Docx up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
            <div>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
