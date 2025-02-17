import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import axios from "axios";
import { JobCard } from "./jobcard";
export default function Jobs() {
  const [search, setSearch] = useState("");
  const [alljob, setAlljob] = useState<Jobtypeprop[]>([]);

  async function refreshjobs() {
    try {
      const res = await fetch("/api/jobstream", {
        method: "GET",
        credentials: "include",
        headers:{
            "content-type":"application"
        }
      });
      const json = await res.json();

      console.log("API Response:", json.job); // Debugging log

      if (Array.isArray(json.job)) {
        setAlljob(json.job);
      } else {
        setAlljob([]); // Ensure it's always an array
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    refreshjobs();
  }, []);

  return (
    <div className="flex  flex-col ">
      <CardContent className="flex justify-center h-screen ">
        <div>
          <input placeholder="Search for a job" />
          <Button>Search</Button>
          <div className=" flex">
            <div>
            <div> All Filter</div> 
             <div>
              <div>
                <h3>Salary</h3>
                <div>
                  
                </div>
              </div>
              </div>
             <div>jobtype </div>
             <div>location</div>
             </div>
            <div>
              {Array.isArray(alljob) &&
                alljob.map((job) => (
                  <div key={job.id || job.title}>
                    <JobCard userjob={job} />
                  </div>
                ))}
            </div>

          </div>
        </div>
      </CardContent>
    </div>
  );
}
