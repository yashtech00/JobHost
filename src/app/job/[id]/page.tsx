
"use client"
import { useEffect, useState } from "react";

import { FullJobCard } from "@/components/FullJobCard";
import { useParams } from "next/navigation";
import Appbar from "@/components/Appbar";

export default function Job() {

    const params = useParams<{id:string}>()
    const jobId = params?.id;
  const [job, setJob] = useState<Jobtypeprop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  console.log("Job ID from URL:", jobId); // Checking if ID is received

  useEffect(() => {
    

    const fetchJobById = async () => {
      try {
        console.log(`Fetching job from: /api/jobstream/${jobId}`);

        const res = await fetch(`/api/jobstream/${jobId}`, {
          method: "GET",
          credentials: "include",
          headers: { "content-type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Error fetching job: ${res.statusText}`);
        }

        const json = await res.json();
        console.log("Fetched job data:", json);

        setJob(json.job);
      } catch (e) {
        console.error(e);
        setError("Failed to load job. It may not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobById();
  }, [jobId]);

  return (
    <div>
         <Appbar/>
      {loading ? (
        <div>Loading job details...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : job ? (
        <FullJobCard job={job} />
      ) : (
        <div>Job not found.</div>
      )}
    </div>
  );
}
