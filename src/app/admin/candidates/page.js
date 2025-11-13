"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

export default function Page() {
  const [jobId, setJobId] = useState(null);
  const { candidates } = useAppContext();
  const filtered = candidates.filter((c) => c.job_id === jobId);
  const { jobs } = useAppContext();

  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    let isMounted = true;

    const updateJobTitle = async () => {
      if (!jobs?.length || !jobId) return;
      const job = jobs.find((j) => j.id === jobId);
      if (!isMounted) return;

      setJobTitle(job ? job.title : jobId);
    };

    updateJobTitle();

    return () => {
      isMounted = false;
    };
  }, [jobs, jobId]);

  useEffect(() => {
    let isMounted = true;

    const extractJobId = async () => {
      if (typeof window === "undefined") return;
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("job");
      if (isMounted) setJobId(id);
    };

    extractJobId();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-6">
      <Link href="/admin/jobs">
        <button className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium bg-white hover:bg-gray-100 transition-all duration-150 shadow-sm hover:shadow cursor-pointer">
          Back to Job List
        </button>
      </Link>

      <h1 className="text-2xl font-semibold mb-6">Candidates for {jobTitle || "Loading..."}</h1>

      {filtered.length === 0 ? (
        <p>No candidates have applied for this job yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#E0E0E0] text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">Full Name</th>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">Email Address</th>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">Phone Numbers</th>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">Date of Birth</th>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">Domicile</th>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">Gender</th>
                <th className="border border-[#E0E0E0] px-4 py-2 text-left">LinkedIn</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cand) => {
                const get = (key) => cand.attributes.find((a) => a.key === key)?.value || "-";
                return (
                  <tr key={cand.id}>
                    <td className="border border-[#E0E0E0] px-4 py-2">{get("full_name")}</td>
                    <td className="border border-[#E0E0E0] px-4 py-2">{get("email")}</td>
                    <td className="border border-[#E0E0E0] px-4 py-2">{get("phone_number")}</td>
                    <td className="border border-[#E0E0E0] px-4 py-2">{get("date_of_birth")}</td>
                    <td className="border border-[#E0E0E0] px-4 py-2">{get("domicile")}</td>
                    <td className="border border-[#E0E0E0] px-4 py-2">{get("gender")}</td>
                    <td className="border border-[#E0E0E0] px-4 py-2">
                      <a
                        href={get("linkedin_link")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {get("linkedin_link")}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
