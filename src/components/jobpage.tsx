import { useEffect, useState } from "react";
import Joblist from "./joblist";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import axios from "axios";
export default function Jobs() {
  const [search, setSearch] = useState("");
  const [alljob, setAlljob] = useState([]);

  async function refreshjobs() {
    try {
      const res = await fetch("/api/jobstream", {
        credentials: "include",
      });
      const json = await res.json();
      setAlljob(json);
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
                {alljob.map((jobmap)=>(
                    <div key={jobmap}>
                        <Joblist jobs={jobmap} />
                    </div>
                ))}
              
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
