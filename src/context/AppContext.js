"use client";
import { createContext, useContext, useState, useEffect } from "react";
import jobsData from "@/data/jobs.json";
import candidatesData from "@/data/candidates.json";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // ambil data awal dari JSON + localStorage
  useEffect(() => {
    const loadJobs = async () => {
      const baseJobs = jobsData.data;
      const storedJobs =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("extraJobs")) || [] : [];
      setJobs([...baseJobs, ...storedJobs]);
    };

    loadJobs();
  }, []);

  // --- Load Candidates (merge JSON + localStorage) ---
  useEffect(() => {
    const loadCandidates = async () => {
      const baseCandidates = candidatesData.data || [];

      const stored =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("candidates")) || [] : [];

      // Normalisasi format agar sama
      const normalizedStored = stored.map((cand) => ({
        ...cand,
        applied_job_id: cand.job_id || cand.applied_job_id,
        attributes: cand.attributes.map((attr) => ({
          key: attr.key === "phone_number" ? "phone" : attr.key, // samakan key phone
          label: attr.key.replace("_", " ").toUpperCase(),
          value: attr.value,
        })),
      }));

      const allCandidates = [...baseCandidates, ...normalizedStored];
      setCandidates(allCandidates);
    };

    loadCandidates();
  }, []);

  // fungsi untuk menambah job baru
  const addJob = (newJob) => {
    setJobs((prev) => {
      const updated = [...prev, newJob];
      localStorage.setItem(
        "extraJobs",
        JSON.stringify(updated.filter((j) => !jobsData.data.some((b) => b.id === j.id)))
      );
      return updated;
    });
  };

  const addCandidate = (newCandidate) => {
    setCandidates((prev) => {
      const updated = [...prev, newCandidate];
      localStorage.setItem("candidates", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ jobs, addJob, candidates, addCandidate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
