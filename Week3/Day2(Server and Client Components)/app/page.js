import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <section className="rounded-3xl bg-slate-900 px-8 py-16 text-white dark:bg-slate-800 dark:border dark:border-slate-700">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
          Devnotes
        </p>
        <h1 className="max-w-2xl text-4xl font-bold sm:text-6xl">
          Simple notes for better web development.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-slate-300">
          Practical lessons about JavaScript, React and Next.js.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-500"
        >
          Read the blog
        </Link>
      </section>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest posts</h2>
          <Link href="/blog" className="text-blue-600 hover:underline dark:text-blue-400">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-xl border border-slate-200 p-6 hover:border-blue-400 dark:border-slate-800 dark:bg-slate-800/40 dark:hover:border-blue-500"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
              <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
