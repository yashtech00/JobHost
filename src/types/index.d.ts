interface Jobprop {
  id:string;
  title: string;
  description: string;
  company: string;
  jobtype: string;
  location: string;
  salary: number;
  createdAt: Date;
  experience: number;
}

interface PostJobprop {
  title: string;
  description: string;
  company: string;
  jobtype: string;
  location: string;
  salary: number;
  createdAt: Date;
  experience: number;
}
 interface SalaryRange {
  label: string;
  min: number;
  max: number;
}

 interface JobTypeRange {
  label: string;
}

// Define the interface for the format of selected salaries
 interface SalaryFilterProps {
  selectedSalaries: SalaryRange[]; // Change this to SalaryRange[]
  setSelectedSalaries: (salaries: SalaryRange[]) => void; // Change to use SalaryRange[]
}

interface JobTypeFilterProps {
  selectedJobTypes: JobTypeRange[]; // Change this to SalaryRange[]
  setSelectedJobTypes: (jobs: JobTypeRange[]) => void; // Change to use SalaryRange[]
}


interface ApplicantProp {
  resume:string
  jobId: string
}

export interface ApplicantGetProp {
  id: string;
  resume: string;
  user: {
    id: string;
    name: string;
  };
  jobId: string;
}