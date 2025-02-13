// export function Stepper() {
//   return (
//     <div>
//       <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
//         <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
//           <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
//             <svg
//               className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
//             </svg>
//             Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
//           </span>
//         </li>
//         <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
//           <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
//             <span className="me-2">2</span>
//             Account <span className="hidden sm:inline-flex sm:ms-2">Info</span>
//           </span>
//         </li>
//         <li className="flex items-center">
//           <span className="me-2">3</span>
//           Confirmation
//         </li>
//       </ol>
//     </div>
//   );
// }


// Stepper.js
// Stepper.tsx  
"use client";  
import React, { useState } from 'react';  
import { PersonalInfo } from './PersonalInfo';  
import { AccountInfo } from './AccountInfo';  
// import Confirmation from './Confirmation'; // Uncomment when ready  

export function Stepper() {  
  const [currentStep, setCurrentStep] = useState(0);  

  const handleNext = () => {  
    if (currentStep < steps.length - 1) {  
      setCurrentStep(currentStep + 1);  
    }  
  };  

  const handleBack = () => {  
    if (currentStep > 0) {  
      setCurrentStep(currentStep - 1);  
    }  
  };  

  const steps = [  
    { label: 'Personal Info', component: <PersonalInfo onNext={handleNext} /> },  
    { label: 'Account Info', component: <AccountInfo onNext={handleNext} onBack={handleBack} /> },  
    // { label: 'Confirmation', component: <Confirmation onBack={handleBack} /> }, // Uncomment when ready  
  ];  

  return (  
    <div className='flex justify-center'>  
      <div className='w-[90%]'>  
        {/* Render the step indicator */}  
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">  
          {steps.map((step, index) => (  
            <li key={index} className={`flex md:w-full items-center ${currentStep >= index ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>  
              <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">  
                {index === 0 && (  
                  <svg  
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"  
                    aria-hidden="true"  
                    xmlns="http://www.w3.org/2000/svg"  
                    fill="currentColor"  
                    viewBox="0 0 20 20"  
                  >  
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />  
                  </svg>  
                )}  
                <span className="me-2">{index + 1}</span>  
                {step.label}  
              </span>  
            </li>  
          ))}  
        </ol>  

        {/* Render the current step's component */}  
        <div className="mt-4">  
          {steps[currentStep].component}  
        </div>  
      </div>  
    </div>  
  );  
}