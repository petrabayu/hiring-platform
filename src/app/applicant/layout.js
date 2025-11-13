import Link from "next/link";
export default function UserLayout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/" className="block">
          <h1 className="text-xl font-semibold mb-4 p-4 bg-white shadow-[0px_0px_8px_0px_#00001A]">
            Job List
          </h1>
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
