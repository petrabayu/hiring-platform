"use client";

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

const Page = () => {
  const { jobs, addJob } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    candidate_needed: "",
    salary_min: "",
    salary_max: "",
    status: "draft",
    application_form: {
      sections: [
        {
          title: "Minimum Profile Information Required",
          fields: [
            { key: "full_name", label: "Full Name", required: "required" },
            { key: "photo_profile", label: "Photo Profile", required: "required" },
            { key: "gender", label: "Gender", required: "required" },
            { key: "domicile", label: "Domicile", required: "optional" },
            { key: "email", label: "Email", required: "required" },
            { key: "phone_number", label: "Phone Number", required: "required" },
            { key: "linkedin_link", label: "LinkedIn Link", required: "required" },
            { key: "date_of_birth", label: "Date of Birth", required: "optional" },
          ],
        },
      ],
    },
  });

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // filtering dan search
  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = statusFilter === "all" ? true : job.status === statusFilter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Update field utama
  const handleFieldChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Update konfigurasi minimum profile
  const handleConfigChange = (index, value) => {
    setForm((prev) => {
      const updated = { ...prev };
      updated.application_form.sections[0].fields[index].required = value;
      return updated;
    });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.type || !form.description || !form.candidate_needed) {
      alert("Please fill all required fields.");
      return;
    }

    const newJob = {
      id: `job_${Date.now()}`,
      ...form,
      salary_range: {
        min: form.salary_min,
        max: form.salary_max,
        currency: "IDR",
        display_text:
          form.salary_min || form.salary_max
            ? `Rp${form.salary_min || 0} - Rp${form.salary_max || 0}`
            : "Not specified",
      },
      list_card: {
        badge: form.status.charAt(0).toUpperCase() + form.status.slice(1),
        started_on_text: `started on ${new Date().toLocaleDateString("id-ID")}`,
        cta: "Manage Job",
      },
    };

    addJob(newJob);
    setIsOpen(false);
    setForm({
      title: "",
      type: "",
      description: "",
      candidate_needed: "",
      salary_min: "",
      salary_max: "",
      status: "draft",
      application_form: {
        sections: [
          {
            title: "Minimum Profile Information Required",
            fields: [
              { key: "full_name", label: "Full Name", required: "required" },
              { key: "photo_profile", label: "Photo Profile", required: "required" },
              { key: "gender", label: "Gender", required: "required" },
              { key: "domicile", label: "Domicile", required: "optional" },
              { key: "email", label: "Email", required: "required" },
              { key: "phone_number", label: "Phone Number", required: "required" },
              { key: "linkedin_link", label: "LinkedIn Link", required: "required" },
              { key: "date_of_birth", label: "Date of Birth", required: "optional" },
            ],
          },
        ],
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start flex-col-reverse w-full lg:flex-row">
        <div className="flex-1 w-full mt-4 lg:mt-0">
          <div className="flex gap-4 mb-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded flex-1"
            />
          </div>

          {/* Render hasil filter/Job Card */}
          <ul className="space-y-4">
            {filteredJobs.map((job) => (
              <li key={job.id} className="border p-4 rounded-lg">
                <div className="flex sm:items-center justify-between max-sm:flex-col max">
                  <div className="space-y-2">
                    <div className="space-x-4">
                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
                        {job.list_card.badge}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
                        {job.list_card.started_on_text}
                      </span>
                    </div>
                    <h2 className="font-bold">{job.title}</h2>
                    <p>Salary: {job.salary_range.display_text}</p>
                  </div>

                  <div>
                    <Link href={`/admin/candidates?job=${job.id}`}>
                      <button className="text-white bg-[#01959F] py-2 px-4 rounded-lg cursor-pointer max-sm:mt-4">
                        {job.list_card.cta}
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:ml-6 lg:sticky top-4 p-6 rounded-2xl bg-card max-lg:w-full">
          <div className="my-1">
            <h1 className="text-[#E0E0E0]">Recruit the best candidates</h1>
            <p className="text-white">Create Jobs, invite, and hire with ease</p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-1.5 rounded-lg w-full bg-[#01959F] mt-4 hover:bg-blue-800 text-white cursor-pointer"
          >
            Create a new job
          </button>
        </aside>
      </div>

      {/* Modal form */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#1D1F20]/80 flex items-center justify-center overflow-y-auto">
          <div className="bg-[#EFEEEE] p-6 rounded-[10px] w-full lg:max-w-4xl  h-full lg:max-h-[85vh] overflow-y-auto shadow-[0px_4px_8px_0px_#0000001A] scrollbar-none [&::-webkit-scrollbar]:hidden">
            <h2 className="text-lg font-semibold mb-4 ">Job Opening</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Metadata */}
              <input
                type="text"
                placeholder="Job Name"
                value={form.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                className="border p-2 w-full border-[#E0E0E0] rounded"
                required
              />

              <select
                value={form.type}
                onChange={(e) => handleFieldChange("type", e.target.value)}
                className="border p-2 w-full border-[#E0E0E0] rounded"
                required
              >
                <option value="">Select Job Type</option>
                <option value="full-time">Full-time</option>
                <option value="contract">Contract</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>

              <textarea
                placeholder="Job Description"
                value={form.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                className="border p-2 w-full border-[#E0E0E0] rounded min-h-[100px]"
                required
              />

              <input
                type="number"
                placeholder="Number of Candidates Needed"
                value={form.candidate_needed}
                onChange={(e) => handleFieldChange("candidate_needed", e.target.value)}
                className="border p-2 w-full border-[#E0E0E0] rounded"
                required
              />

              {/* Salary */}
              <div className="flex gap-2">
                <div className="flex items-center border border-[#E0E0E0] rounded w-1/2">
                  <span className="px-2  font-bold">Rp</span>
                  <input
                    type="number"
                    placeholder="Min Salary"
                    value={form.salary_min}
                    onChange={(e) => handleFieldChange("salary_min", e.target.value)}
                    className="p-2 w-full border-[#E0E0E0] rounded-r"
                  />
                </div>

                <div className="flex items-center border border-[#E0E0E0] rounded w-1/2">
                  <span className="px-2  font-bold">Rp</span>
                  <input
                    type="number"
                    placeholder="Max Salary"
                    value={form.salary_max}
                    onChange={(e) => handleFieldChange("salary_max", e.target.value)}
                    className="p-2 w-full border-[#E0E0E0] rounded-r"
                  />
                </div>
              </div>

              <select
                value={form.status}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                className="border p-2 w-full border-[#E0E0E0] rounded"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Minimum Profile Config */}
              <div className="mt-6 border-t pt-4 border p-4 rounded-lg border-[#E0E0E0]">
                <h3 className="font-semibold mb-3 bord">Minimum Profile Information Required</h3>
                <div className="space-y-3">
                  {form.application_form.sections[0].fields.map((field, index) => {
                    const lockedFields = ["full_name", "photo_profile", "email"];
                    const isLocked = lockedFields.includes(field.key);

                    return (
                      <div
                        key={field.key}
                        className="flex items-center justify-between py-2 border-b border-[#E0E0E0] last:border-b-0"
                      >
                        <span className="text-sm capitalize">
                          {field.label || field.key.replace("_", " ")}
                        </span>

                        {/* Segmented Button */}
                        <div className="flex gap-4">
                          {[
                            { value: "required", label: "Mandatory" },
                            { value: "optional", label: "Optional" },
                            { value: "off", label: "Off" },
                          ].map((opt) => {
                            const isActive = field.required === opt.value;
                            const isDisabled = isLocked && opt.value !== "required";

                            return (
                              <button
                                key={opt.value}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => handleConfigChange(index, opt.value)}
                                className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-150
                    ${
                      isActive
                        ? "border-[#01959F] text-[#01959F] bg-white"
                        : "border-[#E0E0E0] text-[#404040] bg-white hover:border-teal-400"
                    }
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4  pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 border rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-[#01959F]  text-white rounded cursor-pointer"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
