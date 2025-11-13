# 🚀 Hiring Platform

A simplified **Hiring Management Web App** built with **Next.js** and **TailwindCSS**. The platform supports two roles: **Admin (Recruiter)** and **Applicant (Job Seeker)**. Each with their own interface to manage or apply for job openings.

## 🧭 Project Overview

This project was built to demonstrates frontend architecture, state management, and UI design with responsive layouts and dynamic rendering based on mock JSON data or localstorage.

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Styling:** TailwindCSS
- **State Management:** Context API
- **Data Source:** Local JSON (mock API) and Local Storage
- **Deployment:** Vercel

## 🗂️ Project Structure

```
hiring-platform/
├── app/
│   ├── admin/
│   │   ├── jobs/                 → Job list page for Admin
│   │   ├── candidates/           → Candidate management page
|   |   └── layout.js
|   |
│   ├── applicant/
│   │   ├── jobs/                 → Job list for Applicants
│   │   ├── apply/[id]/           → Dynamic job application form
|   |   └── layout.js
|   |
│   ├── page.js                   → Landing page (Admin / Applicant portal)
│   └── layout.js                 → Root layout and shared UI
│
├── context/                      → Context API (App-wide state management)
├── data/                         → Mock JSON data (jobs.json, candidates.json, config.json)
├── public/                       → Static assets
├── styles/                       → Global styles and Tailwind config
└── README.md
```

## ⚙️ How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/petrabayu/hiring-platform

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# 4. Visit
http://localhost:3000
```

## 🧭 Routes Overview

### 🏠 Portal Route

| Route | Description                                                                      |
| ----- | -------------------------------------------------------------------------------- |
| `/`   | Landing page with two interactive cards (Applicant / Admin) for easy navigation. |

### 🧾 Admin Routes

| Route               | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| `/admin/jobs`       | Job list for recruiters with job status, title, and management options. |
| `/admin/candidates` | Displays all applicants per job in a table format.                      |

### 👤 Applicant Routes

| Route                   | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| `/applicant/jobs`       | Displays all active job vacancies.                                       |
| `/applicant/apply/[id]` | Job application form that adapts dynamically based on job configuration. |

## ✨ Key Features

### 🌐 Portal

- Main landing page with two role-based access cards: **Applicant** and **Admin**.

### 👤 Applicant

- Job List Page – displays available jobs.
- Apply Page – dynamic form rendering based on configuration.
- Simple validation and success/error states.

### 🧾 Admin

- Job List Page – lists all created jobs with basic filters.
- Candidate Management Page – displays applicant info in a table view.
- Create a new job opening and setting up how the form will be shown to candidates.

## 🙌 Author

**Petra Bayu Pangestu**  
[Portfolio](https://petrabayu.com) · [GitHub](https://github.com/petrabayu) · [LinkedIn](https://linkedin.com/in/petrabayu)
