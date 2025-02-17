"use client";

import { Clock } from "lucide-react";

interface ExperienceSliderProps {
  experience: number;
  setExperience: (value: number) => void;
}

export function ExperienceSlider({ experience, setExperience }: ExperienceSliderProps) {
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience(Number(e.target.value));
  };

  const formatExperience = (value: number) => {
    return value === 12 ? "12+" : value.toString();
  };

  return (
    <div className="w-full bg-white border border-emerald-200 rounded-lg p-3 sm:p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span className="text-sm text-gray-700 font-medium">Experience (Years)</span>
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
              {formatExperience(experience)} {experience === 1 ? "Year" : "Years"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

