import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/" className="block">
          <h1 className="text-xl font-semibold mb-4 p-4 bg-white shadow-[0px_0px_8px_0px_#00001A]">
            Job Opening
          </h1>
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
