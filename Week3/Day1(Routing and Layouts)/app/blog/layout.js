import Link from "next/link";

export default function BlogLayout({ children }) {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-12 md:grid-cols-[1fr_220px]">
      <div>{children}</div>
      <aside className="h-fit rounded-xl bg-slate-100 p-5">
        <h2 className="font-semibold">Blog</h2>
        <p className="mt-2 text-sm text-slate-600">
          Notes about building websites.
        </p>
        <Link href="/blog" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          All posts
        </Link>
      </aside>
    </div>
  );
}
