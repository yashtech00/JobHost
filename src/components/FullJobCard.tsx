import React, { useEffect, useState } from 'react';
import { IndianRupee, MapPin, Pencil, Trash2 } from 'lucide-react';
import {  useParams, useRouter } from 'next/navigation';
import { ApplicantGetProp } from '@/types';

export function FullJobCard({ job }: { job: Jobprop }) {
    const params = useParams<{id:string}>()
        const jobId = params?.id;
        const id = params?.id;
        const router = useRouter();
        const [applicants, setApplicants] = useState<ApplicantGetProp[]>([]);
  useEffect(() => {
    const fetchApplicantCount = async () => {
      try {
        console.log(`Fetching applicants for job: ${id}`);
        
        const res = await fetch(`/api/applicant/appli/${jobId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'Application/json',
          },
        });
        const data = await res.json();
        console.log("Applicant data:", data);
        setApplicants(data);
       
      } catch (e) {
        console.error(e);
      }
    };

    if (jobId) {
      fetchApplicantCount();
    }
  }, [jobId]);

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
        router.push('/Empdashboard')
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
    
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
      
    <div className="bg-white p-6 max-w-2xl shadow-gray-400 shadow-lg rounded-2xl w-[900px]  ">
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
          <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
          <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-green-700 px-2">{job.location}</span>
          </div>
          <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
          <IndianRupee  className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="text-green-700 font-medium px-2"> {job.salary/100000} lacs</span>
          </div>
          <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
            <span className="text-green-700 font-medium">{job.experience}+ Exps</span>
          </div>
        </div>
        {/* Number of Applicants */}
        <div className="pt-4 border-t border-gray-200">
            
              <div className='flex '>
              <p className="text-sm text-gray-500">
              Number of Applicants: 
              </p>
              <div className=' bg-purple-800 text-white mx-2 px-1 rounded-full'>{applicants.length}
              </div>
              </div>
           
          </div>

          {/* Applicant Details */}
          <div className="pt-4 border-t border-gray-200">

            <div className="flex items-center px-3 py-1 bg-green-100 rounded-full w-1/5">
          
            <span className="text-green-700 px-2">Applications:</span>
          </div>
            <ul className="list-disc pl-5">
              {applicants.map((applicant) => (
                <li key={applicant.id} className="text-sm text-gray-600">
                  {applicant.user.name} - {applicant.resume}
                </li>
              ))}
            </ul>
          </div>
       

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