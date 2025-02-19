import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function UserFullJobCard({job}) {
  const [userjob, setUserjob] = useState<Jobprop[]>([]);
  const jobId = useParams();
  async function fetchfulljob() {
    try {
      const res = await fetch(`/api/jobstresm/${jobId}`, {
        method: "Get",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
      })
      const json = await res.json();
      setUserjob(json)
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(()=>{
    fetchfulljob();
  },[])
  return (
    <div>
      Job Details
      <div>
        {userjob.map((fulljob)=>(
            <div key={fulljob.id}>
                <div>
                    <div>
                    <h3>{fulljob.title}</h3>
                    <h3>{fulljob.company}</h3>
                    </div>
                    <div>
                        <h3>Job Type</h3>
                        <h4>{fulljob.jobtype}</h4>
                    </div>
                    <div>
                        <h3>Salary</h3>
                        <h4>{fulljob.salary}</h4>
                    </div>
                    <div>
                        <h3>Experience</h3>
                        <h4>{fulljob.experience}</h4>
                    </div>
                    <div>
                        <h3>Job Description</h3>
                        <h4>{fulljob.description}</h4>
                    </div>
                    
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
