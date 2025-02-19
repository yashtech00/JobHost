import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";

export  function UserFullJobCard({ job }: { job: Jobprop }) {
  const [applyjob, setApplyjob] = useState<ApplicantProp[]>([]);
  const [resume, setResume] = useState("Dummy Resume Data"); // Set a dummy value by default
  const params = useParams<{ id: string }>();
  const id = params?.id;

  async function applyfunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      console.log("Job ID from URL:", id);
      console.log("Applying with dummy data:", resume);

      const formData = {
        resume, // Use the dummy data for resume
      };

      const res = await fetch(`/api/applicant/appli/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorResponse = await res.text(); // Get the response body in text format
        console.error("Error response:", errorResponse);
        throw new Error(`Network response was not ok: ${errorResponse}`);
      }

      const json = await res.json();
      console.log(json);
      setApplyjob([...applyjob, json.response]);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-emerald-600 text-white p-6">
        <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
        <p className="text-emerald-100">{job.company}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-emerald-600">Job Type</h3>
            <p className="mt-1 text-lg">{job.jobtype}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-emerald-600">Salary</h3>
            <p className="mt-1 text-lg">{job.salary / 100000} lacs</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-emerald-600">Experience</h3>
            <p className="mt-1 text-lg">{job.experience}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-emerald-600">Location</h3>
            <p className="mt-1 text-lg">{job.location}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-emerald-600">
            Job Description
          </h3>
          <p className="mt-1 text-gray-600">{job.description}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-emerald-50 p-6">
        <form className="w-full" onSubmit={applyfunction}>
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            Apply Now
          </h2>
          <div className="mb-4">
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-emerald-600 mb-2"
            >
              Resume <span className="text-red-500">*</span>
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept=".pdf, .doc, .docx, .txt" // Accept file types
              onChange={(e) => {
                // Set a dummy value when user selects a file
                setResume("Dummy Resume Data (simulated upload)"); // Simulate a file upload
              }}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Submit Application
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
