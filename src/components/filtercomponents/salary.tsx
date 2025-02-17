"use client";

import { useState } from "react";
import { DollarSign, ChevronDown, ChevronUp } from "lucide-react";

export interface SalaryFilterProps {
  selectedSalaries: string[];
  setSelectedSalaries: (salaries: string[]) => void;
}
 export interface SalaryRange  {  
    label: string;  
    min: number;  
    max: number;  
  };

export function SalaryFilter({ selectedSalaries, setSelectedSalaries }: SalaryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const salaryRanges: SalaryRange[] = [  
    { label: '0 - 3 Lakh', min: 0, max: 3 },  
    { label: '3 - 6 Lakh', min: 3, max: 6 },  
    { label: '6 - 10 Lakh', min: 6, max: 10 },  
    { label: '10 - 15 Lakh', min: 10, max: 15 },  
  ];  
  

  const toggleSalary = (range : SalaryRange) => {
    setSelectedSalaries((prev) =>
      prev.includes(range)
        ? prev.filter((r) => r !== range)
        : [...prev, range]
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
            {salaryRanges.map((rangee) => (
              <label
                key={rangee.label}
                className="flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 rounded-md cursor-pointer group"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSalaries.includes(rangee)}
                    onChange={() => toggleSalary(rangee)}
                    className="w-4 h-4 border-2 border-emerald-300 rounded text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 transition-colors duration-200"
                  />    
                  {selectedSalaries.includes(rangee) && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-2 h-2 bg-emerald-600 rounded-sm"></div>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-emerald-700 transition-colors duration-200">
                  {rangee}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}