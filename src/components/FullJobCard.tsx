import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import Appbar from './Appbar';

export interface JobTypeProp {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  createdAt: Date;
}

export function FullJobCard({ job }: { job: JobTypeProp }) {
    const params = useParams<{id:string}>()
        const jobId = params?.id;
  const handleEdit = async() => {
    try{
        const res = await fetch(`/api/jobstream/${jobId}`,{
            method:"PUT",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(job)
        })

    }catch(e){
        console.error(e);
    }
    console.log('Edit job:', job.title);
  };

  const handleDelete = async() => {
    try{
        const res = await fetch(`/api/jobstream/${jobId}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(job)
        })

    }catch(e){
        console.error(e);
    }
    console.log('Delete job:', job.title);
  };

  const formatDate = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div className="flex justify-center mt-20 ">
      
    <div className="bg-white p-6 max-w-2xl shadow-black shadow-lg rounded-lg w-[900px]">
      <div className="space-y-4 ">
       
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-lg text-gray-600 font-medium">{job.company}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
              aria-label="Edit job"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
              aria-label="Delete job"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
        </div>
        {/* Location and Salary */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
            <span className="text-gray-600">{job.location}</span>
          </div>
          <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
            <span className="text-green-700 font-medium">{job.salary}</span>
          </div>
        </div>

        {/* Description */}
       

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Posted: {formatDate(job.createdAt)}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}