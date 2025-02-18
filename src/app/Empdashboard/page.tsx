"use client";  

import Appbar from "@/components/Appbar";  
import { Empjobpost } from "@/components/Employee/EmployeeDashboard";  
import { Empjobcard } from "@/components/Employee/EmployeeJobcard";  
import { useState } from "react";  

export default function Empdashboard() {  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [jobs, setJobs] = useState([]); // State to hold job posts  

  const openModal = () => {  
    setIsModalOpen(true);  
  };  

  const closeModal = () => {  
    setIsModalOpen(false);  
  };  

  const handleJobCreated = (newJob) => {  
    // Add the new job to the jobs state  
    setJobs((prevJobs) => [newJob, ...prevJobs]);  
    closeModal(); // Close the modal after job is created  
  };  

  return (  
    <div>  
      <Appbar />  
      <div className="flex justify-center bg-emerald-50">  
        <div className="flex justify-between w-[80%] mt-14">  
          <div className="text-4xl font-semibold">Dashboard</div>  
          {/* Button to open modal */}  
          <button  
            onClick={openModal}  
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg   
                   hover:bg-emerald-700 focus:ring-4 focus:ring-blue-300 focus:outline-none  
                   transform transition-all duration-200 hover:scale-105  
                   shadow-md hover:shadow-lg"  
            type="button"  
          >  
            Create Job Post  
          </button>  

          {/* Modal Overlay */}  
          {isModalOpen && (  
            <div  
              className="fixed inset-0 z-50 overflow-y-auto"  
              aria-labelledby="modal-title"  
              role="dialog"  
              aria-modal="true"  
            >  
              {/* Background overlay */}  
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>  

              {/* Modal container */}  
              <div className="fixed inset-0 z-50 overflow-y-auto">  
                <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-8">  
                  {/* Modal content */}  
                  <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl transform transition-all">  
                    {/* Modal header */}  
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">  
                      <h3 className="text-xl font-semibold text-gray-900 tracking-tight">  
                        Create Job Post  
                      </h3>  
                      <button  
                        type="button"  
                        onClick={closeModal}  
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1  
                                  transition-colors duration-200"  
                      >  
                        <span className="sr-only">Close</span>  
                        <svg  
                          className="h-6 w-6"  
                          fill="none"  
                          viewBox="0 0 24 24"  
                          strokeWidth="2"  
                          stroke="currentColor"  
                          aria-hidden="true"  
                        >  
                          <path  
                            strokeLinecap="round"  
                            strokeLinejoin="round"  
                            d="M6 18L18 6M6 6l12 12"  
                          />  
                        </svg>  
                      </button>  
                    </div>  

                    {/* Modal body */}  
                    <div className="max-h-[calc(100vh-16rem)] overflow-y-auto px-6 py-4 ">  
                      <Empjobpost onJobCreated={handleJobCreated} />  
                    </div>  
                  </div>  
                </div>  
              </div>  
            </div>  
          )}  
        </div>  
      </div>  
      <Empjobcard /> {/* Pass jobs to Empjobcard */}  
    </div>  
  );  
}