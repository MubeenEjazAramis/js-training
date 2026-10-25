import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you requested does not exist.</p>
      <Link href="/" className="mt-6 inline-block text-blue-600 hover:underline">
        Go back home
      </Link>
    </main>
  );
}
