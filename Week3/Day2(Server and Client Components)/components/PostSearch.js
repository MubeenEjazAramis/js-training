"use client";

import { useState } from "react";
import Link from "next/link";

export default function PostSearch({ posts }) {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase();
  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q))
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts by title or tag..."
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
      />
      <div className="mt-8 space-y-5">
        {filtered.map((post) => (
          <article key={post.slug} className="rounded-xl border border-slate-200 p-6 dark:border-slate-800 dark:bg-slate-800/40">
            <p className="text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
            <h2 className="mt-2 text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            <div className="mt-4 flex gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                  #{tag}
                </Link>
              ))}
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400">No posts found matching &quot;{query}&quot;.</p>
        )}
      </div>
    </div>
  );
}
