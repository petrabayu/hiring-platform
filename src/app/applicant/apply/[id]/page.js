"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function ApplyJobPage() {
  const { jobs } = useAppContext();
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Load job & setup form data
  useEffect(() => {
    let isMounted = true;

    const loadJob = async () => {
      if (!id || !jobs?.length) return;
      const foundJob = jobs.find((j) => j.id === id) || null;
      if (!isMounted) return;

      setJob(foundJob);

      if (foundJob?.application_form) {
        const fields = foundJob.application_form.sections[0].fields;
        const initial = {};
        fields.forEach((f) => {
          if (f.required !== "off") initial[f.key] = "";
        });
        setFormData(initial);
      }
    };

    loadJob();

    return () => {
      isMounted = false;
    };
  }, [id, jobs]);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/applicant/jobs");
      }, 2000); // redirect setelah 2 detik
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  if (!job) return <p className="p-6">Job not found or loading...</p>;

  const fields = job.application_form?.sections?.[0]?.fields || [];

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    fields.forEach((f) => {
      if (f.required === "required" && !formData[f.key]) {
        newErrors[f.key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simpan ke localStorage (candidates)
    const storedApplicants = JSON.parse(localStorage.getItem("candidates")) || [];
    const newApplicant = {
      id: `cand_${Date.now()}`,
      job_id: job.id,
      attributes: Object.keys(formData).map((key) => ({
        key,
        value: formData[key],
      })),
    };
    localStorage.setItem("candidates", JSON.stringify([...storedApplicants, newApplicant]));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-10 text-center">
        <h2 className="text-xl font-bold mb-4 text-green-700">Application Submitted</h2>
        <p className="text-gray-700">
          Your application has been submitted successfully. <br />
          Redirecting to job list...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{job.title} - Apply</h1>
      <button
        type="button"
        onClick={() => router.push("/applicant/jobs")}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition"
      >
        Back to Job List
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((f) => {
          // Sembunyikan field yang off
          if (f.required === "off") return null;

          let inputType = "text";
          if (f.key === "email") inputType = "email";
          else if (f.key === "phone_number") inputType = "tel";
          else if (f.key === "date_of_birth") inputType = "date";
          else if (f.key === "linkedin_link") inputType = "url";
          else if (f.key === "photo_profile") inputType = "file";
          else if (f.key === "gender") inputType = "select";

          return (
            <div key={f.key} className="flex flex-col">
              <label className="mb-1 font-medium">
                {f.label || f.key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                {f.required === "required" && <span className="text-red-500">*</span>}
              </label>
              {inputType === "select" ? (
                <select
                  name={f.key}
                  value={formData[f.key]}
                  onChange={handleChange}
                  required={f.required === "required"}
                  className={`border rounded px-3 py-2 ${
                    errors[f.key] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <input
                  type={inputType}
                  name={f.key}
                  value={inputType === "file" ? undefined : formData[f.key]}
                  onChange={handleChange}
                  required={f.required === "required"}
                  className={`border rounded px-3 py-2 ${
                    errors[f.key] ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}

              {errors[f.key] && <p className="text-red-500 text-sm">{errors[f.key]}</p>}
            </div>
          );
        })}
        <button
          type="submit"
          className="bg-[#01959F] hover:bg-[#018189] text-white px-4 py-2 rounded-lg w-full transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
