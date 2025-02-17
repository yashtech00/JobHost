"use client";

import { useState } from "react";
import { DollarSign, ChevronDown, ChevronUp } from "lucide-react";

interface SalaryFilterProps {
    selectedJobTypes: string[];
    setSelectedJobTypes: (salaries: string[]) => void;
}

export function Jobtype({
    selectedJobTypes,
    setSelectedJobTypes,
}: SalaryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const salaryRanges = ["Full-Time", "Part-Time", "Contract", "Freelance"];

  const toggleSalary = (salary: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(salary)
        ? prev.filter((s) => s !== salary)
        : [...prev, salary]
    );
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 sm:px-4 py-2 bg-white border border-emerald-200 rounded-lg shadow-sm flex items-center justify-between text-gray-700 hover:border-emerald-300 transition-colors duration-200"
      >
        <div className="flex items-center gap-2 truncate">
          <DollarSign className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="text-sm">
            {selectedJobTypes.length
              ? `${selectedJobTypes.length} Selected`
              : "Salary Range"}
          </span>
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
            {salaryRanges.map((salary) => (
              <label
                key={salary}
                className="flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-md cursor-pointer group"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedJobTypes.includes(salary)}
                    onChange={() => toggleSalary(salary)}
                    className="w-4 h-4 border-2 border-emerald-300 rounded text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 transition-colors duration-200"
                  />
                  {selectedJobTypes.includes(salary) && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2 h-2 bg-emerald-600 rounded-sm"></div>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-emerald-700 transition-colors duration-200">
                  {salary}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
