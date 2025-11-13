"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

export default function ApplicantJobList() {
  const { jobs } = useAppContext();
  const [activeJobs, setActiveJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const updateJobs = async () => {
      // biar React tahu ini async process, bukan synchronous effect
      const filtered = jobs.filter((j) => j.status === "active");
      if (!isMounted) return;

      setActiveJobs(filtered);
      if (filtered.length > 0) setSelectedJob(filtered[0]);
    };

    updateJobs();

    return () => {
      isMounted = false; // clean up untuk mencegah update setelah unmount
    };
  }, [jobs]);

  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-50 max-md:flex-col">
      {/* ========== LEFT LIST PANEL ========== */}
      <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 overflow-y-auto">
        {activeJobs.length === 0 ? (
          <p className="text-gray-500 p-4">No jobs found.</p>
        ) : (
          <ul className="">
            {activeJobs.map((job) => (
              <li
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-4 cursor-pointer transition ${
                  selectedJob?.id === job.id ? "bg-teal-50 border-[#4DB5BC]" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex flex-col border-2 border-[#4DB5BC] hover:bg-[#F3FBFC] py-3 px-4 rounded-lg">
                  <h2 className="font-medium text-gray-800">{job.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {job.salary_range?.display_text || "Not specified"}
                  </p>
                  {job.list_card?.started_on_text && (
                    <p className="text-xs text-gray-400 mt-1">{job.list_card.started_on_text}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* ========== RIGHT DETAIL PANEL ========== */}
      <main className="flex-1 p-8 md:overflow-y-auto">
        {!selectedJob ? (
          <p className="text-gray-500">Select a job to view details.</p>
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-xl p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">{selectedJob.title}</h1>
              </div>
              <Link
                href={`/applicant/apply/${selectedJob.id}`}
                className="bg-yellow-400 hover:bg-yellow-500 font-medium px-5 py-2 rounded-md transition"
              >
                Apply
              </Link>
            </div>

            <hr className="my-4 border-[#E0E0E0] " />

            {selectedJob.description ? (
              <p className="text-gray-700 ">{selectedJob.description}</p>
            ) : (
              <p className="text-gray-500 italic">No description available for this job.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
