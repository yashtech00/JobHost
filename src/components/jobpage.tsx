import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import axios from "axios";
import { JobCard } from "./jobcard";
export default function Jobs() {
  const [search, setSearch] = useState("");
  const [alljob, setAlljob] = useState([]);

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

      console.log("API Response:", json); // Debugging log

      if (Array.isArray(json)) {
        setAlljob(json);
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 via-gray-900 to-zinc-950 text-white">
      <CardContent className="flex justify-center h-screen ">
        <div>
          <input placeholder="Search for a job" />
          <Button>Search</Button>
          <div className=" flex">
            <div>filter card salary jobtype skill location</div>

            <div>
              {Array.isArray(alljob) &&
                alljob.map((job) => (
                  <div key={job.id || job.title}>
                    <JobCard job={job} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
