import Link from "next/link";

export default function HomePortal() {
  const cards = [
    {
      title: "Applicant",
      desc: "Explore available jobs and submit your application easily.",
      href: "/applicant/jobs",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Admin",
      desc: "Manage job postings and track applicants efficiently.",
      href: "/admin/jobs",
      color: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md p-8 cursor-pointer transition-all duration-300 hover:shadow-xl`}
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-white">
                  {card.title}
                </h2>
                <p className="text-gray-600 group-hover:text-white/90">{card.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
